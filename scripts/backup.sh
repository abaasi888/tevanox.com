#!/bin/bash
BACKUP_DIR="./backups/$(date +%Y-%m-%d_%H-%M-%S)"
mkdir -p $BACKUP_DIR
docker exec tevanoxmovie-mongodb mongodump --out /dump
docker cp tevanoxmovie-mongodb:/dump $BACKUP_DIR/mongodb
echo "✅ Backup created at $BACKUP_DIR"
