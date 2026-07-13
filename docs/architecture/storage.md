
### `tevanox.com/docs/architecture/storage.md`

```markdown
# 💾 Storage Architecture

## Overview

TevanoxMovie uses MinIO (self-hosted on your PC) for all file storage. The storage is organized in a logical structure for easy management and retrieval.

## Storage Structure

D:\Movies\ # Root storage on your PC
│
├── movies\ # Movie files
│ ├── Ugandan\ # 🇺🇬 Ugandan Movies
│ │ ├── Action
│ │ ├── Comedy
│ │ └── Drama
│ ├── English\ # 🌍 English Movies
│ │ ├── Action
│ │ ├── Sci-Fi
│ │ ├── Korean
│ │ ├── Chinese
│ │ └── Cartoon
│ ├── Luganda_Translated\ # 🗣️ Luganda Translated
│ │ ├── VJ_Junior
│ │ ├── VJ_Jingo
│ │ └── VJ_Mukasa
│ └── Swahili_Translated\ # 🗣️ Swahili Translated
│ ├── VJ_Mohamed
│ └── VJ_Fatuma
│
├── series\ # TV Series
│ ├── Ugandan
│ ├── English
│ └── Luganda_Translated
│
├── music\ # Music files
│ ├── Ugandan
│ │ ├── Bobi_Wine
│ │ ├── Jose_Chameleone
│ │ └── Sheebah
│ ├── International
│ │ ├── Burna_Boy
│ │ └── Wizkid
│ ├── Gospel
│ │ ├── Judith_Babirye
│ │ └── Levixone
│ └── Country
│ ├── Dolly_Parton
│ └── Johnny_Cash
│
├── posters\ # Movie/Series Posters
│ ├── movie_123.jpg
│ └── series_123.jpg
│
├── covers\ # Music Covers
│ └── music_123.jpg
│
└── thumbnails\ # Episode Thumbnails
└── ep_001.jpg


## Storage Service

The `StorageService` class handles all file operations:

```python
class StorageService:
    def upload_file(file_data, file_path, content_type):
        """Upload a file to storage"""
        pass

    def upload_movie(file_data, movie_id, category, vj_name, genre, filename):
        """Upload a movie to organized storage"""
        pass

    def upload_series_episode(file_data, series_id, season, episode):
        """Upload a series episode to organized storage"""
        pass

    def upload_music(file_data, music_id, category, musician_name, genre):
        """Upload music to organized storage"""
        pass

    def generate_streaming_url(file_path, expires_in=3600):
        """Generate a presigned URL for streaming"""
        pass

    def delete_file(file_path):
        """Delete a file from storage"""
        pass

File Naming Convention
Content Type	Naming Convention	    Example
Movie	{movie_id}.mp4	               movie_123.mp4
Episode	s{season}e{episode}.mp4	s01e01.mp4
Music	{music_id}.mp3	music_123.mp3
Poster	{movie_id}_poster.jpg	movie_123_poster.jpg
Cover	{music_id}_cover.jpg	music_123_cover.jpg
Thumbnail	{episode_id}_thumb.jpg	ep_001_thumb.jpg

URL Structure
Content Type	URL Pattern
Movie	https://storage.tevanox.com/movies/{category}/{subcategory}/{movie_id}.mp4
Episode	https://storage.tevanox.com/series/{series_id}/Season_{season}/s{season}e{episode}.mp4
Music	https://storage.tevanox.com/music/{category}/{musician}/{music_id}.mp3
Poster	https://storage.tevanox.com/posters/{movie_id}_poster.jpg
Cover	https://storage.tevanox.com/covers/{music_id}_cover.jpg
Thumbnail	https://storage.tevanox.com/thumbnails/{episode_id}_thumb.jpg
Storage Configuration
Environment Variables
env
STORAGE_ENDPOINT=https://storage.tevanox.com
STORAGE_ACCESS_KEY=your_minio_access_key
STORAGE_SECRET_KEY=your_minio_secret_key
STORAGE_BUCKET=tevanoxmovie
MinIO Setup
bash
# Start MinIO on your PC
docker run -d \
  --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -v /mnt/data:/data \
  minio/minio \
  server /data --console-address ":9001"
Backup Strategy
Daily Backups: Automated backup of metadata to MongoDB Atlas

Weekly Backups: Full backup of all files to external drive

Off-site Backup: Monthly backup to cloud storage (optional)

Monitoring
Storage usage monitoring

File access logs

Error tracking

Performance metrics