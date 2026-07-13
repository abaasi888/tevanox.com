
### `tevanox.com/docs/api/subscriptions.md`

```markdown
# 💳 Subscriptions API

## Get Subscription Plans

### Endpoint

GET /subscriptions/plans


### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "weekly",
      "name": "Weekly",
      "price": 7000,
      "duration": 7,
      "features": [
        "Unlimited Movies",
        "Unlimited Music",
        "Download for Offline"
      ]
    },
    {
      "id": "biweekly",
      "name": "Bi-Weekly",
      "price": 12000,
      "duration": 14,
      "features": [
        "Unlimited Movies",
        "Unlimited Music",
        "Download for Offline",
        "Ad-free"
      ]
    },
    {
      "id": "monthly",
      "name": "Monthly",
      "price": 20000,
      "duration": 30,
      "features": [
        "Unlimited Movies",
        "Unlimited Music",
        "Download for Offline",
        "Ad-free",
        "Exclusive Content"
      ],
      "popular": true
    }
  ]
}
Activate Subscription
Endpoint

POST /subscriptions/activate
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "plan": "monthly",
  "payment_method": "mobile_money",
  "transaction_id": "txn_123"
}
Response
json
{
  "success": true,
  "data": {
    "subscription_id": "sub_123",
    "plan": "monthly",
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-01-31T00:00:00Z"
  },
  "message": "Subscription activated successfully"
}
Get Subscription Status
Endpoint

GET /subscriptions/status
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "is_active": true,
    "plan": "monthly",
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-01-31T00:00:00Z",
    "days_remaining": 15,
    "amount": 20000
  }
}
Cancel Subscription
Endpoint

POST /subscriptions/cancel
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Subscription cancelled successfully"
}
Get Subscription History
Endpoint

GET /subscriptions/history
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
      "id": "sub_123",
      "plan": "monthly",
      "amount": 20000,
      "start_date": "2024-01-01T00:00:00Z",
      "end_date": "2024-01-31T00:00:00Z",
      "is_active": true,
      "payment_method": "mobile_money",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}