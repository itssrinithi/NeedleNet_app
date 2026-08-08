# 🧵 NeedleNet Order Management API Documentation

## 📋 Overview
Complete order management system for customers, tailors, and delivery partners.

---

## 🛍️ **1. Customer Places an Order**

### **POST** `/api/orders`
Create a new order with all required details.

**Request Body:**
```json
{
  "customerId": "64f1234567890abcdef12345",
  "tailorId": "64f1234567890abcdef12346",
  "garmentType": "Shirt",
  "measurements": {
    "type": "M",
    "manualMeasurements": "Chest: 40, Waist: 32, Length: 28"
  },
  "stylePreferences": "Formal shirt with French cuffs",
  "desiredCompletionDate": "2024-01-15",
  "approximateBudget": 1500,
  "deliveryAddress": "123 Main Street, City, State 12345",
  "contactName": "John Doe",
  "contactEmail": "john@example.com",
  "contactPhone": "9876543210"
}
```

**File Upload:**
- `referenceImages`: Up to 5 images (optional)

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "orderId": "250103-0001",
    "customerId": "64f1234567890abcdef12345",
    "tailorId": "64f1234567890abcdef12346",
    "garmentType": "Shirt",
    "status": "pending",
    "deliveryAddress": "123 Main Street, City, State 12345",
    "deliveryLocation": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "createdAt": "2025-01-03T10:30:00.000Z"
  }
}
```

---

## 👨‍💼 **2. Tailor Views Orders**

### **GET** `/api/orders/tailor/:tailorId`
Get all orders assigned to a specific tailor.

**Query Parameters:**
- `status` (optional): Filter by order status

**Example:**
```
GET /api/orders/tailor/64f1234567890abcdef12346?status=pending
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "orderId": "250103-0001",
      "customerId": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210"
      },
      "garmentType": "Shirt",
      "measurements": {
        "type": "M",
        "manualMeasurements": "Chest: 40, Waist: 32, Length: 28"
      },
      "status": "pending",
      "createdAt": "2025-01-03T10:30:00.000Z"
    }
  ]
}
```

---

## ✅ **3. Tailor Responds to Order**

### **PUT** `/api/orders/:orderId/tailor-response`
Tailor confirms or declines an order with pricing.

**Request Body:**
```json
{
  "action": "confirm",
  "tailorPrice": 1800
}
```

**OR**
```json
{
  "action": "decline"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order confirmed successfully",
  "order": {
    "orderId": "250103-0001",
    "status": "confirmed",
    "tailorPrice": 1800,
    "confirmedAt": "2025-01-03T11:00:00.000Z"
  }
}
```

---

## 🚚 **4. Tailor Marks Order for Delivery**

### **PUT** `/api/orders/:orderId/ready-for-delivery`
Mark completed order for delivery and assign delivery partner.

**Response:**
```json
{
  "success": true,
  "message": "Order assigned to delivery partner",
  "order": {
    "orderId": "250103-0001",
    "status": "pickup_pending",
    "deliveryPartnerId": "64f1234567890abcdef12347"
  },
  "deliveryPartner": {
    "id": "64f1234567890abcdef12347",
    "name": "Delivery Partner Name",
    "phone": "9876543211"
  }
}
```

---

## 💳 **5. Customer Updates Payment**

### **PUT** `/api/orders/:orderId/payment`
Update payment status for an order.

**Request Body:**
```json
{
  "paymentStatus": "paid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment status updated successfully",
  "order": {
    "orderId": "250103-0001",
    "paymentStatus": "paid"
  }
}
```

---

## 🚛 **6. Delivery Partner Views Orders**

### **GET** `/api/orders/delivery/:deliveryPartnerId`
Get orders assigned to a delivery partner.

**Query Parameters:**
- `status` (optional): Filter by order status

**Example:**
```
GET /api/orders/delivery/64f1234567890abcdef12347?status=pickup_pending
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "orderId": "250103-0001",
      "customerId": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210"
      },
      "tailorId": {
        "fullName": "Tailor Name",
        "shopName": "Fashion Tailors",
        "phone": "9876543212"
      },
      "deliveryAddress": "123 Main Street, City, State 12345",
      "status": "pickup_pending"
    }
  ]
}
```

---

## 📦 **7. Delivery Partner Updates Order Status**

### **PUT** `/api/orders/:orderId/status`
Update order status during delivery process.

**Request Body:**
```json
{
  "status": "pickup_done"
}
```

**Valid Status Values:**
- `pickup_pending` - Order ready for pickup
- `pickup_done` - Order picked up from tailor
- `under_stitching` - Order being stitched
- `shipped` - Order shipped for delivery
- `out_for_delivery` - Order out for final delivery
- `delivered` - Order delivered to customer

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "order": {
    "orderId": "250103-0001",
    "status": "pickup_done"
  }
}
```

---

## 👤 **8. Customer Views Orders & Tracking**

### **GET** `/api/orders/customer/:customerId`
Get all orders for a customer with tracking information.

**Query Parameters:**
- `status` (optional): Filter by order status

**Example:**
```
GET /api/orders/customer/64f1234567890abcdef12345?status=confirmed
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "orderId": "250103-0001",
      "garmentType": "Shirt",
      "status": "pickup_done",
      "tailorPrice": 1800,
      "paymentStatus": "paid",
      "tailorId": {
        "fullName": "Tailor Name",
        "shopName": "Fashion Tailors",
        "phone": "9876543212"
      },
      "deliveryPartnerId": {
        "fullName": "Delivery Partner Name",
        "phone": "9876543211"
      },
      "createdAt": "2025-01-03T10:30:00.000Z"
    }
  ]
}
```

---

## 📋 **9. Get Order Details**

### **GET** `/api/orders/details/:orderId`
Get complete order details by order ID.

**Response:**
```json
{
  "success": true,
  "order": {
    "orderId": "250103-0001",
    "customerId": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    },
    "tailorId": {
      "fullName": "Tailor Name",
      "shopName": "Fashion Tailors",
      "phone": "9876543212",
      "addressLocation": {
        "lat": 12.9716,
        "lng": 77.5946
      }
    },
    "deliveryPartnerId": {
      "fullName": "Delivery Partner Name",
      "phone": "9876543211",
      "location": {
        "lat": 12.9716,
        "lng": 77.5946
      }
    },
    "garmentType": "Shirt",
    "measurements": {
      "type": "M",
      "manualMeasurements": "Chest: 40, Waist: 32, Length: 28"
    },
    "referenceImages": ["image1.jpg", "image2.jpg"],
    "stylePreferences": "Formal shirt with French cuffs",
    "desiredCompletionDate": "2024-01-15T00:00:00.000Z",
    "approximateBudget": 1500,
    "deliveryAddress": "123 Main Street, City, State 12345",
    "deliveryLocation": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "status": "pickup_done",
    "tailorPrice": 1800,
    "paymentStatus": "paid",
    "createdAt": "2025-01-03T10:30:00.000Z",
    "confirmedAt": "2025-01-03T11:00:00.000Z",
    "completedAt": "2025-01-03T12:00:00.000Z"
  }
}
```

---

## 🎯 **Order Status Flow**

```
pending → confirmed → in_progress → ready_for_delivery → 
pickup_pending → pickup_done → under_stitching → 
shipped → out_for_delivery → delivered
```

---

## 📏 **Garment Types Available**

- Shirt
- Pant
- Blouse
- Kurta
- Salwar
- Lehenga
- Saree Fall
- School Uniform
- Frock
- Suit
- Sherwani
- Gown
- Coat
- Churidar

---

## 📐 **Measurement Types**

- XXS
- XS
- S
- M
- L
- XL
- Manual (with custom measurements)

---

## 🔧 **Error Responses**

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Order not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error creating order",
  "error": "Error details"
}
```

---

## 🚀 **Testing Examples**

### **1. Create Order (Postman)**
```
POST http://localhost:5000/api/orders
Content-Type: multipart/form-data

customerId: 64f1234567890abcdef12345
tailorId: 64f1234567890abcdef12346
garmentType: Shirt
measurements[type]: M
measurements[manualMeasurements]: Chest: 40, Waist: 32
stylePreferences: Formal shirt
deliveryAddress: 123 Main Street, City
contactName: John Doe
contactEmail: john@example.com
contactPhone: 9876543210
referenceImages: [file upload]
```

### **2. Tailor Confirm Order**
```
PUT http://localhost:5000/api/orders/250103-0001/tailor-response
Content-Type: application/json

{
  "action": "confirm",
  "tailorPrice": 1800
}
```

### **3. Update Order Status**
```
PUT http://localhost:5000/api/orders/250103-0001/status
Content-Type: application/json

{
  "status": "pickup_done"
}
```

---

## 📝 **Notes**

1. **Order ID Format**: YYMMDD-XXXX (e.g., 250103-0001)
2. **File Upload**: Reference images are optional, max 5 files
3. **Geocoding**: Delivery addresses are automatically geocoded
4. **Delivery Assignment**: Orders are automatically assigned to nearest delivery partner
5. **Status Tracking**: Complete order lifecycle tracking
6. **Payment Integration**: Payment status tracking
7. **Location-based**: Delivery partner assignment based on customer location 