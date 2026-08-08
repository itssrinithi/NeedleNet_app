# ⭐ NeedleNet Review Management API Documentation

## 📋 Overview
Complete review system where customers can write text reviews for tailors with ratings and comments.

---

## ⭐ **1. Customer Writes a Review**

### **POST** `/api/reviews`
Customer writes a review for a specific tailor.

**Request Body:**
```json
{
  "customerId": "64f1234567890abcdef12345",
  "tailorId": "64f1234567890abcdef12346",
  "rating": 5,
  "comment": "Excellent work! The shirt fits perfectly and the quality is outstanding. Highly recommended!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review added successfully",
  "review": {
    "id": "64f1234567890abcdef12347",
    "customerId": "64f1234567890abcdef12345",
    "tailorId": "64f1234567890abcdef12346",
    "rating": 5,
    "comment": "Excellent work! The shirt fits perfectly and the quality is outstanding. Highly recommended!",
    "createdAt": "2025-01-03T10:30:00.000Z"
  }
}
```

---

## 📖 **2. Get All Reviews for a Tailor**

### **GET** `/api/reviews/tailor/:tailorId`
Get all reviews for a specific tailor with average rating.

**Response:**
```json
{
  "success": true,
  "tailor": {
    "id": "64f1234567890abcdef12346",
    "fullName": "Tailor Name",
    "shopName": "Fashion Tailors"
  },
  "averageRating": 4.5,
  "totalReviews": 3,
  "reviews": [
    {
      "id": "64f1234567890abcdef12347",
      "customer": {
        "id": "64f1234567890abcdef12345",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "rating": 5,
      "comment": "Excellent work! The shirt fits perfectly and the quality is outstanding. Highly recommended!",
      "createdAt": "2025-01-03T10:30:00.000Z"
    },
    {
      "id": "64f1234567890abcdef12348",
      "customer": {
        "id": "64f1234567890abcdef12349",
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "rating": 4,
      "comment": "Great service and good quality work. Will definitely recommend!",
      "createdAt": "2025-01-02T15:20:00.000Z"
    }
  ]
}
```

---

## 👤 **3. Get All Reviews by a Customer**

### **GET** `/api/reviews/customer/:customerId`
Get all reviews written by a specific customer.

**Response:**
```json
{
  "success": true,
  "customer": {
    "id": "64f1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "totalReviews": 2,
  "reviews": [
    {
      "id": "64f1234567890abcdef12347",
      "tailor": {
        "id": "64f1234567890abcdef12346",
        "fullName": "Tailor Name",
        "shopName": "Fashion Tailors"
      },
      "rating": 5,
      "comment": "Excellent work! The shirt fits perfectly and the quality is outstanding. Highly recommended!",
      "createdAt": "2025-01-03T10:30:00.000Z"
    },
    {
      "id": "64f1234567890abcdef12350",
      "tailor": {
        "id": "64f1234567890abcdef12351",
        "fullName": "Another Tailor",
        "shopName": "Style Studio"
      },
      "rating": 4,
      "comment": "Good work, satisfied with the service.",
      "createdAt": "2025-01-01T12:00:00.000Z"
    }
  ]
}
```

---

## ✏️ **4. Update a Review**

### **PUT** `/api/reviews/:reviewId`
Update a review (only by the customer who wrote it).

**Request Body:**
```json
{
  "customerId": "64f1234567890abcdef12345",
  "rating": 4,
  "comment": "Updated comment: Very good work, but could be faster with delivery."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review updated successfully",
  "review": {
    "id": "64f1234567890abcdef12347",
    "customerId": "64f1234567890abcdef12345",
    "tailorId": "64f1234567890abcdef12346",
    "rating": 4,
    "comment": "Updated comment: Very good work, but could be faster with delivery.",
    "createdAt": "2025-01-03T10:30:00.000Z"
  }
}
```

---

## 🗑️ **5. Delete a Review**

### **DELETE** `/api/reviews/:reviewId`
Delete a review (only by the customer who wrote it).

**Request Body:**
```json
{
  "customerId": "64f1234567890abcdef12345"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## 🔧 **Error Responses**

**400 Bad Request (Missing Fields):**
```json
{
  "success": false,
  "message": "All fields are required: customerId, tailorId, rating, comment"
}
```

**400 Bad Request (Invalid Rating):**
```json
{
  "success": false,
  "message": "Rating must be between 1 and 5"
}
```

**400 Bad Request (Duplicate Review):**
```json
{
  "success": false,
  "message": "You have already reviewed this tailor"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Customer not found"
}
```

**403 Forbidden (Ownership):**
```json
{
  "success": false,
  "message": "You can only update your own reviews"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error adding review",
  "error": "Error details"
}
```

---

## 🚀 **Testing Examples**

### **1. Write a Review (Postman)**
```
POST http://localhost:5000/api/reviews
Content-Type: application/json

{
  "customerId": "64f1234567890abcdef12345",
  "tailorId": "64f1234567890abcdef12346",
  "rating": 5,
  "comment": "Excellent work! The shirt fits perfectly and the quality is outstanding. Highly recommended!"
}
```

### **2. Get Tailor Reviews**
```
GET http://localhost:5000/api/reviews/tailor/64f1234567890abcdef12346
```

### **3. Get Customer Reviews**
```
GET http://localhost:5000/api/reviews/customer/64f1234567890abcdef12345
```

### **4. Update Review**
```
PUT http://localhost:5000/api/reviews/64f1234567890abcdef12347
Content-Type: application/json

{
  "customerId": "64f1234567890abcdef12345",
  "rating": 4,
  "comment": "Updated comment: Very good work, but could be faster with delivery."
}
```

### **5. Delete Review**
```
DELETE http://localhost:5000/api/reviews/64f1234567890abcdef12347
Content-Type: application/json

{
  "customerId": "64f1234567890abcdef12345"
}
```

---

## 📝 **Notes**

1. **Rating System**: 1-5 stars (integer values)
2. **One Review Per Customer**: Each customer can only review a tailor once
3. **Ownership**: Customers can only update/delete their own reviews
4. **Average Rating**: Automatically calculated for each tailor
5. **Sorting**: Reviews are sorted by creation date (newest first)
6. **Validation**: All required fields are validated
7. **Error Handling**: Comprehensive error messages

---

## 🔒 **Security Features**

- **Ownership Validation**: Only review owners can update/delete
- **Duplicate Prevention**: One review per customer per tailor
- **Input Validation**: Rating range and required field validation
- **User Verification**: Customer and tailor existence verification

---

## 📊 **Rating Guidelines**

- **5 Stars**: Excellent work, highly recommended
- **4 Stars**: Very good work, minor issues
- **3 Stars**: Satisfactory work, some improvements needed
- **2 Stars**: Below average, significant issues
- **1 Star**: Poor work, not recommended 