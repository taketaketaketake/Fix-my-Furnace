/**
 * Verification utility functions for phone verification system
 */

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateExpirationTime(minutes = 10) {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + minutes);
  return expires.toISOString();
}

async function createVerificationRecord(supabase, formData, phoneNumber) {
  const verificationCode = generateVerificationCode();
  const expiresAt = generateExpirationTime(10);
  
  const { data, error } = await supabase
    .from('form_submissions')
    .insert([{
      ...formData,
      phone_number: phoneNumber,
      verification_status: 'pending',
      verification_code: verificationCode,
      verification_expires_at: expiresAt
    }])
    .select();

  if (error) {
    console.error('Error creating verification record:', error);
    throw new Error('Failed to create verification record');
  }

  return data[0];
}

async function verifyPhoneToken(supabase, token) {
  // Find record by token
  const { data: records, error: findError } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('verification_token', token)
    .eq('verification_status', 'pending')
    .single();

  if (findError || !records) {
    return { success: false, error: 'Invalid verification token' };
  }

  // Check if expired
  const now = new Date();
  const expiresAt = new Date(records.verification_expires_at);
  
  if (now > expiresAt) {
    // Mark as expired
    await supabase
      .from('form_submissions')
      .update({ verification_status: 'expired' })
      .eq('verification_token', token);
    
    return { success: false, error: 'Verification link has expired' };
  }

  // Mark as verified
  const { data, error: updateError } = await supabase
    .from('form_submissions')
    .update({ 
      verification_status: 'verified',
      verified_at: new Date().toISOString()
    })
    .eq('verification_token', token)
    .select();

  if (updateError) {
    console.error('Error updating verification status:', updateError);
    return { success: false, error: 'Failed to verify phone number' };
  }

  return { success: true, record: data[0] };
}

async function canResendVerification(supabase, phoneNumber, maxAttempts = 3) {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('verification_attempts')
    .eq('phone_number', phoneNumber)
    .eq('verification_status', 'pending')
    .single();

  if (error || !data) {
    return { canResend: false, error: 'No pending verification found' };
  }

  const canResend = data.verification_attempts < maxAttempts;
  return { 
    canResend, 
    attemptsRemaining: maxAttempts - data.verification_attempts,
    error: canResend ? null : 'Maximum verification attempts exceeded'
  };
}

async function cleanupExpiredVerifications(supabase, hoursOld = 24) {
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - hoursOld);

  const { data, error } = await supabase
    .from('form_submissions')
    .delete()
    .eq('verification_status', 'expired')
    .lt('verification_expires_at', cutoffTime.toISOString());

  return { data, error };
}

export { canResendVerification as a, generateExpirationTime as b, cleanupExpiredVerifications as c, createVerificationRecord as d, generateVerificationCode as g, verifyPhoneToken as v };
