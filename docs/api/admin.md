
### `tevanox.com/docs/api/admin.md`

```markdown
# 🖥️ Admin API

## Get Dashboard Stats

### Endpoint

GET /admin/dashboard

text

### Headers
Authorization: Bearer <your_token>



### Response
```json
{
  "success": true,
  "data": {
    "total_users": 1000,
    "active_users": 500,
    "total_movies": 200,
    "total_agents": 50,
    "active_agents": 30
  }
}
Get All Users
Endpoint

GET /admin/users
Headers

Authorization: Bearer <your_token>
Query Parameters
Parameter	Type	Description
page	integer	Page number (default: 1)
limit	integer	Items per page (default: 20)
search	string	Search by username/email
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
      "is_admin": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 20
}
Get All Agents
Endpoint
text
GET /admin/agents
Headers
text
Authorization: Bearer <your_token>
Query Parameters
Parameter	Type	Description
page	integer	Page number (default: 1)
limit	integer	Items per page (default: 20)
search	string	Search by name/email/code
Response
json
{
  "success": true,
  "data": [
    {
      "id": "agent_123",
      "username": "agent_smith",
      "email": "agent@example.com",
      "full_name": "Agent Smith",
      "agent_code": "TVX-ABC123",
      "tier": 1,
      "wallet_balance": 50000,
      "total_earnings": 150000,
      "is_active": true,
      "joined_date": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
Add Movie (Admin)
Endpoint
text
POST /admin/movies
Headers

Authorization: Bearer <your_token>
Content-Type: multipart/form-data
Request Body (Form Data)
Field	Type	Description
title	string	Movie title
description	string	Movie description
category_id	string	Category ID
vj_id	string	VJ ID (optional)
genre_ids	string[]	Genre IDs
release_year	integer	Release year
duration	integer	Duration in minutes
language	string	Language
country	string	Country code
director	string	Director name
cast	string[]	Cast members
file	file	Video file
poster	file	Poster image
Response
json
{
  "success": true,
  "message": "Movie added successfully",
  "data": {
    "movie_id": "movie_123"
  }
}
Get All Categories
Endpoint

GET /categories
Headers

Authorization: Bearer <your_token>
Query Parameters
Parameter	Type	Description
type	string	Filter by type (movie, series, music)
parent_id	string	Filter by parent category
Response
json
{
  "success": true,
  "data": [
    {
      "id": "cat_001",
      "name": "English Movies",
      "slug": "english-movies",
      "type": "movie",
      "parent_id": null,
      "icon": "🌍",
      "color": "#2196F3",
      "is_active": true,
      "subcategories": [],
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Get All Genres
Endpoint

GET /genres
Headers
text
Authorization: Bearer <your_token>
Query Parameters
Parameter	Type	Description
type	string	Filter by type (movie, series, music)
Response
json
{
  "success": true,
  "data": [
    {
      "id": "gen_action",
      "name": "Action",
      "slug": "action",
      "type": "movie",
      "icon": "⚔️",
      "color": "#FF4757",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Create Category (Admin)
Endpoint

POST /categories
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "name": "Korean Movies",
  "slug": "korean-movies",
  "type": "movie",
  "icon": "🇰🇷",
  "color": "#FF9800",
  "description": "Korean language movies",
  "display_order": 5
}
Response
json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": "cat_123",
    "name": "Korean Movies",
    "slug": "korean-movies"
  }
}
Create Genre (Admin)
Endpoint

POST /genres
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "name": "Korean Drama",
  "slug": "korean-drama",
  "type": "movie",
  "icon": "🇰🇷",
  "color": "#9C27B0",
  "description": "Korean drama movies",
  "display_order": 10
}
Response
json
{
  "success": true,
  "message": "Genre created successfully",
  "data": {
    "id": "gen_kdrama",
    "name": "Korean Drama"
  }
}
Create VJ (Admin)
Endpoint
text
POST /vjs
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "name": "VJ Junior",
  "code": "VJ_JUNIOR",
  "language": "luganda",
  "description": "VJ Junior translates action and comedy movies"
}
Response
json
{
  "success": true,
  "message": "VJ created successfully",
  "data": {
    "id": "vj_123",
    "name": "VJ Junior",
    "code": "VJ_JUNIOR"
  }
}
Create Musician (Admin)
Endpoint

POST /musicians
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "name": "Bobi Wine",
  "real_name": "Robert Kyagulanyi",
  "country": "UG",
  "genre_ids": ["gen_afrobeat"],
  "description": "Ugandan musician and politician"
}
Response
json
{
  "success": true,
  "message": "Musician created successfully",
  "data": {
    "id": "musician_123",
    "name": "Bobi Wine"
  }
}