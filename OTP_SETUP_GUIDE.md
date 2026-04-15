# Real OTP Integration Guide

To make the OTP system work with real phone numbers and emails, you need to configure the following services in your `.env` file.

## 1. Email OTP (via EmailJS)
1. Go to [EmailJS](https://www.emailjs.com/) and create a free account.
2. Add a **Email Service** (e.g., Gmail).
3. Create an **Email Template** with the following content:
   - Subject: `Your Verification Code: {{otp_code}}`
   - Body: `Hello {{to_name}}, your OTP is {{otp_code}}. It expires in 5 minutes.`
4. Get your:
   - **Service ID**: (e.g., `service_xxxx`)
   - **Template ID**: (e.g., `template_xxxx`)
   - **Public Key**: (Found in Account -> API Keys)
5. Add them to `.env`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 2. SMS OTP (via Twilio)
1. Go to [Twilio](https://www.twilio.com/) and sign up.
2. Create a **Verify Service** in the Twilio Console (Develop -> Verify -> Services).
3. Get your:
   - **Account SID**: (Found on Dashboard)
   - **Auth Token**: (Found on Dashboard)
   - **Verify Service SID**: (Starts with `VA...`)
4. Add them to `.env`:
   ```env
   VITE_TWILIO_ACCOUNT_SID=your_account_sid
   VITE_TWILIO_AUTH_TOKEN=your_auth_token
   VITE_TWILIO_VERIFY_SERVICE_SID=your_verify_service_sid
   ```

> [!WARNING]
> Calling Twilio directly from the frontend exposes your `Auth Token`. For a production app, you should create a simple backend (Node.js/Express) to handle these calls securely.

## 3. How it Works
- **Email**: The app generates a 6-digit code and sends it via EmailJS.
- **SMS**: The app asks Twilio Verify to send a code. When the user enters it, the app asks Twilio to verify it.
