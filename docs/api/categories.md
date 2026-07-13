
### `tevanox.com/docs/api/categories.md`

```markdown
# 📂 Categories API

## Get All Categories

### Endpoint

GET /categories



### Headers
Authorization: Bearer <your_token>



### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | Filter by type (movie, series, music) |
| parent_id | string | Filter by parent category |
| is_active | boolean | Filter by active status |

### Response
```json
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
      "description": "International English language films",
      "is_active": true,
      "display_order": 1,
      "is_deletable": true,
      "subcategories": [
        {
          "id": "cat_002",
          "name": "Action",
          "slug": "action",
          "icon": "⚔️",
          "color": "#FF4757",
          "is_active": true
        }
      ],
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Create Category
Endpoint
text
POST /categories
Headers
text
Authorization: Bearer <your_token>
Request Body
json
{
  "name": "Korean Movies",
  "slug": "korean-movies",
  "type": "movie",
  "parent_id": null,
  "icon": "🇰🇷",
  "color": "#FF9800",
  "description": "Korean language movies",
  "display_order": 5
}
Response
json
{
  "success": true,
  "data": {
    "id": "cat_123",
    "name": "Korean Movies",
    "slug": "korean-movies",
    "type": "movie"
  },
  "message": "Category created successfully"
}
Update Category
Endpoint

PUT /categories/{category_id}
Headers
text
Authorization: Bearer <your_token>
Request Body
json
{
  "name": "Korean Movies (Updated)",
  "color": "#FF5722",
  "display_order": 3
}
Response
json
{
  "success": true,
  "message": "Category updated successfully"
}
Delete Category
Endpoint

DELETE /categories/{category_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "Category deleted successfully"
}