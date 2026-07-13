GET /genres



### Headers
Authorization: Bearer <your_token>



### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | Filter by type (movie, series, music) |
| is_active | boolean | Filter by active status |

### Response
```json
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
      "description": "Action movies with intense sequences",
      "display_order": 1,
      "is_active": true,
      "is_deletable": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Create Genre
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
  "data": {
    "id": "gen_kdrama",
    "name": "Korean Drama",
    "slug": "korean-drama"
  },
  "message": "Genre created successfully"
}
Update Genre
Endpoint

PUT /genres/{genre_id}
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "name": "Korean Drama (Updated)",
  "color": "#7B1FA2",
  "display_order": 8
}
Response
json
{
  "success": true,
  "message": "Genre updated successfully"
}
Delete Genre
Endpoint

DELETE /genres/{genre_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Genre deleted successfully"
}