
### `tevanox.com/docs/api/series.md`

```markdown
# 📺 Series API

## Get All Series

### Endpoint

GET /series



### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| genre | string | Filter by genre |
| search | string | Search by title/description |
| page | integer | Page number (default: 1) |
| limit | integer | Items per page (default: 20) |

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "series_123",
      "title": "Game of Thrones",
      "description": "Seven noble families fight for control of the Iron Throne...",
      "category": "english",
      "genre": ["fantasy", "drama"],
      "release_year": 2011,
      "seasons": 8,
      "episodes_count": 73,
      "poster_url": "https://storage.tevanox.com/posters/series_123.jpg",
      "average_rating": 4.5,
      "total_views": 5000,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
Get Trending Series
Endpoint

GET /series/trending
Query Parameters
Parameter	Type	Description
limit	integer	Number of series (default: 10)
Response
json
{
  "success": true,
  "data": [
    {
      "id": "series_123",
      "title": "Game of Thrones",
      "poster_url": "https://storage.tevanox.com/posters/series_123.jpg",
      "seasons": 8,
      "episodes_count": 73,
      "average_rating": 4.5,
      "total_views": 5000
    }
  ]
}
Get Series by ID
Endpoint

GET /series/{series_id}
Headers
text
Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "id": "series_123",
    "title": "Game of Thrones",
    "original_title": "Game of Thrones",
    "description": "Seven noble families fight for control of the Iron Throne...",
    "category_id": "cat_001",
    "category_name": "English Series",
    "vj_id": null,
    "vj_name": null,
    "genre_ids": ["gen_fantasy", "gen_drama"],
    "genre_names": ["Fantasy", "Drama"],
    "release_year": 2011,
    "seasons": 8,
    "episodes_count": 73,
    "language": "English",
    "country": "US",
    "poster_url": "https://storage.tevanox.com/posters/series_123.jpg",
    "cover_url": "https://storage.tevanox.com/covers/series_123.jpg",
    "director": "David Benioff",
    "cast": ["Peter Dinklage", "Lena Headey", "Emilia Clarke"],
    "total_views": 5000,
    "average_rating": 4.5,
    "is_active": true,
    "is_featured": true,
    "episodes_list": [
      {
        "id": "ep_001",
        "title": "Winter is Coming",
        "episode_number": 1,
        "season": 1,
        "duration": 62,
        "thumbnail_url": "https://storage.tevanox.com/thumbnails/ep_001.jpg",
        "video_url": "https://storage.tevanox.com/series/season_1/ep_001.mp4",
        "description": "Ned Stark learns of the king's visit...",
        "release_date": "2011-04-17T00:00:00Z",
        "total_views": 1000
      }
    ],
    "created_at": "2024-01-01T00:00:00Z"
  }
}
Get Episodes
Endpoint

GET /series/{series_id}/episodes
Query Parameters
Parameter	Type	Description
season	integer	Filter by season
Response
json
{
  "success": true,
  "data": [
    {
      "id": "ep_001",
      "title": "Winter is Coming",
      "episode_number": 1,
      "season": 1,
      "duration": 62,
      "thumbnail_url": "https://storage.tevanox.com/thumbnails/ep_001.jpg",
      "video_url": "https://storage.tevanox.com/series/season_1/ep_001.mp4",
      "description": "Ned Stark learns of the king's visit...",
      "release_date": "2011-04-17T00:00:00Z",
      "total_views": 1000
    }
  ]
}
Get Episode by ID
Endpoint

GET /series/{series_id}/episodes/{episode_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "id": "ep_001",
    "title": "Winter is Coming",
    "episode_number": 1,
    "season": 1,
    "duration": 62,
    "thumbnail_url": "https://storage.tevanox.com/thumbnails/ep_001.jpg",
    "video_url": "https://storage.tevanox.com/series/season_1/ep_001.mp4",
    "description": "Ned Stark learns of the king's visit...",
    "release_date": "2011-04-17T00:00:00Z",
    "total_views": 1000
  }
}