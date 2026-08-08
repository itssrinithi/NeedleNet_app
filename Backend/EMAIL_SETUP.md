# Email Setup for OTP System

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/needlenet

# Email Configuration (for OTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS`

## Testing Email

The system will:
- Send OTP emails via Gmail SMTP
- Log email sending status in console
- **OTP will ONLY be sent via email, never in API response**
- If email fails, OTP record is deleted and error is returned

## Security Features

- OTPs are hashed before storing in database
- 10-minute expiration for OTPs
- Single-use reset tokens
- Generic success messages to prevent email enumeration
- **No OTP exposure in API responses** 