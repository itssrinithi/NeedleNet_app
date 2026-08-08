# Email Setup Guide

## Step 1: Create .env File

Create a file named `.env` in the root directory of your project with the following content:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/needlenet

# Email Configuration (for OTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
```

## Step 2: Gmail Setup

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Security → 2-Step Verification
- Enable 2-Factor Authentication

### 2. Generate App Password
- Go to Google Account settings
- Security → 2-Step Verification → App passwords
- Select "Mail" from the dropdown
- Click "Generate"
- Copy the 16-character password

### 3. Update .env File
Replace the placeholder values in your `.env` file:
```env
EMAIL_USER=your-actual-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
```

## Step 3: Test Configuration

1. Restart your server:
   ```bash
   node app.js
   ```

2. You should see:
   ```
   ✅ Email server is ready to send messages
   ```

3. If you see errors, check:
   - Email credentials are correct
   - 2FA is enabled
   - App password is generated for "Mail"

## Step 4: Test OTP Flow

1. Request OTP:
   ```bash
   POST http://localhost:5000/api/auth/forgot-password
   {
     "email": "test@example.com",
     "userType": "customer"
   }
   ```

2. Check your email inbox for the OTP

3. Verify OTP and reset password

## Troubleshooting

### "Missing credentials" error
- Make sure `.env` file exists in root directory
- Check that EMAIL_USER and EMAIL_PASS are set correctly
- Verify 2FA is enabled on Gmail

### "Invalid login" error
- Use the app password, not your regular Gmail password
- Make sure app password is generated for "Mail"
- Check that email address is correct

### Email not received
- Check spam folder
- Verify email address is correct
- Check server logs for email sending status 