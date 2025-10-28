// Simple 2-step form logic
document.getElementById('nextStep').addEventListener('click', () => {
    const zip = document.getElementById('zip').value.trim();
    if (!zip || zip.length !== 5) {
      alert('Please enter a valid ZIP code.');
      return;
    }
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
  });
  
  document.getElementById('leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks! A local tech will reach out shortly.');
    e.target.reset();
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
  });
  