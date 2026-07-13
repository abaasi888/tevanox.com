#!/bin/bash
# ============================================================================ #
#                    TEVANOXMOVIE DEPLOYMENT SCRIPT                           #
# ============================================================================ #

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN=${1:-tevanox.com}
ENV=${2:-production}

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                              ║${NC}"
echo -e "${BLUE}║     🚀 TEVANOXMOVIE DEPLOYMENT SCRIPT                       ║${NC}"
echo -e "${BLUE}║                                                              ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}📋 Deployment Configuration:${NC}"
echo "  Domain: $DOMAIN"
echo "  Environment: $ENV"
echo ""

# Check prerequisites
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

command -v docker >/dev/null 2>&1 || { echo -e "${RED}❌ Docker is required but not installed.${NC}"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo -e "${RED}❌ Docker Compose is required but not installed.${NC}"; exit 1; }
command -v curl >/dev/null 2>&1 || { echo -e "${RED}❌ curl is required but not installed.${NC}"; exit 1; }

echo -e "${GREEN}✅ All prerequisites satisfied${NC}"
echo ""

# Load environment variables
if [ -f .env ]; then
    echo -e "${YELLOW}📄 Loading environment variables...${NC}"
    source .env
else
    echo -e "${RED}❌ .env file not found!${NC}"
    exit 1
fi

# Setup SSL certificates
echo -e "${YELLOW}🔒 Setting up SSL certificates...${NC}"

for subdomain in "" "admin" "api" "agent" "storage"; do
    if [ -z "$subdomain" ]; then
        domain="$DOMAIN"
    else
        domain="$subdomain.$DOMAIN"
    fi
    if [ ! -f "./nginx/ssl/$domain/fullchain.pem" ]; then
        echo -e "  🔐 Generating SSL for $domain..."
        docker run --rm -v ./nginx/ssl:/etc/letsencrypt \
            certbot/certbot certonly \
            --webroot -w /var/www/certbot \
            -d "$domain" \
            --email admin@$DOMAIN \
            --agree-tos \
            --non-interactive
    else
        echo -e "  ✅ SSL certificate exists for $domain"
    fi
done

echo -e "${GREEN}✅ SSL certificates configured${NC}"
echo ""

# Build and deploy
echo -e "${YELLOW}🏗️ Building Docker images...${NC}"

if [ "$ENV" == "production" ]; then
    COMPOSE_FILE="-f docker-compose.yml -f docker-compose.prod.yml"
else
    COMPOSE_FILE="-f docker-compose.yml"
fi

docker-compose $COMPOSE_FILE build

echo -e "${GREEN}✅ Docker images built${NC}"
echo ""

echo -e "${YELLOW}🔄 Starting services...${NC}"
docker-compose $COMPOSE_FILE up -d

echo -e "${GREEN}✅ Services started${NC}"
echo ""

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 15

# Run database migrations
echo -e "${YELLOW}🗄️ Running database migrations...${NC}"
docker exec tevanoxmovie-backend python scripts/migrate.py || true

# Seed initial data
echo -e "${YELLOW}🌱 Seeding initial data...${NC}"
docker exec tevanoxmovie-backend python scripts/seed_db.py || true

# Health check
echo -e "${YELLOW}🩺 Running health check...${NC}"

HEALTH_URL="https://api.$DOMAIN/health"
if curl -f -s -o /dev/null $HEALTH_URL; then
    echo -e "${GREEN}✅ Health check passed!${NC}"
else
    echo -e "${RED}❌ Health check failed!${NC}"
    echo "Check logs with: docker-compose $COMPOSE_FILE logs"
    exit 1
fi

# Show status
echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                              ║${NC}"
echo -e "${BLUE}║     ✅ DEPLOYMENT SUCCESSFUL!                              ║${NC}"
echo -e "${BLUE}║                                                              ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}🌐 Web App: https://$DOMAIN${NC}"
echo -e "${GREEN}🖥️ Admin: https://admin.$DOMAIN${NC}"
echo -e "${GREEN}⚙️ API: https://api.$DOMAIN${NC}"
echo -e "${GREEN}👔 Agent: https://agent.$DOMAIN${NC}"
echo -e "${GREEN}💾 Storage: https://storage.$DOMAIN${NC}"
echo ""

echo -e "${YELLOW}📊 Service Status:${NC}"
docker-compose $COMPOSE_FILE ps

echo -e "${GREEN}✅ Deployment complete!${NC}"