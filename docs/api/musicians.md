
### `tevanox.com/docs/api/musicians.md`

```markdown
# 🎵 Musicians API

## Get All Musicians

### Endpoint

GET /musicians



### Headers
Authorization: Bearer <your_token>



### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| country | string | Filter by country |
| is_active | boolean | Filter by active status |

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "musician_123",
      "name": "Bobi Wine",
      "real_name": "Robert Kyagulanyi",
      "country": "UG",
      "genre_ids": ["gen_afrobeat"],
      "description": "Ugandan musician and politician",
      "is_active": true,
      "is_deletable": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Create Musician
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
  "data": {
    "id": "musician_123",
    "name": "Bobi Wine"
  },
  "message": "Musician created successfully"
}
Update Musician
Endpoint

PUT /musicians/{musician_id}
Headers

Authorization: Bearer <your_token>
Request Body
json
{
  "description": "Ugandan musician, politician, and philanthropist",
  "country": "UG"
}
Response
json
{
  "success": true,
  "message": "Musician updated successfully"
}
Delete Musician
Endpoint

DELETE /musicians/{musician_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Musician deleted successfully"
}