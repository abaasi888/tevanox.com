#!/bin/bash
# ============================================================================ #
#                    TEVANOXMOVIE ROLLBACK SCRIPT                            #
# ============================================================================ #

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}⏪ Rolling back to previous version...${NC}"

# Stop current services
docker-compose down

# Remove current images
docker rmi tevanoxmovie-backend tevanoxmovie-web tevanoxmovie-admin || true

# Restart with previous images
docker-compose up -d

echo -e "${GREEN}✅ Rollback complete${NC}"