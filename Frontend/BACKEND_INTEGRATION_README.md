# Backend Integration for NeedleNet App

## Overview
This document explains how to set up and use the backend integration for the NeedleNet Android application.

## What's Been Implemented

### 1. API Service Layer
- **ApiService.kt**: Interface defining all API endpoints
- **NetworkModule.kt**: Retrofit configuration and setup
- **AppConfig.kt**: Centralized configuration for backend URLs

### 2. Data Models
- **LoginRequest.kt**: Login request data with email and password
- **LoginResponse.kt**: Simple login response with message

### 3. Repository Pattern
- **AuthRepository.kt**: Handles authentication operations
- **SessionManager.kt**: Manages user session and preferences

### 4. Updated Activities
- **CustomerLoginActivity.kt**: Now integrated with backend API

## Setup Instructions

### 1. Backend URL
The app is configured to use: `http://localhost:5000/api/`

**Note**: For production, you'll need to update this in `AppConfig.kt`

### 2. Backend API Requirements
Your backend should implement this endpoint:

#### Login
- **URL**: `POST http://localhost:5000/api/auth/login`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "Login successful"
}
```

## Features Implemented

### Customer Login
- ✅ Input validation (email format, password length)
- ✅ Backend API integration with your actual endpoint
- ✅ Session management
- ✅ Automatic navigation on success
- ✅ Error handling and user feedback
- ✅ Loading states during API calls

### Session Management
- ✅ Secure token storage
- ✅ User data persistence
- ✅ Auto-login for returning users
- ✅ Session clearing on logout

## Usage

### 1. Login Flow
1. User enters email and password
2. App validates email format and password length
3. App calls your backend API at `http://localhost:5000/api/auth/login`
4. On success: saves session and navigates to CustomerFeed
5. On failure: shows error message

### 2. Session Check
- App automatically checks if user is logged in
- If logged in, skips login screen and goes to main app

## Testing

### 1. Test with Your Backend
- Ensure your backend server is running on `localhost:5000`
- Test the login endpoint with Postman or similar tool
- Verify the response format matches the expected structure

### 2. Test Scenarios
- Valid email and password
- Invalid credentials
- Network errors
- Server errors
- Session persistence

## Troubleshooting

### Common Issues
1. **Network Error**: Check if your backend server is running on port 5000
2. **Parsing Error**: Verify your backend returns the exact JSON format
3. **Timeout**: Check network timeouts in NetworkModule
4. **Build Error**: Ensure all dependencies are synced

### Debug Mode
NetworkModule includes HTTP logging. Check Logcat for API request/response details.

## Notes
- All existing XML layouts remain unchanged
- Navigation flows are preserved
- UI/UX design is maintained
- Only backend logic has been added
- Uses your actual API endpoint: `http://localhost:5000/api/auth/login`

