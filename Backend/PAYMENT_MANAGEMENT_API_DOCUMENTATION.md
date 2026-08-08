# 💰 NeedleNet Payment Management API Documentation

## 📋 Overview
Complete payment management system for admin to handle tailor platform fees and delivery partner salaries with UPI integration.

---

## 👔 **TAILOR PLATFORM FEE MANAGEMENT**

### **1. Tailor Views Their Payment Details**

#### **GET** `/api/payments/tailors/:tailorId/my-payment`
Tailor can view their own payment details and pending amount for a specific month.

**Query Parameters:**
- `month` (optional): Month in YYYY-MM format (default: current month)
- `year` (optional): Year (default: current year)

**Response:**
```json
{
  "success": true,
  "message": "Payment details retrieved successfully",
  "month": "2025-01",
  "year": 2025,
  "platformUPI": "tjsrinithi@okicici",
  "payment": {
    "id": "64f1234567890abcdef12347",
    "tailor": {
      "id": "64f1234567890abcdef12346",
      "fullName": "Tailor Name",
      "shopName": "Fashion Tailors",
      "email": "tailor@example.com",
      "phone": "9876543210",
      "status": "active"
    },
    "completedOrders": 10,
    "platformFeePerOrder": 50,
    "totalFeeAmount": 500,
    "paymentStatus": "pending",
    "paidAmount": 0,
    "paymentDate": null,
    "paymentMethod": null,
    "dueDate": "2025-02-07T00:00:00.000Z",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Payment Status Values:**
- `pending`: Payment due but not yet overdue
- `overdue`: Payment past due date
- `paid`: Payment completed
- `no_orders`: No completed orders for the month

---

### **2. Tailor Views Payment History**

#### **GET** `/api/payments/tailors/:tailorId/payment-history`
Tailor can view their complete payment history with summary.

**Query Parameters:**
- `limit` (optional): Number of months to retrieve (default: 12)

**Response:**
```json
{
  "success": true,
  "tailor": {
    "id": "64f1234567890abcdef12346",
    "fullName": "Tailor Name",
    "shopName": "Fashion Tailors",
    "email": "tailor@example.com",
    "phone": "9876543210"
  },
  "platformUPI": "tjsrinithi@okicici",
  "summary": {
    "totalPaid": 1500,
    "totalPending": 500,
    "totalOverdue": 200,
    "totalMonths": 6
  },
  "paymentHistory": [
    {
      "id": "64f1234567890abcdef12347",
      "month": "2025-01",
      "year": 2025,
      "completedOrders": 10,
      "totalFeeAmount": 500,
      "paymentStatus": "pending",
      "paidAmount": 0,
      "paymentDate": null,
      "paymentMethod": null,
      "dueDate": "2025-02-07T00:00:00.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "id": "64f1234567890abcdef12348",
      "month": "2024-12",
      "year": 2024,
      "completedOrders": 8,
      "totalFeeAmount": 400,
      "paymentStatus": "paid",
      "paidAmount": 400,
      "paymentDate": "2024-12-15T10:30:00.000Z",
      "paymentMethod": "UPI",
      "dueDate": "2025-01-07T00:00:00.000Z",
      "createdAt": "2024-12-01T00:00:00.000Z"
    }
  ]
}
```

---

### **3. Get Pending Tailor Payments (Admin)**

#### **GET** `/api/payments/tailors/pending`
Admin sees all tailors who haven't paid their platform fee.

**Query Parameters:**
- `month` (optional): Month in YYYY-MM format (default: current month)
- `year` (optional): Year (default: current year)

**Response:**
```json
{
  "success": true,
  "month": "2025-01",
  "year": 2025,
  "totalPendingAmount": 2500,
  "totalPendingTailors": 5,
  "platformUPI": "tjsrinithi@okicici",
  "pendingPayments": [
    {
      "id": "64f1234567890abcdef12347",
      "tailor": {
        "id": "64f1234567890abcdef12346",
        "fullName": "Tailor Name",
        "shopName": "Fashion Tailors",
        "email": "tailor@example.com",
        "phone": "9876543210",
        "status": "active"
      },
      "completedOrders": 10,
      "platformFeePerOrder": 50,
      "totalFeeAmount": 500,
      "paymentStatus": "pending",
      "dueDate": "2025-02-07T00:00:00.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### **4. Get Paid Tailor Payments (Admin)**

#### **GET** `/api/payments/tailors/paid`
Admin sees all tailors who have paid their platform fee.

**Query Parameters:**
- `month` (optional): Month in YYYY-MM format
- `year` (optional): Year

**Response:**
```json
{
  "success": true,
  "month": "2025-01",
  "year": 2025,
  "totalPaidAmount": 1500,
  "totalPaidTailors": 3,
  "paidPayments": [
    {
      "id": "64f1234567890abcdef12348",
      "tailor": {
        "id": "64f1234567890abcdef12349",
        "fullName": "Paid Tailor",
        "shopName": "Style Studio",
        "email": "paid@example.com",
        "phone": "9876543211"
      },
      "completedOrders": 8,
      "totalFeeAmount": 400,
      "paidAmount": 400,
      "paymentDate": "2025-01-15T10:30:00.000Z",
      "paymentMethod": "UPI"
    }
  ]
}
```

---

### **5. Block Tailor Account (Admin)**

#### **PUT** `/api/payments/tailors/:tailorId/block`
Admin blocks tailor account for non-payment.

**Request Body:**
```json
{
  "reason": "Platform fee not paid within due date"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tailor account blocked successfully",
  "tailor": {
    "id": "64f1234567890abcdef12346",
    "fullName": "Tailor Name",
    "shopName": "Fashion Tailors",
    "status": "blocked"
  }
}
```

---

### **6. Tailor Confirms Payment**

#### **PUT** `/api/payments/tailors/:tailorId/confirm-payment`
Tailor confirms they have paid the platform fee.

**Request Body:**
```json
{
  "paymentMethod": "UPI",
  "transactionId": "TXN123456789"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment confirmed successfully",
  "payment": {
    "id": "64f1234567890abcdef12347",
    "totalFeeAmount": 500,
    "paidAmount": 500,
    "paymentDate": "2025-01-15T10:30:00.000Z",
    "paymentMethod": "UPI"
  }
}
```

---

## 🚚 **DELIVERY PARTNER SALARY MANAGEMENT**

### **1. Get Pending Delivery Partner Payments**

#### **GET** `/api/payments/delivery/pending`
Admin sees all delivery partners who are yet to be paid with their UPI IDs.

**Query Parameters:**
- `month` (optional): Month in YYYY-MM format
- `year` (optional): Year

**Response:**
```json
{
  "success": true,
  "month": "2025-01",
  "year": 2025,
  "totalPendingAmount": 1800,
  "totalPendingPartners": 6,
  "pendingPayments": [
    {
      "id": "64f1234567890abcdef12350",
      "deliveryPartner": {
        "id": "64f1234567890abcdef12351",
        "fullName": "Delivery Partner Name",
        "email": "delivery@example.com",
        "phone": "9876543212",
        "status": "active",
        "upiId": "deliverypartner@upi"
      },
      "completedDeliveries": 15,
      "salaryPerDelivery": 30,
      "totalSalary": 450,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### **2. Get Paid Delivery Partner Payments**

#### **GET** `/api/payments/delivery/paid`
Admin sees all delivery partners who have been paid.

**Response:**
```json
{
  "success": true,
  "month": "2025-01",
  "year": 2025,
  "totalPaidAmount": 1200,
  "totalPaidPartners": 4,
  "paidPayments": [
    {
      "id": "64f1234567890abcdef12352",
      "deliveryPartner": {
        "id": "64f1234567890abcdef12353",
        "fullName": "Paid Partner",
        "email": "paidpartner@example.com",
        "phone": "9876543213",
        "upiId": "paidpartner@upi"
      },
      "completedDeliveries": 12,
      "totalSalary": 360,
      "paidAmount": 360,
      "paymentDate": "2025-01-20T14:30:00.000Z",
      "paymentMethod": "UPI",
      "adminNotes": "Payment transferred via UPI"
    }
  ]
}
```

---

### **3. Get Total Salary by Delivery Partner ID**

#### **GET** `/api/payments/delivery/:deliveryPartnerId/salary`
Get total salary information for a specific delivery partner with payment history.

**Query Parameters:**
- `month` (optional): Month in YYYY-MM format to filter specific month
- `year` (optional): Year to filter specific month

**Response:**
```json
{
  "success": true,
  "deliveryPartnerId": "64f1234567890abcdef12351",
  "deliveryPartnerName": "Delivery Partner Name",
  "totalSalary": 1350
}
```

---

### **4. Mark Delivery Partner Payment as Paid**

#### **PUT** `/api/payments/delivery/:paymentId/mark-paid`
Admin marks delivery partner payment as paid after external transfer.

**Request Body:**
```json
{
  "paymentMethod": "UPI",
  "adminNotes": "Payment transferred via UPI on 20th Jan"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment marked as paid successfully",
  "payment": {
    "id": "64f1234567890abcdef12350",
    "totalSalary": 450,
    "paidAmount": 450,
    "paymentDate": "2025-01-20T14:30:00.000Z",
    "paymentMethod": "UPI",
    "adminNotes": "Payment transferred via UPI on 20th Jan"
  }
}
```

---

## 🔧 **UTILITY FUNCTIONS**

### **Generate Monthly Payment Records**

#### **POST** `/api/payments/generate-monthly`
Generate payment records for a specific month (can be called manually or by cron job).

**Query Parameters:**
- `month` (optional): Month in YYYY-MM format
- `year` (optional): Year

**Response:**
```json
{
  "success": true,
  "message": "Monthly payment records generated successfully",
  "month": "2025-01",
  "year": 2025
}
```

---

## 📊 **PAYMENT CALCULATIONS**

### **Tailor Platform Fees:**
- **Rate**: ₹50 per completed order
- **Calculation**: `Total Fee = Completed Orders × ₹50`
- **Due Date**: 7 days after month end
- **Platform UPI**: `tjsrinithi@okicici`

### **Delivery Partner Salaries:**
- **Rate**: ₹30 per completed delivery
- **Calculation**: `Total Salary = Completed Deliveries × ₹30`
- **Payment**: Manual by admin after external transfer
- **Individual UPI**: Each delivery partner has their own UPI ID

---

## 🔧 **Error Responses**

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Payment already confirmed for this month"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Tailor not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Error fetching payment details",
  "error": "Error details"
}
```

---

## 🚀 **Testing Examples**

### **1. Tailor Views Their Payment**
```
GET http://localhost:5000/api/payments/tailors/64f1234567890abcdef12346/my-payment?month=2025-01&year=2025
```

### **2. Tailor Views Payment History**
```
GET http://localhost:5000/api/payments/tailors/64f1234567890abcdef12346/payment-history?limit=6
```

### **3. Get Pending Tailor Payments (Admin)**
```
GET http://localhost:5000/api/payments/tailors/pending?month=2025-01&year=2025
```

### **4. Block Tailor Account (Admin)**
```
PUT http://localhost:5000/api/payments/tailors/64f1234567890abcdef12346/block
Content-Type: application/json

{
  "reason": "Platform fee not paid within due date"
}
```

### **5. Tailor Confirm Payment**
```
PUT http://localhost:5000/api/payments/tailors/64f1234567890abcdef12346/confirm-payment
Content-Type: application/json

{
  "paymentMethod": "UPI",
  "transactionId": "TXN123456789"
}
```

### **6. Get Pending Delivery Payments (Admin)**
```
GET http://localhost:5000/api/payments/delivery/pending?month=2025-01&year=2025
```

### **7. Get Total Salary by Delivery Partner ID**
```
GET http://localhost:5000/api/payments/delivery/64f1234567890abcdef12351/salary
```

**With specific month filter:**
```
GET http://localhost:5000/api/payments/delivery/64f1234567890abcdef12351/salary?month=2025-01&year=2025
```

### **8. Mark Delivery Payment as Paid (Admin)**
```
PUT http://localhost:5000/api/payments/delivery/64f1234567890abcdef12350/mark-paid
Content-Type: application/json

{
  "paymentMethod": "UPI",
  "adminNotes": "Payment transferred via UPI"
}
```

### **9. Generate Monthly Payments (Admin)**
```
POST http://localhost:5000/api/payments/generate-monthly?month=2025-01&year=2025
```

---

## 📝 **Notes**

1. **Monthly Records**: Payment records are generated per month
2. **Automatic Calculation**: Fees/salaries calculated based on completed orders/deliveries
3. **Due Dates**: Tailor fees due 7 days after month end
4. **Manual Payments**: Delivery partner payments marked manually by admin
5. **Account Blocking**: Admin can block tailors for non-payment
6. **Payment Methods**: UPI, Bank Transfer, etc. tracked for audit
7. **Tailor Self-Service**: Tailors can view their own payment details and history
8. **Real-time Calculation**: Payment amounts calculated on-demand if no record exists
9. **Platform UPI**: All tailor payments go to `tjsrinithi@okicici`
10. **Individual UPI**: Each delivery partner has their own UPI ID for payments

---

## 🔒 **Security Features**

- **Admin Only**: Most endpoints require admin privileges
- **Tailor Self-Service**: Tailors can view their own payments and confirm payments
- **Audit Trail**: All payment activities logged with timestamps
- **Validation**: Payment amounts and statuses validated
- **Duplicate Prevention**: One payment record per tailor/partner per month
- **Ownership Validation**: Tailors can only access their own payment data 