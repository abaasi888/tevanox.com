#!/bin/bash
# ============================================================================ #
#                    TEVANOXMOVIE SSL SETUP SCRIPT                           #
# ============================================================================ #

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DOMAIN=${1:-tevanox.com}
EMAIL=${2:-admin@tevanox.com}

echo -e "${YELLOW}🔒 Setting up SSL certificates for $DOMAIN...${NC}"

# Install certbot if not installed
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}📦 Installing certbot...${NC}"
    sudo apt-get update
    sudo apt-get install -y certbot
fi

# Generate certificates for all subdomains
for subdomain in "" "admin" "api" "agent" "storage"; do
    if [ -z "$subdomain" ]; then
        domain="$DOMAIN"
    else
        domain="$subdomain.$DOMAIN"
    fi
    
    echo -e "${YELLOW}🔐 Generating SSL for $domain...${NC}"
    sudo certbot certonly \
        --webroot \
        -w /var/www/html \
        -d "$domain" \
        --email $EMAIL \
        --agree-tos \
        --non-interactive \
        --expand
done

# Copy certificates to nginx directory
echo -e "${YELLOW}📂 Copying certificates...${NC}"
sudo cp -r /etc/letsencrypt/live/* ./nginx/ssl/
sudo chown -R $USER:$USER ./nginx/ssl/

echo -e "${GREEN}✅ SSL certificates configured successfully${NC}"