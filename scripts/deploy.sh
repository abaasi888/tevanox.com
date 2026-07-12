#!/bin/bash
set -e
DOMAIN="tevanox.com"
echo "🚀 Deploying TevanoxMovie on $DOMAIN"

# Check prerequisites
command -v docker >/dev/null 2>&1 || { echo "❌ Docker required"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose required"; exit 1; }

# Load environment
if [ -f .env ]; then source .env; else echo "❌ .env file not found"; exit 1; fi

# Setup SSL
echo "🔒 Setting up SSL certificates..."
for subdomain in "" "admin" "api" "agent" "storage"; do
    if [ -z "$subdomain" ]; then domain="$DOMAIN"; else domain="$subdomain.$DOMAIN"; fi
    if [ ! -f "/etc/nginx/ssl/$domain/fullchain.pem" ]; then
        echo "  🔐 Generating SSL for $domain..."
        docker run --rm -v ./nginx/ssl:/etc/letsencrypt certbot/certbot certonly \
            --webroot -w /var/www/certbot -d "$domain" \
            --email admin@$DOMAIN --agree-tos --non-interactive
    fi
done

# Deploy
echo "🏗️ Building and deploying..."
docker-compose -f infrastructure/docker-compose.yml build
docker-compose -f infrastructure/docker-compose.yml up -d

# Health check
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
