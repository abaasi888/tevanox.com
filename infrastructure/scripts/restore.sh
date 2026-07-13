#!/bin/bash
# ============================================================================ #
#                    TEVANOXMOVIE RESTORE SCRIPT                             #
# ============================================================================ #

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Usage: $0 <backup_file.tar.gz>${NC}"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Backup file not found: $BACKUP_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Restoring from backup: $BACKUP_FILE${NC}"

# Extract backup
BACKUP_DIR=$(mktemp -d)
tar -xzf $BACKUP_FILE -C $BACKUP_DIR

# Restore MongoDB
echo -e "${YELLOW}🗄️ Restoring MongoDB...${NC}"
docker cp $BACKUP_DIR/mongodb tevanoxmovie-mongodb:/dump
docker exec tevanoxmovie-mongodb mongorestore /dump

# Restore files
echo -e "${YELLOW}💾 Restoring files...${NC}"
docker exec tevanoxmovie-minio mc mirror $BACKUP_DIR/files local/tevanoxmovie

# Restore environment
echo -e "${YELLOW}📄 Restoring environment...${NC}"
cp $BACKUP_DIR/env .env

# Cleanup
rm -rf $BACKUP_DIR

echo -e "${GREEN}✅ Restore complete${NC}"