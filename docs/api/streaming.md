
### `tevanox.com/docs/api/streaming.md`

```markdown
# 📡 Streaming API

## Get Movie Stream

### Endpoint

GET /streaming/movie/{movie_id}



### Headers
Authorization: Bearer <your_token>



### Response
```json
{
  "success": true,
  "data": {
    "id": "movie_123",
    "title": "The Matrix",
    "duration": 136,
    "streaming": {
      "hls": "https://storage.tevanox.com/hls_vod/movie_123.m3u8",
      "dash": "https://storage.tevanox.com/dash_vod/movie_123.mpd",
      "download": "https://storage.tevanox.com/movies/English/Action/movie_123.mp4"
    },
    "expires_in": 3600,
    "download_url": "https://storage.tevanox.com/presigned/movie_123?token=abc123"
  }
}
Get Series Episode Stream
Endpoint

GET /streaming/series/{series_id}/{episode_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "id": "ep_001",
    "title": "Winter is Coming",
    "series": "Game of Thrones",
    "season": 1,
    "episode": 1,
    "streaming": {
      "hls": "https://storage.tevanox.com/hls_vod/ep_001.m3u8",
      "dash": "https://storage.tevanox.com/dash_vod/ep_001.mpd",
      "download": "https://storage.tevanox.com/series/season_1/ep_001.mp4"
    },
    "expires_in": 3600
  }
}
Get Music Stream
Endpoint

GET /streaming/music/{music_id}
Headers

Authorization: Bearer <your_token>
Response
json
{
  "success": true,
  "data": {
    "id": "music_123",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "streaming_url": "https://storage.tevanox.com/presigned/music_123?token=abc123",
    "expires_in": 3600
  }
}
Get Download URL
Endpoint

GET /streaming/download/{content_id}?content_type={type}
Headers

Authorization: Bearer <your_token>
Query Parameters
Parameter	Type	Description
content_type	string	movie, series, music
Response
json
{
  "success": true,
  "data": {
    "download_url": "https://storage.tevanox.com/presigned/content_123?token=abc123",
    "filename": "The Matrix",
    "expires_in": 3600
  }
}