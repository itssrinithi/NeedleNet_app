# NeedleNet Backend API Documentation

## Overview
NeedleNet is a comprehensive tailoring and delivery platform with user registration and location-based services. Tailor and delivery partner accounts are automatically approved upon registration.

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Login (All User Types)
**POST** `/auth/login`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "customer" // Optional: If not provided, backend will automatically detect user type
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "user@example.com",
    "userType": "customer",
    "status": "active",
    "name": "Priya Sharma",
    "phone": "+919876543210",
    "location": {
      "lat": 12.9716,
      "lng": 77.5946
    }
  }
}
```

### 2. Password Reset Flow

#### Step 1: Request Password Reset
**POST** `/auth/forgot-password`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "userType": "customer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If an account with that email exists, an OTP has been sent."
}
```

**Note:** OTP is sent via email only. Check your email inbox for the OTP.

#### Step 2: Verify OTP
**POST** `/auth/verify-otp`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "userType": "customer",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully. You can now reset your password.",
  "resetToken": "abc123def456..."
}
```

#### Step 3: Reset Password
**POST** `/auth/reset-password`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "userType": "customer",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password has been reset successfully."
}
```

### 3. Customer Registration
**POST** `/auth/customer/register`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya.sharma@example.com",
  "phone": "+919876543210",
  "password": "securepassword123",
  "address": "456 Park Street, Bangalore, Karnataka, India",
  "pincode": "560001"
}
```

**Response:**
```json
{
  "message": "Customer account created successfully",
  "customer": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Priya Sharma",
    "email": "priya.sharma@example.com",
    "phone": "+919876543210",
    "location": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "pincode": "560001"
  }
}
```

### 2. Tailor Registration
**POST** `/auth/tailor/register`

**Content-Type:** `multipart/form-data`

**Text Fields:**
```
fullName: "John Doe"
email: "john.doe@example.com"
phone: "+919876543210"
password: "securepassword123"
address: "123 Main Street, Bangalore, Karnataka, India"
aadharNumber: "123456789012"
shopName: "John's Tailoring Shop"
shopAddress: "456 Commercial Street, Bangalore, Karnataka, India"
yearsOfExperience: "5"
specializations: "Bridal,Formals,Alterations"
upiId: "john.doe@upi"
```

**File Fields:**
```
idProof: [File - PDF or Image]
addressProof: [File - PDF or Image]
shopLicense: [File - PDF or Image] (optional)
shopImages: [Files - Up to 5 images] (optional)
workVideo: [File - Video] (optional)
```

**Response:**
```json
{
  "message": "Tailor account created successfully and is now active.",
  "tailor": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+919876543210",
    "addressLocation": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "aadharNumber": "123456789012",
    "shopName": "John's Tailoring Shop",
    "shopLocation": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "yearsOfExperience": 5,
    "specializations": ["Bridal", "Formals", "Alterations"],
    "idProof": "idProof-1234567890-123456789.pdf",
    "addressProof": "addressProof-1234567890-123456789.pdf",
    "shopLicense": "shopLicense-1234567890-123456789.pdf",
    "shopImages": ["shopImages-1234567890-123456789.jpg"],
    "workVideo": "workVideo-1234567890-123456789.mp4",
    "upiId": "john.doe@upi",
    "status": "active"
  }
}
```

### 3. Delivery Partner Registration
**POST** `/auth/delivery/register`

**Content-Type:** `multipart/form-data`

**Text Fields:**
```
fullName: "Rahul Kumar"
email: "rahul.kumar@example.com"
phone: "+919876543210"
password: "securepassword123"
address: "789 Delivery Street, Bangalore, Karnataka, India"
aadharNumber: "123456789012"
vehicleType: "Bike"
pricePerKm: "15"
areaOfService: "Bangalore City"
upiId: "rahul.kumar@upi"
```

**File Fields:**
```
idProof: [File - PDF or Image]
addressProof: [File - PDF or Image]
vehicleRegistration: [File - PDF or Image]
drivingLicense: [File - PDF or Image]
```

**Response:**
```json
{
  "message": "Delivery partner account created successfully and is now active.",
  "deliveryPartner": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": "Rahul Kumar",
    "email": "rahul.kumar@example.com",
    "phone": "+919876543210",
    "location": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "status": "active"
  }
}
```

## Admin Endpoints

### 1. Get Pending Registrations
**GET** `/admin/pending`

**Response:**
```json
{
  "tailors": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "status": "pending"
    }
  ],
  "deliveryPartners": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "fullName": "Rahul Kumar",
      "email": "rahul.kumar@example.com",
      "status": "pending"
    }
  ]
}
```

### 2. Approve Tailor
**PUT** `/admin/tailor/approve/:id`

**Response:**
```json
{
  "message": "Tailor approved successfully",
  "tailor": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "status": "active"
  }
}
```

### 3. Reject Tailor
**PUT** `/admin/tailor/reject/:id`

**Request Body:**
```json
{
  "reason": "Incomplete documentation"
}
```

**Response:**
```json
{
  "message": "Tailor rejected successfully",
  "tailor": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "status": "rejected",
    "rejectionReason": "Incomplete documentation"
  }
}
```

### 4. Approve Delivery Partner
**PUT** `/admin/delivery/approve/:id`

**Response:**
```json
{
  "message": "Delivery partner approved successfully",
  "deliveryPartner": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "fullName": "Rahul Kumar",
    "email": "rahul.kumar@example.com",
    "status": "active"
  }
}
```

### 5. Reject Delivery Partner
**PUT** `/admin/delivery/reject/:id`

**Request Body:**
```json
{
  "reason": "Invalid vehicle registration"
}
```

## Tailor Management Endpoints

### 1. Get All Tailors
**GET** `/tailors?status=active`

**Query Parameters:**
- `status` (optional): Filter by status (pending, active, rejected)

**Response:**
```json
{
  "success": true,
  "count": 1,
  "tailors": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "status": "active"
    }
  ]
}
```

### 2. Get Pending Tailors
**GET** `/tailors/pending`

**Response:**
```json
{
  "success": true,
  "count": 1,
  "tailors": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "status": "pending"
    }
  ]
}
```

### 3. Get Tailors by Location
**GET** `/tailors/nearby?lat=12.9716&lng=77.5946&radius=10`

**Query Parameters:**
- `lat`: Latitude
- `lng`: Longitude
- `radius`: Search radius in km (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 1,
  "tailors": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "fullName": "John Doe",
      "shopLocation": {
        "lat": 12.9716,
        "lng": 77.5946
      }
    }
  ]
}
```

### 4. Get Tailor by ID
**GET** `/tailors/:id`

**Response:**
```json
{
  "success": true,
  "tailor": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "shopLocation": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "specializations": ["Bridal", "Formals"],
    "status": "active"
  }
}
```

### 5. Update Tailor Profile
**PUT** `/tailors/:id`

**Request Body:**
```json
{
  "fullName": "John Updated",
  "shopName": "Updated Tailoring Shop"
}
```

### 6. Delete Tailor
**DELETE** `/tailors/:id`

**Response:**
```json
{
  "success": true,
  "message": "Tailor deleted successfully"
}
```

## Delivery Partner Management Endpoints

### 1. Get All Delivery Partners
**GET** `/delivery?status=active`

### 2. Get Pending Delivery Partners
**GET** `/delivery/pending`

### 3. Get Delivery Partners by Location
**GET** `/delivery/nearby?lat=12.9716&lng=77.5946&radius=10`

### 4. Get Delivery Partner by ID
**GET** `/delivery/:id`

### 5. Update Delivery Partner Profile
**PUT** `/delivery/:id`

### 6. Delete Delivery Partner
**DELETE** `/delivery/:id`

## Customer Management Endpoints

### 1. Get All Customers
**GET** `/customers`

### 2. Get Customers by Location
**GET** `/customers/nearby?lat=12.9716&lng=77.5946&radius=10`

### 3. Get Customer by ID
**GET** `/customers/:id`

### 4. Update Customer Profile
**PUT** `/customers/:id`

### 5. Delete Customer
**DELETE** `/customers/:id`

## File Upload

### Supported File Types
- **Images**: JPEG, JPG, PNG, WebP
- **Documents**: PDF, JPEG, JPG, PNG
- **Videos**: MP4, AVI, MOV, WMV
- **Max File Size**: 10MB per file

### File Storage
- Files are stored in the `uploads/` directory
- Unique filenames are generated with timestamps
- File paths are stored in the database

## Error Handling

### Common Error Responses

**Validation Error:**
```json
{
  "error": "Validation failed",
  "details": ["Path `email` is required"]
}
```

**Duplicate Email:**
```json
{
  "message": "Tailor with this email already exists"
}
```

**Invalid Address:**
```json
{
  "message": "Invalid personal address. Please provide a valid address."
}
```

**File Upload Error:**
```json
{
  "error": "File too large. Maximum size is 10MB."
}
```

**Not Found:**
```json
{
  "message": "Tailor not found"
}
```

## Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **404**: Not Found
- **500**: Internal Server Error

## Features

### ✅ Implemented Features
1. **User Registration**: Customer, Tailor, Delivery Partner
2. **Automatic Account Approval**: Tailor and delivery partner accounts are automatically approved upon registration
3. **Address Geocoding**: String addresses → GPS coordinates
4. **File Upload**: Direct file upload in API requests
5. **Location-based Search**: Find nearby users
6. **Status Management**: Active, Rejected (admin approval no longer required)
7. **Error Handling**: Comprehensive error messages
8. **Database Index Management**: Automatic cleanup of problematic indexes

### 🔧 Technical Features
- **MongoDB**: Document-based database
- **Geospatial Indexes**: For location-based queries
- **File Upload**: Multer middleware with validation
- **Error Handling**: Specific error messages for different scenarios
- **Status Tracking**: Account status management
- **Security**: Password exclusion from responses

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Environment Variables:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Start Server:**
   ```bash
   npm start
   ```

4. **Test API:**
   Use the provided Postman requests to test the endpoints.

## Database Schema

### Tailor Schema
- Unique ID (MongoDB ObjectId)
- Personal and shop location coordinates
- File paths for documents
- Status tracking
- Specializations array

### Delivery Partner Schema
- Unique ID (MongoDB ObjectId)
- Location coordinates
- Vehicle and service details
- File paths for documents
- Status tracking

### Customer Schema
- Unique ID (MongoDB ObjectId)
- Location coordinates
- Basic profile information

All schemas include timestamps and proper indexing for performance. 