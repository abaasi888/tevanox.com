#!/usr/bin/env python3
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def seed():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.tevanoxmovie
    
    # Create admin user
    await db.users.insert_one({
        "username": "admin",
        "email": "admin@tevanox.com",
        "password": "$2b$12$KIXxY8vKjXZ8vKjXZ8vKjXZ8vKjXZ8vKjXZ8vKjX",
        "is_admin": True,
        "created_at": "2024-01-01T00:00:00Z"
    })
    
    print("✅ Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
