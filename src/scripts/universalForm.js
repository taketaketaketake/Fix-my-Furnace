/**
 * Universal Form Handler
 * Extracted JavaScript logic for UniversalForm component
 */

/**
 * Initialize a universal form
 * @param {Object} config - Form configuration
 * @param {string} config.formId - Unique form identifier
 * @param {string} config.formSource - API endpoint for submission
 * @param {Array} config.fields - Field definitions
 * @param {string} config.MAPBOX_TOKEN - Mapbox API token for address autocomplete
 */
export function initUniversalForm(config) {
  const { formId, formSource, fields, MAPBOX_TOKEN } = config;

  const form = document.getElementById(formId);
  const submitBtn = document.getElementById(`${formId}-submit`);
  const submitText = document.getElementById(`${formId}-submit-text`);
  const submitLoading = document.getElementById(`${formId}-submit-loading`);
  const messages = document.getElementById(`${formId}-messages`);
  const successMessage = document.getElementById(`${formId}-success`);
  const errorMessage = document.getElementById(`${formId}-error`);
  const loadingMessage = document.getElementById(`${formId}-loading`);

  if (!form) {
    console.error(`Form with ID "${formId}" not found`);
    return;
  }

  // Phone number formatting and validation
  function formatPhoneNumber(value) {
    const phone = value.replace(/\D/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `(${phone.slice(0,3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}`;
  }

  function validatePhoneNumber(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  }

  function showFieldError(fieldName, show) {
    const field = document.getElementById(`${formId}-${fieldName}`);
    const error = document.getElementById(`${formId}-${fieldName}-error`);
    if (field && error) {
      if (show) {
        field.classList.add('border-red-500');
        error.classList.remove('hidden');
      } else {
        field.classList.remove('border-red-500');
        error.classList.add('hidden');
      }
    }
  }

  // Setup phone fields
  fields.forEach(field => {
    if (field.type === 'tel') {
      const phoneInput = document.getElementById(`${formId}-${field.name}`);
      if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
          const formatted = formatPhoneNumber(e.target.value);
          e.target.value = formatted;

          if (formatted.length > 0) {
            const isValid = validatePhoneNumber(formatted);
            showFieldError(field.name, !isValid);
          } else {
            showFieldError(field.name, false);
          }
        });

        phoneInput.addEventListener('keydown', (e) => {
          // Allow backspace, delete, tab, escape, enter
          if ([8, 9, 27, 13, 46].includes(e.keyCode) ||
              // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
              (e.keyCode === 65 && e.ctrlKey) ||
              (e.keyCode === 67 && e.ctrlKey) ||
              (e.keyCode === 86 && e.ctrlKey) ||
              (e.keyCode === 88 && e.ctrlKey)) {
            return;
          }
          // Only allow numbers
          if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
          }
        });
      }
    }
  });

  // Setup address autocomplete with Mapbox
  fields.forEach(field => {
    if (field.type === 'address' && MAPBOX_TOKEN) {
      const addressInput = document.getElementById(`${formId}-${field.name}`);
      const suggestions = document.getElementById(`${formId}-${field.name}-suggestions`);

      if (addressInput && suggestions) {
        let debounceTimer;

        function searchAddresses(query) {
          if (query.length < 3) {
            suggestions.classList.add('hidden');
            return;
          }

          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            try {
              const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
                `access_token=${MAPBOX_TOKEN}&` +
                `country=US&` +
                `types=address&` +
                `limit=5&` +
                `bbox=-90.418,41.696,-82.413,48.2`
              );

              const data = await response.json();
              displaySuggestions(data.features);
            } catch (error) {
              console.error('Error fetching addresses:', error);
            }
          }, 300);
        }

        function displaySuggestions(addresses) {
          suggestions.innerHTML = '';

          if (addresses.length === 0) {
            suggestions.classList.add('hidden');
            return;
          }

          addresses.forEach((address) => {
            const div = document.createElement('div');
            div.className = 'px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0';
            div.textContent = address.place_name;
            div.addEventListener('click', () => {
              addressInput.value = address.place_name;
              suggestions.classList.add('hidden');
            });
            suggestions.appendChild(div);
          });

          suggestions.classList.remove('hidden');
        }

        addressInput.addEventListener('input', (e) => {
          searchAddresses(e.target.value);
        });

        addressInput.addEventListener('blur', () => {
          setTimeout(() => {
            suggestions.classList.add('hidden');
          }, 150);
        });
      }
    }
  });

  // Message handling
  function showMessage(type) {
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingMessage.classList.add('hidden');

    messages.classList.remove('hidden');
    document.getElementById(`${formId}-${type}`).classList.remove('hidden');

    messages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideMessages() {
    messages.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingMessage.classList.add('hidden');
  }

  function setLoadingState(loading) {
    submitBtn.disabled = loading;
    if (loading) {
      submitText.classList.add('hidden');
      submitLoading.classList.remove('hidden');
      showMessage('loading');
    } else {
      submitText.classList.remove('hidden');
      submitLoading.classList.add('hidden');
    }
  }

  // Update error message text dynamically
  function showError(message) {
    const errorText = errorMessage.querySelector('p');
    if (errorText) {
      errorText.textContent = message;
    }
    showMessage('error');
  }

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    setLoadingState(true);

    try {
      const formData = new FormData(form);
      const data = {};

      // Collect form data
      fields.forEach(field => {
        const value = formData.get(field.name)?.trim();
        if (value) {
          data[field.name] = value;
        }
      });

      // Get CSRF token
      const csrfToken = formData.get('_csrf');

      // Basic validation
      const requiredFields = fields.filter(f => f.required);
      for (const field of requiredFields) {
        if (!data[field.name]) {
          throw new Error(`${field.label} is required`);
        }
      }

      // Validate phone numbers
      for (const field of fields) {
        if (field.type === 'tel' && data[field.name]) {
          if (!validatePhoneNumber(data[field.name])) {
            throw new Error('Please enter a valid phone number');
          }
        }
      }

      // Submit to API (using dynamic formSource endpoint)
      const response = await fetch(formSource, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data,
          formSource: formSource,
          _csrf: csrfToken
        })
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle CSRF errors specifically
        if (response.status === 403) {
          throw new Error('Security validation failed. Please refresh the page and try again.');
        }

        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Success
      setLoadingState(false);
      showMessage('success');
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => hideMessages(), 5000);

    } catch (error) {
      console.error('Submission error:', error);
      setLoadingState(false);
      showError(error.message || 'Something went wrong. Please try again.');

      // Hide error message after 7 seconds
      setTimeout(() => hideMessages(), 7000);
    }
  });
}
