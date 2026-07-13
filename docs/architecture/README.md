
---

## 📄 **ARCHITECTURE DOCS FILES**

### `tevanox.com/docs/architecture/README.md`

```markdown
# 🏗️ Architecture Documentation

## Overview

TevanoxMovie is built using a modern microservices architecture with the following components:

## Architecture Diagram

```mermaid
graph TB
    subgraph Frontend
        WEB[Web App - React.js]
        MOBILE[Mobile App - React Native]
        ADMIN[Admin Dashboard - React.js]
        AGENT[Sales Agent App - React Native]
    end

    subgraph Backend
        API[API Gateway - FastAPI]
        AUTH[Auth Service]
        USER[User Service]
        CONTENT[Content Service]
        PAYMENT[Payment Service]
        AGENT_SVC[Agent Service]
    end

    subgraph Storage
        MONGODB[(MongoDB)]
        MINIO[(MinIO - Your PC)]
        REDIS[(Redis - Cache)]
    end

    WEB --> API
    MOBILE --> API
    ADMIN --> API
    AGENT --> API
    API --> AUTH
    API --> USER
    API --> CONTENT
    API --> PAYMENT
    API --> AGENT_SVC
    AUTH --> MONGODB
    USER --> MONGODB
    CONTENT --> MONGODB
    CONTENT --> MINIO
    PAYMENT --> MONGODB
    AGENT_SVC --> MONGODB
    AUTH --> REDIS
    USER --> REDIS

   
   
Technology Stack
Component	Technology	Version
Backend	Python FastAPI	0.104.1
Web App	React.js	18.2.0
Mobile App	React Native	0.72.6
Admin Dashboard	React.js	18.2.0
Sales Agent App	React Native	0.72.6
Database	MongoDB	6.0
Cache	Redis	7.2
Storage	MinIO	Latest
Payment	Paystack	Latest
Deployment	Docker	Latest
Reverse Proxy	Nginx	Latest
Data Flow
User Authentication: JWT-based with session management

Content Streaming: Direct from MinIO with presigned URLs

Payment Processing: Paystack integration

Commission Calculation: Automated monthly payouts

Referral Tracking: Agent-only referral system

Security
JWT tokens for authentication

Session management with single-device login

HTTPS for all communications

Input validation and sanitization

Rate limiting

CORS protection

 