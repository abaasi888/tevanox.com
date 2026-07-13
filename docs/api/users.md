
### `tevanox.com/docs/api/users.md`

```markdown
# 👤 Users API

## Get Profile

### Endpoint

GET /users/profile


### Headers
Authorization: Bearer <your_token>



### Response
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "username": "john_doe",
    "email": "john@example.com",
    "is_active": true,
    "is_admin": false,
    "is_agent": false,
    "subscription_expiry": "2024-02-01T00:00:00Z",
    "subscription_plan": "monthly",
    "wallet_balance": 0,
    "total_earnings": 0,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
Update Profile
Endpoint

PUT /users/profile
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "username": "john_doe_updated",
  "email": "john_new@example.com",
  "profile_pic": "https://storage.tevanox.com/profiles/john.jpg"
}
Response
json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_123",
    "username": "john_doe_updated",
    "email": "john_new@example.com"
  }
}
Change Password
Endpoint
text
POST /users/change-password
Headers
text
Authorization: Bearer <your_token>
Request Body
json
{
  "current_password": "old_password",
  "new_password": "new_secure_password"
}
Response
json
{
  "success": true,
  "message": "Password changed successfully"
}
Get Watch History
Endpoint

GET /users/history
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
  "data": {
    "history": [
      {
        "id": "history_123",
        "content_id": "movie_456",
        "content_type": "movie",
        "title": "The Matrix",
        "progress": 45,
        "watched_at": "2024-01-01T01:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
Get Favorites
Endpoint

GET /users/favorites
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": [
    {
      "id": "fav_123",
      "content_id": "movie_456",
      "content_type": "movie",
      "title": "The Matrix",
      "added_at": "2024-01-01T01:00:00Z"
    }
  ]
}
Add Favorite
Endpoint

POST /users/favorites/{content_id}?content_type=movie
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Added to favorites"
}
Remove Favorite
Endpoint

DELETE /users/favorites/{content_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Removed from favorites"
}

