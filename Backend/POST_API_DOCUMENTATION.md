# 📸 NeedleNet Post & Profile Management API Documentation

## 📋 Overview
Complete post management system for tailors to share their work and profile picture management.

---

## 📸 **1. Tailor Creates a Post**

### **POST** `/api/posts`
Create a new post with photo and description.

**Request Body (multipart/form-data):**
```
tailorId: "64f1234567890abcdef12346"
description: "Beautiful custom shirt design for wedding"
image: [file upload]
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "id": "64f1234567890abcdef12347",
    "tailorId": "64f1234567890abcdef12346",
    "image": "post-1754206656508-204965975.jpg",
    "description": "Beautiful custom shirt design for wedding",
    "createdAt": "2025-01-03T10:30:00.000Z"
  }
}
```

---

## 📖 **2. Get Tailor's Posts**

### **GET** `/api/posts/tailor/:tailorId`
Get all posts by a specific tailor.

**Response:**
```json
{
  "success": true,
  "posts": [
    {
      "id": "64f1234567890abcdef12347",
      "tailorId": "64f1234567890abcdef12346",
      "image": "post-1754206656508-204965975.jpg",
      "description": "Beautiful custom shirt design for wedding",
      "createdAt": "2025-01-03T10:30:00.000Z"
    },
    {
      "id": "64f1234567890abcdef12348",
      "tailorId": "64f1234567890abcdef12346",
      "image": "post-1754206656509-204965976.jpg",
      "description": "Elegant kurta design",
      "createdAt": "2025-01-02T15:20:00.000Z"
    }
  ]
}
```

---

## 🗑️ **3. Delete a Post**

### **DELETE** `/api/posts/:postId`
Delete a specific post (only by the post owner).

**Request Body:**
```json
{
  "tailorId": "64f1234567890abcdef12346"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

## 👤 **4. Update Tailor Profile Picture**

### **PUT** `/api/tailors/:tailorId/profile-picture`
Upload or update tailor's profile picture.

**Request Body (multipart/form-data):**
```
profilePicture: [file upload]
```

**Response:**
```json
{
  "success": true,
  "message": "Profile picture updated successfully",
  "tailor": {
    "id": "64f1234567890abcdef12346",
    "fullName": "Tailor Name",
    "shopName": "Fashion Tailors",
    "profilePicture": "profile-1754206656508-204965975.jpg"
  }
}
```

---

## 🔧 **Error Responses**

**400 Bad Request (Missing Image):**
```json
{
  "success": false,
  "message": "Image is required"
}
```

**404 Not Found (Tailor/Post):**
```json
{
  "success": false,
  "message": "Tailor not found"
}
```

**403 Forbidden (Delete Permission):**
```json
{
  "success": false,
  "message": "You can only delete your own posts"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error creating post",
  "error": "Error details"
}
```

---

## 🚀 **Testing Examples**

### **1. Create Post (Postman)**
```
POST http://localhost:5000/api/posts
Content-Type: multipart/form-data

tailorId: 64f1234567890abcdef12346
description: Beautiful custom shirt design
image: [file upload]
```

### **2. Get Tailor Posts**
```
GET http://localhost:5000/api/posts/tailor/64f1234567890abcdef12346
```

### **3. Delete Post**
```
DELETE http://localhost:5000/api/posts/64f1234567890abcdef12347
Content-Type: application/json

{
  "tailorId": "64f1234567890abcdef12346"
}
```

### **4. Update Profile Picture**
```
PUT http://localhost:5000/api/tailors/64f1234567890abcdef12346/profile-picture
Content-Type: multipart/form-data

profilePicture: [file upload]
```

---

## 📝 **Notes**

1. **File Upload**: Images are stored in the uploads directory
2. **Image Validation**: Only image files are accepted
3. **Ownership**: Tailors can only delete their own posts
4. **Profile Picture**: Replaces existing profile picture
5. **Sorting**: Posts are sorted by creation date (newest first)
6. **File Naming**: Automatic unique filename generation

---

## 📁 **File Structure**

```
uploads/
├── post-images/          # Post images
├── profile-pictures/     # Profile pictures
└── other-uploads/        # Other file uploads
```

---

## 🔒 **Security Features**

- **Ownership Validation**: Only post owners can delete posts
- **File Type Validation**: Only image files accepted
- **File Size Limits**: Configurable file size restrictions
- **Unique Filenames**: Prevents file conflicts 