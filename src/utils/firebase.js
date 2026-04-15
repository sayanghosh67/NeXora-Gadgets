// Firebase is optional and only needed for real phone OTP.
// This file exports a null auth object so the app runs without Firebase installed.
// To enable real Firebase Phone Auth:
//   1. Run: npm install firebase
//   2. Set VITE_FIREBASE_* env vars in .env
//   3. Replace this file with the full Firebase initializer.

export const auth = null
