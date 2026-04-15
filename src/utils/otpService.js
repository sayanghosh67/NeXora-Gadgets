import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  sendEmailVerification 
} from 'firebase/auth';
import { auth } from './firebase.js';

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send';

/**
 * Sends a real OTP to the specified email address using EmailJS.
 */
export const sendEmailOTP = async (email, otp) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('--- DEVELOPMENT FALLBACK ---');
    console.warn(`Email OTP for ${email}: ${otp}`);
    return true; 
  }

  try {
    const response = await fetch(EMAILJS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: { to_email: email, otp_code: otp, to_name: email.split('@')[0] },
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to send email OTP:', error);
    return false;
  }
};

/**
 * Sends a real SMS OTP using Firebase Phone Auth.
 * This is COMPLETELY FREE for up to 10 SMS/day.
 * @param {string} phoneNumber - The recipient's phone number.
 */
export const sendSMSOTP = async (phoneNumber) => {
  // Check if Firebase is configured
  if (import.meta.env.VITE_FIREBASE_API_KEY === "YOUR_API_KEY") {
    console.warn('--- DEVELOPMENT FALLBACK ---');
    console.warn(`SMS OTP for ${phoneNumber}: Use code 123456`);
    return true;
  }

  const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

  try {
    // Initialize reCAPTCHA
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });
    }

    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
    
    // Store confirmationResult in window to use during verification
    window.confirmationResult = confirmationResult;
    return true;
  } catch (error) {
    console.error('Firebase SMS Error:', error);
    return false;
  }
};

/**
 * Verifies the SMS code using Firebase.
 */
export const verifySMSOTP = async (phoneNumber, code) => {
  if (import.meta.env.VITE_FIREBASE_API_KEY === "YOUR_API_KEY") {
    return code === '123456';
  }

  try {
    if (!window.confirmationResult) {
      throw new Error('No SMS confirmation found. Please resend code.');
    }
    const result = await window.confirmationResult.confirm(code);
    return !!result.user;
  } catch (error) {
    console.error('Verification Error:', error);
    return false;
  }
};


