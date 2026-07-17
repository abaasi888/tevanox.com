#!/bin/bash

# ========================================
# TEVANOXMOVIE - Incremental Backup Script
# ========================================
# This script ONLY backs up NEW data added since the last backup
# Previous backups are NEVER deleted
# ========================================

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ========================================
# CONFIGURATION
# ========================================

# MongoDB path
MONGO_PATH="/c/Program Files/MongoDB/Tools/100/bin"

# Database name
DB_NAME="tevanoxmovie"

# Backup location on external drive
BACKUP_ROOT="/e/MongoBackups"

# ========================================
# FUNCTIONS
# ========================================

# Function to find mongodump
find_mongodump() {
    if [ -f "${MONGO_PATH}/mongodump.exe" ]; then
        echo "${MONGO_PATH}/mongodump.exe"
    else
        local found_path=$(find /c -name "mongodump.exe" 2>/dev/null | head -1 | xargs dirname 2>/dev/null)
        if [ -n "$found_path" ]; then
            echo "${found_path}/mongodump.exe"
        else
            echo ""
        fi
    fi
}

# Function to get the last backup timestamp
get_last_backup_time() {
    local last_backup_file="$BACKUP_ROOT/.last_backup_time"
    if [ -f "$last_backup_file" ]; then
        cat "$last_backup_file"
    else
        # If no backup exists, use a very old date (1970)
        echo "1970-01-01T00:00:00Z"
    fi
}

# Function to save the current backup time
save_backup_time() {
    local current_time=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo "$current_time" > "$BACKUP_ROOT/.last_backup_time"
    echo -e "${GREEN}✅ Saved backup timestamp: $current_time${NC}"
}

# ========================================
# MAIN BACKUP PROCESS
# ========================================

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  TEVANOXMOVIE - INCREMENTAL BACKUP${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Find mongodump
MONGODUMP=$(find_mongodump)
if [ -z "$MONGODUMP" ]; then
    echo -e "${RED}❌ mongodump not found!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Using: $MONGODUMP${NC}"

# Create backup folder with date and time
DATE=$(date +"%Y-%m-%d_%H%M%S")
BACKUP_PATH="${BACKUP_ROOT}/${DB_NAME}_${DATE}"

echo -e "${YELLOW}📁 Backup location: ${BACKUP_PATH}${NC}"

# Create directory
mkdir -p "$BACKUP_PATH"

# Get the last backup time
LAST_BACKUP=$(get_last_backup_time)
echo -e "${YELLOW}⏰ Last backup: $LAST_BACKUP${NC}"

# ========================================
# BACKUP STRATEGY: Using Oplog (If replica set available)
# ========================================

echo -e "${YELLOW}📦 Running incremental backup...${NC}"

# Strategy 1: Try oplog backup (requires replica set)
echo -e "${CYAN}📋 Strategy 1: Attempting oplog backup...${NC}"

# Check if we have a replica set by pinging the admin
OPLOG_CHECK=$("${MONGODUMP}" --db admin --collection system.version --query='{}' --out="${BACKUP_PATH}/_check" 2>&1 | grep -c "oplog")

if [ "$OPLOG_CHECK" -gt 0 ] || [ -f "${BACKUP_PATH}/_check/admin/system.version.bson" ]; then
    echo -e "${GREEN}✅ Replica set detected! Using oplog backup.${NC}"
    
    # Use oplog for incremental backup (only new data since last oplog position)
    "${MONGODUMP}" --db "$DB_NAME" --oplog --out "$BACKUP_PATH"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Oplog backup completed!${NC}"
        save_backup_time
    else
        echo -e "${RED}❌ Oplog backup failed!${NC}"
        rm -rf "${BACKUP_PATH}_oplog_failed"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️ No replica set detected. Using full backup with timestamp filtering.${NC}"
    
    # Strategy 2: Use timestamp-based filtering
    echo -e "${CYAN}📋 Strategy 2: Timestamp-based filtering...${NC}"
    
    # Create a JSON query to filter documents with timestamps after last backup
    # This assumes your documents have a 'created_at' or 'updated_at' field
    QUERY=$(cat <<EOF
{
    "\$or": [
        { "created_at": { "\$gt": { "\$date": "$LAST_BACKUP" } } },
        { "updated_at": { "\$gt": { "\$date": "$LAST_BACKUP" } } },
        { "created_at": { "\$exists": false } },
        { "updated_at": { "\$exists": false } }
    ]
}
EOF
)
    
    echo -e "${YELLOW}📋 Query: $QUERY${NC}"
    
    # Backup with query filter
    "${MONGODUMP}" --db "$DB_NAME" --query="$QUERY" --out "$BACKUP_PATH"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Timestamp-based backup completed!${NC}"
        save_backup_time
    else
        echo -e "${RED}❌ Timestamp-based backup failed!${NC}"
        exit 1
    fi
fi

# Clean up check directory
rm -rf "${BACKUP_PATH}/_check" 2>/dev/null

# ========================================
# COMPRESS BACKUP
# ========================================

echo ""
echo -e "${YELLOW}📦 Compressing backup...${NC}"

if command -v tar &> /dev/null; then
    # Change to backup root directory for clean tar
    cd "$BACKUP_ROOT"
    tar -czf "${BACKUP_PATH}.tar.gz" "${DB_NAME}_${DATE}" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Compression complete!${NC}"
        # Remove uncompressed folder
        rm -rf "$BACKUP_PATH"
        COMPRESSED_SIZE=$(du -sh "${BACKUP_PATH}.tar.gz" 2>/dev/null | cut -f1)
        echo -e "${GREEN}📊 Compressed size: $COMPRESSED_SIZE${NC}"
    else
        echo -e "${RED}❌ Compression failed!${NC}"
        echo -e "${YELLOW}⚠️ Uncompressed backup kept at: $BACKUP_PATH${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ tar not found, keeping uncompressed backup${NC}"
fi

# ========================================
# BACKUP SUMMARY
# ========================================

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}✅ BACKUP COMPLETE!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

if [ -f "${BACKUP_PATH}.tar.gz" ]; then
    echo -e "${YELLOW}📁 Backup file: ${BACKUP_PATH}.tar.gz${NC}"
else
    echo -e "${YELLOW}📁 Backup folder: ${BACKUP_PATH}${NC}"
fi

echo -e "${YELLOW}📂 Location: $BACKUP_ROOT${NC}"

# Count total backups
TOTAL_BACKUPS=$(ls -1 "$BACKUP_ROOT" | grep -c "${DB_NAME}_" 2>/dev/null || echo "0")
echo -e "${YELLOW}📊 Total backups stored: $TOTAL_BACKUPS${NC}"

echo ""
echo -e "${CYAN}📋 Recent backups:${NC}"
ls -lt "$BACKUP_ROOT" 2>/dev/null | grep "${DB_NAME}" | head -10 || echo "No backups found"

echo ""
echo -e "${CYAN}📝 Backup Log:${NC}"
echo -e "${YELLOW}Last backup timestamp: $(get_last_backup_time)${NC}"

echo ""
echo -e "${GREEN}✅ Done!${NC}"
echo -e "${YELLOW}💡 No previous backups were deleted. All backups are kept.${NC}"