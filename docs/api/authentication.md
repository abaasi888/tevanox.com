
### `tevanox.com/docs/api/authentication.md`

```markdown
# 🔐 Authentication API

## Register User

### Endpoint

POST /auth/register


### Request Body
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}

Response

{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "session_id": "session_123",
    "user": {
      "id": "user_123",
      "username": "john_doe",
      "email": "john@example.com",
      "is_active": false,
      "is_admin": false
    }
  },
  "message": "User registered successfully"
}

Login User
Endpoint

POST /auth/login

Request Body

{
  "email": "john@example.com",
  "password": "secure_password",
  "device_type": "web",
  "device_name": "Chrome Browser"
}

Response
json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "session_id": "session_456",
    "user": {
      "id": "user_123",
      "username": "john_doe",
      "email": "john@example.com",
      "is_active": true,
      "is_admin": false,
      "device_type": "web",
      "device_name": "Chrome Browser"
    }
  },
  "message": "Login successful. Other devices have been logged out."
}
Logout User
Endpoint

POST /auth/logout
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Logged out successfully"
}
Logout All Devices
Endpoint

POST /auth/logout/all
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Logged out from all devices"
}
Get Active Sessions
Endpoint

GET /auth/sessions
Headers
text
Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session_456",
        "device_type": "web",
        "device_name": "Chrome Browser",
        "created_at": "2024-01-01T00:00:00Z",
        "last_activity": "2024-01-01T01:00:00Z",
        "is_current": true
      }
    ],
    "current_session_id": "session_456"
  }
}
Terminate Session
Endpoint

POST /auth/sessions/terminate/{session_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Session terminated successfully"
}
Refresh Token
Endpoint

POST /auth/refresh
Request Body
json
{
  "refresh_token": "refresh_token_here"
}
Response
json
{
  "success": true,
  "data": {
    "token": "new_access_token_here"
  }
}

