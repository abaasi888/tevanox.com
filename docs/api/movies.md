
### `tevanox.com/docs/api/movies.md`

```markdown
# 🎬 Movies API

## Get All Movies

### Endpoint


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
      "id": "movie_123",
      "title": "The Matrix",
      "description": "A computer hacker learns about the true nature of reality...",
      "category": "english",
      "genre": ["action", "sci_fi"],
      "release_year": 1999,
      "duration": 136,
      "poster_url": "https://storage.tevanox.com/posters/movie_123.jpg",
      "average_rating": 4.8,
      "total_views": 1000,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}

Get Trending Movies
Endpoint

GET /movies/trending
Query Parameters
Parameter	Type	Description
limit	integer	Number of movies (default: 10)
Response
json
{
  "success": true,
  "data": [
    {
      "id": "movie_123",
      "title": "The Matrix",
      "description": "A computer hacker learns about the true nature of reality...",
      "category": "english",
      "genre": ["action", "sci_fi"],
      "release_year": 1999,
      "duration": 136,
      "poster_url": "https://storage.tevanox.com/posters/movie_123.jpg",
      "average_rating": 4.8,
      "total_views": 1000,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
Get Latest Movies
Endpoint

GET /movies/latest
Query Parameters
Parameter	Type	Description
limit	integer	Number of movies (default: 10)
Response
json
{
  "success": true,
  "data": [
    {
      "id": "movie_456",
      "title": "New Release",
      "description": "A brand new movie...",
      "category": "english",
      "genre": ["action"],
      "release_year": 2024,
      "duration": 120,
      "poster_url": "https://storage.tevanox.com/posters/movie_456.jpg",
      "created_at": "2024-01-15T00:00:00Z"
    }
  ]
}
Get Movie by ID
Endpoint

GET /movies/{movie_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "id": "movie_123",
    "title": "The Matrix",
    "original_title": "The Matrix",
    "description": "A computer hacker learns about the true nature of reality...",
    "category_id": "cat_001",
    "category_name": "English Movies",
    "vj_id": null,
    "vj_name": null,
    "genre_ids": ["gen_action", "gen_sci_fi"],
    "genre_names": ["Action", "Sci-Fi"],
    "release_year": 1999,
    "duration": 136,
    "language": "English",
    "country": "US",
    "poster_url": "https://storage.tevanox.com/posters/movie_123.jpg",
    "cover_url": "https://storage.tevanox.com/covers/movie_123.jpg",
    "file_path": "movies/English/Action/movie_123.mp4",
    "trailer_url": "https://storage.tevanox.com/trailers/movie_123.mp4",
    "director": "Lana Wachowski",
    "cast": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    "total_views": 1000,
    "total_downloads": 200,
    "average_rating": 4.8,
    "is_active": true,
    "is_featured": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
Rate Movie
Endpoint

POST /movies/{movie_id}/rate
Headers
text
Authorization: Bearer <your_token>
Request Body
json
{
  "rating": 5
}
Response
json
{
  "success": true,
  "message": "Rating submitted successfully"
}
Track View
Endpoint

POST /movies/{movie_id}/view
Headers
text
Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "message": "View tracked"
}
Search Movies
Endpoint

GET /movies/search
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
      "id": "movie_123",
      "title": "The Matrix",
      "poster_url": "https://storage.tevanox.com/posters/movie_123.jpg",
      "release_year": 1999
    }
  ]
}
Get Movies by Category
Endpoint

GET /movies/category/{category}
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
      "id": "movie_123",
      "title": "The Matrix",
      "poster_url": "https://storage.tevanox.com/posters/movie_123.jpg",
      "release_year": 1999
    }
  ]
}
