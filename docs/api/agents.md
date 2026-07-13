
### `tevanox.com/docs/api/agents.md`

```markdown
# 👔 Agents API

## Register Agent

### Endpoint

POST /agents/register



### Request Body
```json
{
  "username": "agent_smith",
  "email": "agent@example.com",
  "password": "secure_password",
  "full_name": "Agent Smith",
  "phone": "0777123456",
  "referral_code": "TVX-ABC123"
}
Response
json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "session_id": "session_123",
    "agent": {
      "id": "agent_123",
      "user_id": "user_456",
      "username": "agent_smith",
      "email": "agent@example.com",
      "full_name": "Agent Smith",
      "agent_code": "TVX-ABC123",
      "tier": 1,
      "is_active": true
    }
  },
  "message": "Agent registered successfully"
}
Get Agent Dashboard
Endpoint

GET /agents/dashboard
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "agent": {
      "id": "agent_123",
      "full_name": "Agent Smith",
      "agent_code": "TVX-ABC123",
      "tier": 1,
      "wallet_balance": 50000,
      "total_earnings": 150000
    },
    "stats": {
      "total_referrals": 10,
      "active_referrals": 5,
      "commission_rate": 15,
      "tier_progress": 50,
      "users_needed": 50
    },
    "recent_activity": [
      {
        "id": "act_123",
        "description": "New referral: John Doe",
        "type": "referral",
        "date": "2024-01-01T00:00:00Z"
      }
    ],
    "earnings": [
      {
        "month": "2024-01",
        "amount": 50000
      }
    ]
  }
}
Get Agent Referrals
Endpoint

GET /agents/referrals
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": [
    {
      "id": "user_123",
      "username": "john_doe",
      "email": "john@example.com",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Get Agent Earnings
Endpoint

GET /agents/earnings
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": [
    {
      "id": "earn_123",
      "month": "2024-01",
      "total_active_users": 5,
      "commission_amount": 15000,
      "bonus_amount": 0,
      "total_paid": 15000,
      "status": "paid",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Get Referral Link
Endpoint

GET /agents/referral/link
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "agent_code": "TVX-ABC123",
    "referral_link": "https://tevanox.com/register?ref=TVX-ABC123",
    "total_referrals": 10,
    "active_referrals": 5
  }
}
Get Referral Conversions
Endpoint

GET /agents/referral/conversions
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "total_conversions": 10,
    "active_conversions": 5,
    "conversions": [
      {
        "id": "user_123",
        "username": "john_doe",
        "email": "john@example.com",
        "is_active": true,
        "joined_date": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
Check Commission Eligibility
Endpoint

GET /agents/commission-eligibility
Headers
text
Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "eligible": true,
    "subscription": {
      "id": "sub_123",
      "plan": "monthly",
      "end_date": "2024-01-31T00:00:00Z",
      "days_remaining": 15
    }
  }
}