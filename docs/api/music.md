
### `tevanox.com/docs/api/music.md`

```markdown
# 🎵 Music API

## Get All Music

### Endpoint

GET /music


### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| genre | string | Filter by genre |
| search | string | Search by title/artist |
| page | integer | Page number (default: 1) |
| limit | integer | Items per page (default: 20) |

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "music_123",
      "title": "Bohemian Rhapsody",
      "artist": "Queen",
      "album": "A Night at the Opera",
      "genre": ["rock"],
      "release_year": 1975,
      "duration": 354,
      "cover_art": "https://storage.tevanox.com/covers/music_123.jpg",
      "category": "international",
      "total_plays": 1000,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
Get Trending Music
Endpoint

GET /music/trending
Query Parameters
Parameter	Type	Description
limit	integer	Number of songs (default: 10)
Response
json
{
  "success": true,
  "data": [
    {
      "id": "music_123",
      "title": "Bohemian Rhapsody",
      "artist": "Queen",
      "cover_art": "https://storage.tevanox.com/covers/music_123.jpg",
      "total_plays": 1000
    }
  ]
}
Get Music by ID
Endpoint
text
GET /music/{music_id}
Headers
text
Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "id": "music_123",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "musician_id": "musician_456",
    "musician_name": "Queen",
    "category_id": "cat_001",
    "category_name": "International Music",
    "genre_ids": ["gen_rock"],
    "genre_names": ["Rock"],
    "album": "A Night at the Opera",
    "release_year": 1975,
    "duration": 354,
    "language": "English",
    "country": "UK",
    "cover_art": "https://storage.tevanox.com/covers/music_123.jpg",
    "audio_url": "https://storage.tevanox.com/music/music_123.mp3",
    "video_url": "https://storage.tevanox.com/music/music_123.mp4",
    "lyrics": "Is this the real life? Is this just fantasy?...",
    "producer": "Roy Thomas Baker",
    "record_label": "EMI",
    "total_plays": 1000,
    "total_downloads": 200,
    "is_active": true,
    "is_featured": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
Search Music
Endpoint
text
GET /music/search
Query Parameters
Parameter	Type	Description
q	string	Search query
page	integer	Page number (default: 1)
limit	integer	Items per page (default: 20)
Response
json
{
  "success": true,
  "data": [
    {
      "id": "music_123",
      "title": "Bohemian Rhapsody",
      "artist": "Queen",
      "cover_art": "https://storage.tevanox.com/covers/music_123.jpg"
    }
  ]
}
Get Music by Category
Endpoint

GET /music/category/{category}
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
      "id": "music_123",
      "title": "Bohemian Rhapsody",
      "artist": "Queen",
      "cover_art": "https://storage.tevanox.com/covers/music_123.jpg"
    }
  ]
}