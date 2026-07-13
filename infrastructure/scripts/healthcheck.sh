#!/bin/bash
# ============================================================================ #
#                    TEVANOXMOVIE HEALTH CHECK SCRIPT                        #
# ============================================================================ #

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DOMAIN=${1:-tevanox.com}

echo -e "${YELLOW}🩺 Checking health of TevanoxMovie services...${NC}"
echo ""

# Check services
services=(
    "https://api.$DOMAIN/health"
    "https://$DOMAIN/health"
    "https://admin.$DOMAIN/health"
)

for service in "${services[@]}"; do
    echo -n "  $service ... "
    if curl -f -s -o /dev/null $service; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ FAILED${NC}"
        FAILED=true
    fi
done

# Check Docker containers
echo ""
echo -e "${YELLOW}📦 Container status:${NC}"
docker ps --format "table {{.Names}}\t{{.Status}}"

if [ "$FAILED" = true ]; then
    echo ""
    echo -e "${RED}❌ Some services failed health check${NC}"
    exit 1
else
    echo ""
    echo -e "${GREEN}✅ All services healthy${NC}"
fi