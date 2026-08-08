# 🧪 Order Management System - Testing Guide

## 🚀 **Server Status**
✅ Server running on: `http://localhost:5000`

---

## 📝 **1. Create Order (Customer Places Order)**

### **POST** `http://localhost:5000/api/orders`
**Content-Type:** `multipart/form-data`

### **Correct Form Data Structure:**

| Key | Type | Value | Required |
|-----|------|-------|----------|
| `customerId` | Text | `688ef5b823219326a639f32f` | ✅ |
| `tailorId` | Text | `688f20ebc6dd48e89ed85743` | ✅ |
| `garmentType` | Text | `Shirt` | ✅ |
| `measurements[type]` | Text | `M` | ✅ |
| `measurements[manualMeasurements]` | Text | `Chest: 40, Waist: 32, Length: 28` | ❌ |
| `stylePreferences` | Text | `Formal shirt with French cuffs` | ❌ |
| `desiredCompletionDate` | Text | `2024-01-15` | ❌ |
| `approximateBudget` | Text | `1500` | ❌ |
| `deliveryAddress` | Text | `Chennai, Tamil Nadu, India` | ✅ |
| `contactName` | Text | `John Doe` | ✅ |
| `contactEmail` | Text | `john@example.com` | ✅ |
| `contactPhone` | Text | `9876543210` | ✅ |
| `referenceImages` | File | `[upload image files]` | ❌ |

### **Expected Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "orderId": "250103-0001",
    "customerId": "688ef5b823219326a639f32f",
    "tailorId": "688f20ebc6dd48e89ed85743",
    "garmentType": "Shirt",
    "status": "pending",
    "deliveryAddress": "Chennai, Tamil Nadu, India",
    "deliveryLocation": {
      "lat": 13.0827,
      "lng": 80.2707
    },
    "createdAt": "2025-01-03T10:30:00.000Z"
  }
}
```

---

## 🔧 **Fix for Your Current Request:**

### **Issue:** The `measurements` field structure is incorrect
### **Solution:** Use the correct nested structure

**❌ Wrong (what you have):**
```
measurements.type: M
measurements.manualM...: 40
measurements.manualM...: 32  
measurements.manualM...: 28
```

**✅ Correct:**
```
measurements[type]: M
measurements[manualMeasurements]: Chest: 40, Waist: 32, Length: 28
```

---

## 🧪 **2. Test Tailor Views Orders**

### **GET** `http://localhost:5000/api/orders/tailor/688f20ebc6dd48e89ed85743`
**Query Parameters:** `?status=pending`

---

## ✅ **3. Test Tailor Confirms Order**

### **PUT** `http://localhost:5000/api/orders/250103-0001/tailor-response`
**Content-Type:** `application/json`

```json
{
  "action": "confirm",
  "tailorPrice": 1800
}
```

---

## 🚚 **4. Test Tailor Marks for Delivery**

### **PUT** `http://localhost:5000/api/orders/250103-0001/ready-for-delivery`

---

## 💳 **5. Test Customer Updates Payment**

### **PUT** `http://localhost:5000/api/orders/250103-0001/payment`
**Content-Type:** `application/json`

```json
{
  "paymentStatus": "paid"
}
```

---

## 🚛 **6. Test Delivery Partner Views Orders**

### **GET** `http://localhost:5000/api/orders/delivery/[deliveryPartnerId]?status=pickup_pending`

---

## 📦 **7. Test Delivery Partner Updates Status**

### **PUT** `http://localhost:5000/api/orders/250103-0001/status`
**Content-Type:** `application/json`

```json
{
  "status": "pickup_done"
}
```

---

## 👤 **8. Test Customer Views Orders**

### **GET** `http://localhost:5000/api/orders/customer/688ef5b823219326a639f32f`

---

## 📋 **9. Test Get Order Details**

### **GET** `http://localhost:5000/api/orders/details/250103-0001`

---

## 🎯 **Quick Test Steps:**

1. **Create Order** (use the corrected form data above)
2. **Get Order ID** from response
3. **Tailor confirms** the order with price
4. **Tailor marks** for delivery
5. **Customer updates** payment
6. **Delivery partner** updates status
7. **Customer tracks** the order

---

## 🔍 **Troubleshooting:**

### **Common Issues:**
- ❌ **Missing required fields**: Check all required fields are present
- ❌ **Invalid measurements structure**: Use `measurements[type]` and `measurements[manualMeasurements]`
- ❌ **File upload issues**: Make sure image files are valid
- ❌ **Invalid IDs**: Ensure customerId and tailorId exist in database

### **Valid Garment Types:**
- Shirt, Pant, Blouse, Kurta, Salwar, Lehenga, Saree Fall
- School Uniform, Frock, Suit, Sherwani, Gown, Coat, Churidar

### **Valid Measurement Types:**
- XXS, XS, S, M, L, XL, Manual

---

## 📞 **Need Help?**
If you get errors, check:
1. All required fields are present
2. IDs exist in database
3. File uploads are valid
4. JSON format is correct for PUT requests 