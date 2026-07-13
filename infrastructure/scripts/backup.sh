#!/bin/bash
# ============================================================================ #
#                    TEVANOXMOVIE BACKUP SCRIPT                              #
# ============================================================================ #

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

BACKUP_DIR=${1:-./backups}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/backup_$TIMESTAMP"

echo -e "${YELLOW}📦 Creating backup...${NC}"
mkdir -p $BACKUP_PATH

# Backup MongoDB
echo -e "${YELLOW}🗄️ Backing up MongoDB...${NC}"
docker exec tevanoxmovie-mongodb mongodump --out /dump
docker cp tevanoxmovie-mongodb:/dump $BACKUP_PATH/mongodb

# Backup MinIO files
echo -e "${YELLOW}💾 Backing up files...${NC}"
docker exec tevanoxmovie-minio mc mirror local/tevanoxmovie $BACKUP_PATH/files

# Backup environment variables
echo -e "${YELLOW}📄 Backing up environment...${NC}"
cp .env $BACKUP_PATH/env

# Compress backup
echo -e "${YELLOW}🗜️ Compressing backup...${NC}"
cd $BACKUP_DIR
tar -czf "backup_$TIMESTAMP.tar.gz" "backup_$TIMESTAMP"
rm -rf "backup_$TIMESTAMP"

echo -e "${GREEN}✅ Backup created: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz${NC}"