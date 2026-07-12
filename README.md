# 🎬 TevanoxMovie

**Movies, Series & Music - Unlimited Entertainment**

## Domain Structure

| App | URL |
|-----|-----|
| Web App | https://tevanox.com |
| Admin | https://admin.tevanox.com |
| API | https://api.tevanox.com |
| Agent | https://agent.tevanox.com |

## Quick Start

```bash
# 1. Start all services
cd infrastructure
docker-compose up -d

# 2. Run backend
cd ../apps/tevanoxmovie-backend
uvicorn app.main:app --reload

# 3. Run web app
cd ../tevanoxmovie-web
npm install && npm run dev

# 4. Deploy
./scripts/deploy.sh
