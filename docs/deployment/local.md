
### `tevanox.com/docs/deployment/local.md`

```markdown
# 💻 Local Development Setup

## Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- MongoDB (local or Atlas)
- Git

## Step 1: Clone Repository

```bash
git clone https://github.com/tevanox/tevanoxmovie.git
cd tevanoxmovie

Step 2: Backend Setup
bash
cd apps/tevanoxmovie-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Edit .env with your settings
# MONGO_URI=mongodb://localhost:27017
# SECRET_KEY=your_secret_key

# Run the backend
uvicorn app.main:app --reload
Step 3: Web App Setup
bash
cd apps/tevanoxmovie-web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:8000/api/v1

# Run the web app
npm run dev
Step 4: Admin Dashboard Setup
bash
cd apps/tevanoxmovie-admin

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:8000/api/v1

# Run the admin dashboard
npm run dev
Step 5: Mobile App Setup
bash
cd apps/tevanoxmovie-mobile

# Install dependencies
npm install

# iOS only
cd ios && pod install

# Run the app
npm run android  # or npm run ios
Step 6: Sales Agent App Setup
bash
cd apps/tevanoxmovie-sales-agent

# Install dependencies
npm install

# iOS only
cd ios && pod install

# Run the app
npm run android  # or npm run ios
Step 7: Storage Setup (MinIO)
bash
# Start MinIO using Docker
docker run -d \
  --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -v ~/minio-data:/data \
  minio/minio \
  server /data --console-address ":9001"

# Access MinIO Console
# http://localhost:9001
# Username: minioadmin
# Password: minioadmin

# Create bucket: tevanoxmovie
# Generate access keys
Step 8: Start All Services

bash
cd infrastructure
docker-compose up -d
Access URLs
Service	URL
Web App	http://localhost:3000
Admin Dashboard	http://localhost:3001
API	http://localhost:8000
API Docs	http://localhost:8000/api/docs
MinIO Console	http://localhost:9001
Troubleshooting
Port Conflicts
If ports are already in use, change them in vite.config.js or .env files.

MongoDB Connection
Make sure MongoDB is running and the connection string is correct.

Node Modules
If you get errors, try:

bash
rm -rf node_modules package-lock.json
npm install
Python Dependencies
If you get Python errors, try:

bash
pip install --upgrade pip
pip install -r requirements.txt