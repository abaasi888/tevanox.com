
### `tevanox.com/docs/api/payments.md`

```markdown
# 💰 Payments API

## Get Payment Methods

### Endpoint

GET /payments/methods



### Response
```json
{
  "success": true,
  "data": {
    "methods": [
      {
        "id": "mobile_money",
        "name": "Mobile Money",
        "icon": "phone-android",
        "providers": [
          { "id": "mtn", "name": "MTN Mobile Money", "color": "#FFD700" },
          { "id": "airtel", "name": "Airtel Money", "color": "#FF0000" },
          { "id": "africell", "name": "Africell Money", "color": "#00FF00" }
        ]
      },
      {
        "id": "visa",
        "name": "Visa / Credit Card",
        "icon": "credit-card",
        "providers": [
          { "id": "visa", "name": "Visa" },
          { "id": "mastercard", "name": "Mastercard" },
          { "id": "amex", "name": "American Express" }
        ]
      }
    ]
  }
}
Initialize Payment
Endpoint

POST /payments/initialize
Headers

Authorization: Bearer <your_token>
Request Body (Mobile Money)
json
{
  "amount": 20000,
  "plan": "monthly",
  "payment_method": "mobile_money",
  "phone_number": "0777123456",
  "provider": "mtn",
  "email": "john@example.com"
}
Request Body (Visa)
json
{
  "amount": 20000,
  "plan": "monthly",
  "payment_method": "visa",
  "email": "john@example.com"
}
Response
json
{
  "success": true,
  "data": {
    "reference": "TM-20240101-ABC123",
    "authorization_url": "https://paystack.com/pay/abc123",
    "access_code": "abc123"
  }
}
Verify Payment
Endpoint
text
GET /payments/verify/{reference}
Headers
text
Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "status": "success",
    "amount": 20000,
    "reference": "TM-20240101-ABC123"
  }
}
Get Payment History
Endpoint

GET /payments/history
Headers

Authorization: Bearer <your_token>
Query Parameters
Parameter	Type	Description
page	integer	Page number (default: 1)
limit	integer	Items per page (default: 20)
Response
json
{
  "success": true,
  "data": [
    {
      "id": "pay_123",
      "amount": 20000,
      "plan": "monthly",
      "status": "completed",
      "payment_method": "mobile_money",
      "reference": "TM-20240101-ABC123",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}