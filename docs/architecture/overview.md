
### `tevanox.com/docs/architecture/overview.md`

```markdown
# 📋 System Overview

## Core Concepts

### Content Types
1. **Movies** - Full-length films with posters and metadata
2. **Series** - TV shows with multiple seasons and episodes
3. **Music** - Songs with audio and optional music videos

### User Types
1. **Users** - Regular users who watch content
2. **Agents** - Sales agents who refer users and earn commissions
3. **Admins** - Platform administrators who manage content

### Revenue Model
1. **Subscriptions** - Weekly, bi-weekly, and monthly plans
2. **Commissions** - Agents earn 40% of subscription revenue (network split)
3. **Platform Revenue** - Tevanox keeps 60% of subscription revenue

## Key Features

### For Users
- Browse and search content
- Watch movies and series
- Listen to music
- Download content for offline viewing
- Rate and review content
- Manage favorites and watch history

### For Agents
- Unique referral code
- Track referrals and earnings
- Share referral links
- View commission breakdowns
- Withdraw earnings

### For Admins
- Manage all content (movies, series, music)
- Manage categories, genres, VJs, musicians
- Manage users and agents
- View platform analytics
- Process payouts

## System Components

### Backend API
- RESTful API built with FastAPI
- MongoDB for data storage
- MinIO for file storage
- Redis for caching

### Frontend Applications
- Web App: React.js with Material-UI
- Admin Dashboard: React.js with Material-UI
- Mobile App: React Native
- Sales Agent App: React Native

## Deployment

The system is deployed using Docker containers orchestrated with Docker Compose:

infrastructure/
├── docker-compose.yml
├── nginx/
│ ├── nginx.conf
│ └── ssl/
└── docker/
├── backend.Dockerfile
├── web.Dockerfile
├── admin.Dockerfile
└── mobile.Dockerfile


