/**
 * Telnyx SMS service for phone verification
 */

class TelnyxService {
  constructor() {
    this.apiKey = import.meta.env.TELNYX_API_KEY;
    this.messagingProfileId = import.meta.env.TELNYX_MESSAGING_PROFILE_ID;
    this.fromNumber = import.meta.env.TELNYX_PHONE_NUMBER;
    this.baseUrl = 'https://api.telnyx.com/v2';
    this.webhookSecret = import.meta.env.TELNYX_WEBHOOK_SECRET;
  }

  async sendVerificationSMS(toNumber, verificationToken) {
    const verificationUrl = `${import.meta.env.VERIFICATION_LINK_BASE_URL}/verify-phone?token=${verificationToken}`;
    const message = `Verify your furnace service request: ${verificationUrl} - expires in 10 minutes. Fix My Furnace`;

    // For now: console.log the message (until phone number is ported)
    console.log(`[MOCK SMS] To: ${toNumber}, Message: ${message}`);
    console.log(`[MOCK SMS] From: ${this.fromNumber}`);
    
    // Mock successful response for development
    return { 
      success: true, 
      messageId: `mock-${Date.now()}`,
      to: toNumber,
      from: this.fromNumber,
      message: message
    };

    // Real implementation (uncomment when ready):
    /*
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: this.fromNumber,
          to: toNumber,
          text: message,
          messaging_profile_id: this.messagingProfileId
        })
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Telnyx API error:', result);
        return { 
          success: false, 
          error: result.errors?.[0]?.detail || 'Failed to send SMS'
        };
      }

      return {
        success: true,
        messageId: result.data.id,
        to: result.data.to,
        from: result.data.from,
        status: result.data.status
      };

    } catch (error) {
      console.error('Error sending SMS via Telnyx:', error);
      return { 
        success: false, 
        error: 'Network error sending SMS'
      };
    }
    */
  }

  async sendResendVerificationSMS(toNumber, verificationToken, attemptNumber) {
    const verificationUrl = `${import.meta.env.VERIFICATION_LINK_BASE_URL}/verify-phone?token=${verificationToken}`;
    const message = `Verification resent (${attemptNumber}): ${verificationUrl} - expires in 10 minutes. Fix My Furnace`;

    // For now: console.log the message
    console.log(`[MOCK SMS RESEND] To: ${toNumber}, Message: ${message}`);
    
    return { 
      success: true, 
      messageId: `mock-resend-${Date.now()}`,
      to: toNumber,
      from: this.fromNumber,
      message: message,
      attemptNumber
    };
  }

  verifyWebhookSignature(payload, signature) {
    // Webhook signature verification for security
    // Implementation depends on Telnyx webhook setup
    
    if (!this.webhookSecret) {
      console.warn('TELNYX_WEBHOOK_SECRET not configured');
      return false;
    }

    // For now, return true (implement proper verification when webhooks are set up)
    return true;
  }

  async handleWebhook(payload, signature) {
    // Verify webhook signature
    if (!this.verifyWebhookSignature(payload, signature)) {
      return { error: 'Invalid webhook signature' };
    }

    const { event_type, payload: eventPayload } = payload;

    switch (event_type) {
      case 'message.delivered':
        console.log('SMS delivered:', eventPayload.id);
        return { status: 'delivered', messageId: eventPayload.id };
        
      case 'message.delivery_failed':
        console.error('SMS delivery failed:', eventPayload);
        return { 
          status: 'failed', 
          messageId: eventPayload.id,
          error: eventPayload.errors?.[0]?.detail 
        };
        
      case 'message.sent':
        console.log('SMS sent:', eventPayload.id);
        return { status: 'sent', messageId: eventPayload.id };
        
      default:
        console.log('Unhandled webhook event:', event_type);
        return { status: 'unhandled', eventType: event_type };
    }
  }

  formatPhoneNumber(phoneNumber) {
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add +1 if US number without country code
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    // Add + if missing
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
    
    return phoneNumber; // Return as-is if already formatted or international
  }

  validatePhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // US phone numbers: 10 digits or 11 digits starting with 1
    if (cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))) {
      return { valid: true, formatted: this.formatPhoneNumber(phoneNumber) };
    }
    
    return { valid: false, error: 'Invalid US phone number format' };
  }
}

// Export singleton instance
export const telnyxService = new TelnyxService();
export default TelnyxService;