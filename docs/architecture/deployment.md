
### `tevanox.com/docs/architecture/deployment.md`

```markdown
# 🚀 Deployment Architecture

## Deployment Overview

TevanoxMovie is deployed using Docker containers orchestrated with Docker Compose.

## Infrastructure
┌─────────────────────────────────────────────────────────────┐
│ Production Environment │
├─────────────────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Nginx │ │
│ │ (Reverse Proxy + SSL) │ │
│ └─────────────────────────────────────────────────────┘ │
│ │ │
│ ┌──────────────────┼──────────────────┐ │
│ ▼ ▼ ▼ │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│ │ Web App │ │ Admin │ │ Backend │ │
│ │ (React) │ │ (React) │ │ (FastAPI) │ │
│ │ Port:3000│ │ Port:3001│ │ Port:8000│ │
│ └───────────┘ └───────────┘ └───────────┘ │
│ │ │ │ │
│ └────────────────┼────────────────┘ │
│ ▼ │
│ ┌─────────────────────┐ │
│ │ MongoDB Atlas │ │
│ │ (Database) │ │
│ └─────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────┐ │
│ │ MinIO (PC) │ │
│ │ (Storage) │ │
│ └─────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

text

## Docker Services

### Backend Service

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
Web App Service
dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
Admin Service
dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
Docker Compose
yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: tevanoxmovie-mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
      MONGO_INITDB_DATABASE: tevanoxmovie
    volumes:
      - mongodb_data:/data/db
    networks:
      - tevanox-network

  backend:
    build:
      context: ../apps/tevanoxmovie-backend
      dockerfile: Dockerfile
    container_name: tevanoxmovie-backend
    restart: always
    ports:
      - "8000:8000"
    environment:
      MONGO_URI: mongodb://admin:${MONGO_PASSWORD}@mongodb:27017
      SECRET_KEY: ${SECRET_KEY}
      DOMAIN: tevanox.com
    depends_on:
      - mongodb
    networks:
      - tevanox-network

  web:
    build:
      context: ../apps/tevanoxmovie-web
      dockerfile: Dockerfile
    container_name: tevanoxmovie-web
    restart: always
    ports:
      - "3000:3000"
    environment:
      VITE_API_URL: https://api.tevanox.com/api/v1
    depends_on:
      - backend
    networks:
      - tevanox-network

  admin:
    build:
      context: ../apps/tevanoxmovie-admin
      dockerfile: Dockerfile
    container_name: tevanoxmovie-admin
    restart: always
    ports:
      - "3001:3001"
    environment:
      VITE_API_URL: https://api.tevanox.com/api/v1
    depends_on:
      - backend
    networks:
      - tevanox-network

  nginx:
    image: nginx:alpine
    container_name: tevanoxmovie-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - certbot_data:/var/www/certbot
    depends_on:
      - web
      - admin
      - backend
    networks:
      - tevanox-network

  certbot:
    image: certbot/certbot:latest
    container_name: tevanoxmovie-certbot
    volumes:
      - ./nginx/ssl:/etc/letsencrypt
      - certbot_data:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $$!; done;'"

networks:
  tevanox-network:
    driver: bridge

volumes:
  mongodb_data:
  certbot_data:
Deployment Steps
Set up environment variables

Build Docker images

Start services

Configure SSL certificates

Verify deployment

Deployment Script
bash
#!/bin/bash
# deploy.sh

set -e

DOMAIN="tevanox.com"

echo "🚀 Deploying TevanoxMovie..."

# Setup SSL
echo "🔒 Setting up SSL certificates..."
for subdomain in "" "admin" "api" "agent"; do
    if [ -z "$subdomain" ]; then
        domain="$DOMAIN"
    else
        domain="$subdomain.$DOMAIN"
    fi
    if [ ! -f "/etc/nginx/ssl/$domain/fullchain.pem" ]; then
        docker run --rm -v ./nginx/ssl:/etc/letsencrypt certbot/certbot certonly \
            --webroot -w /var/www/certbot -d "$domain" \
            --email admin@$DOMAIN --agree-tos --non-interactive
    fi
done

# Build and deploy
echo "🏗️ Building Docker images..."
docker-compose -f infrastructure/docker-compose.yml build

echo "🔄 Starting services..."
docker-compose -f infrastructure/docker-compose.yml up -d

# Health check
echo "⏳ Waiting for services to be healthy..."
sleep 15

if curl -f -s -o /dev/null https://api.$DOMAIN/health; then
    echo -e "✅ Deployment successful!"
    echo "🌐 Web: https://$DOMAIN"
    echo "🖥️ Admin: https://admin.$DOMAIN"
    echo "⚙️ API: https://api.$DOMAIN"
else
    echo "❌ Health check failed!"
    exit 1
fi
Rollback Procedure
Stop current services

Restore previous Docker images

Start services

Verify functionality

bash
#!/bin/bash
# rollback.sh

echo "⏪ Rolling back to previous version..."
docker-compose -f infrastructure/docker-compose.yml down
docker-compose -f infrastructure/docker-compose.yml up -d
echo "✅ Rollback complete"
text

---

## 📄 **DEPLOYMENT DOCS FILES**

### `tevanox.com/docs/deployment/README.md`

```markdown
# 🚀 Deployment Guide

## Overview

This guide covers the deployment of TevanoxMovie in various environments.

## Deployment Options

| Environment | Purpose | URL |
|-------------|---------|-----|
| Local | Development | http://localhost |
| Staging | Testing | https://staging.tevanox.com |
| Production | Live | https://tevanox.com |

## Quick Start

### Local Development

```bash
# Start all services
cd infrastructure
docker-compose up -d

# Run backend
cd ../apps/tevanoxmovie-backend
uvicorn app.main:app --reload

# Run web app
cd ../tevanoxmovie-web
npm run dev

# Run admin
cd ../tevanoxmovie-admin
npm run dev
Production Deployment
bash
# Deploy all services
./scripts/deploy.sh

# Check status
./scripts/healthcheck.sh

# View logs
docker-compose logs -f
Pre-requisites
Docker & Docker Compose

Node.js 18+

Python 3.11+

MongoDB Atlas account

Domain (tevanox.com)

SSL certificates

Environment Variables
Create a .env file with the following variables:

env
MONGO_URI=mongodb://localhost:27017
MONGO_PASSWORD=your_password
SECRET_KEY=your_secret_key
PAYSTACK_SECRET_KEY=your_paystack_key
STORAGE_ENDPOINT=https://storage.tevanox.com
STORAGE_ACCESS_KEY=your_minio_key
STORAGE_SECRET_KEY=your_minio_secret