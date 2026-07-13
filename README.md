# 🎬 TevanoxMovie

**Movies, Series & Music - Unlimited Entertainment**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/tevanox/tevanoxmovie)
[![License](https://img.shields.io/badge/license-UNLICENSED-red.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

**TevanoxMovie** is a complete entertainment platform built for the Ugandan market and beyond. It offers a seamless experience for users to watch movies, series, and listen to music, with a unique sales agent referral system that allows agents to earn commissions.

### Key Highlights

- 🎬 **Movies & Series**: Watch unlimited content with VJ translated options
- 🎵 **Music**: Stream music from local and international artists
- 👔 **Sales Agent System**: Earn commissions through referrals
- 📱 **Multi-Platform**: Web, Android, and iOS apps
- 💰 **Flexible Subscription**: Weekly, Bi-Weekly, and Monthly plans
- 📥 **Offline Downloads**: Download content for offline viewing
- 🎤 **VJ Content**: Luganda and Swahili translated content
- 🔐 **Secure**: Single-device login, session management

---

## ✨ Features

### For Users
- ✅ Browse and search movies, series, and music
- ✅ Watch unlimited content with active subscription
- ✅ Download content for offline viewing
- ✅ Rate and review content
- ✅ Manage favorites and watch history
- ✅ Multi-device support (Web, Android, iOS)
- ✅ Secure authentication with session management

### For Sales Agents
- ✅ Unique referral code and link
- ✅ Track referrals and earnings in real-time
- ✅ Share referral links via social media
- ✅ Generate QR codes for easy sharing
- ✅ View commission breakdowns
- ✅ Withdraw earnings
- ✅ Team management and network tree
- ✅ Marketing materials hub

### For Admins
- ✅ Full content management (movies, series, music)
- ✅ Dynamic category and genre management
- ✅ VJ and musician management
- ✅ User and agent management
- ✅ Subscription and payment management
- ✅ Platform analytics and reporting
- ✅ Commission and payout processing
- ✅ System settings configuration

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────────────────────────────┐
│ TEVANOXMOVIE ARCHITECTURE │
├─────────────────────────────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ FRONTEND │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │ │
│ │ │ Web App │ │ Admin │ │ Mobile App │ │ │
│ │ │ (React.js) │ │ (React.js) │ │ (React Native) │ │ │
│ │ │ :3000 │ │ :3001 │ │ Android / iOS │ │ │
│ │ └──────────────┘ └──────────────┘ └──────────────────────┘ │ │
│ │ ┌──────────────┐ │ │
│ │ │ Agent App │ │ │
│ │ │ (React Native) │ │
│ │ │ Android / iOS │ │
│ │ └──────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ API GATEWAY │ │
│ │ Nginx (Reverse Proxy) │ │
│ │ SSL Termination + Load Balancing │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ BACKEND API │ │
│ │ Python FastAPI :8000 │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │ │
│ │ │ Auth │ │ Content │ │ Payment │ │ │
│ │ │ Service │ │ Service │ │ Service │ │ │
│ │ └──────────────┘ └──────────────┘ └──────────────────────┘ │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │ │
│ │ │ Agent │ │ Commission │ │ User │ │ │
│ │ │ Service │ │ Service │ │ Service │ │ │
│ │ └──────────────┘ └──────────────┘ └──────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ │ │
│ ┌───────────────┼───────────────┐ │
│ ▼ ▼ ▼ │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────┐ │
│ │ MongoDB │ │ Redis │ │ MinIO (Your PC) │ │
│ │ (Database) │ │ (Cache) │ │ (Storage) │ │
│ │ :27017 │ │ :6379 │ │ :9000 │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────────────────┘

text

---

## 🛠️ Tech Stack

### Backend
| Component | Technology | Version |
|-----------|------------|---------|
| **API Framework** | Python FastAPI | 0.104.1 |
| **Database** | MongoDB | 6.0 |
| **Cache** | Redis | 7.2 |
| **Storage** | MinIO (S3-compatible) | Latest |
| **Payment** | Paystack | Latest |
| **Task Queue** | Celery + Redis | 5.3.4 |

### Frontend
| Component | Technology | Version |
|-----------|------------|---------|
| **Web App** | React.js | 18.2.0 |
| **Admin Dashboard** | React.js | 18.2.0 |
| **Mobile App** | React Native | 0.72.6 |
| **Agent App** | React Native | 0.72.6 |
| **UI Library** | Material-UI | 5.14.18 |
| **State Management** | Redux Toolkit | 1.9.7 |

### Infrastructure
| Component | Technology | Version |
|-----------|------------|---------|
| **Containerization** | Docker | Latest |
| **Orchestration** | Docker Compose | Latest |
| **Reverse Proxy** | Nginx | Latest |
| **SSL** | Let's Encrypt / Certbot | Latest |
| **Monitoring** | Prometheus + Grafana | Latest |

---

## 📁 Project Structure
tevanox.com/
├── apps/
│ ├── tevanoxmovie-backend/ # Python FastAPI Backend
│ │ ├── app/
│ │ │ ├── api/ # API endpoints
│ │ │ ├── core/ # Core configuration
│ │ │ ├── models/ # Database models
│ │ │ ├── schemas/ # Pydantic schemas
│ │ │ ├── services/ # Business logic
│ │ │ └── utils/ # Utilities
│ │ ├── tests/ # Unit tests
│ │ ├── requirements.txt
│ │ └── main.py
│ │
│ ├── tevanoxmovie-web/ # React.js Web App
│ │ ├── src/
│ │ │ ├── api/ # API integration
│ │ │ ├── components/ # React components
│ │ │ ├── pages/ # Page components
│ │ │ ├── hooks/ # Custom hooks
│ │ │ ├── store/ # Redux store
│ │ │ └── utils/ # Utilities
│ │ ├── public/ # Static assets
│ │ └── package.json
│ │
│ ├── tevanoxmovie-admin/ # React.js Admin Dashboard
│ │ ├── src/
│ │ │ ├── api/ # API integration
│ │ │ ├── components/ # Admin components
│ │ │ ├── pages/ # Admin pages
│ │ │ ├── hooks/ # Custom hooks
│ │ │ └── store/ # Redux store
│ │ ├── public/ # Static assets
│ │ └── package.json
│ │
│ ├── tevanoxmovie-mobile/ # React Native Mobile App
│ │ ├── src/
│ │ │ ├── api/ # API integration
│ │ │ ├── components/ # React Native components
│ │ │ ├── screens/ # App screens
│ │ │ ├── navigation/ # Navigation setup
│ │ │ ├── store/ # Redux store
│ │ │ └── utils/ # Utilities
│ │ ├── android/ # Android native files
│ │ ├── ios/ # iOS native files
│ │ └── package.json
│ │
│ ├── tevanoxmovie-sales-agent/ # React Native Sales Agent App
│ │ ├── src/
│ │ │ ├── api/ # API integration
│ │ │ ├── components/ # React Native components
│ │ │ ├── screens/ # App screens
│ │ │ ├── navigation/ # Navigation setup
│ │ │ ├── store/ # Redux store
│ │ │ └── utils/ # Utilities
│ │ ├── android/ # Android native files
│ │ ├── ios/ # iOS native files
│ │ └── package.json
│ │
│ └── tevanoxmovie-shared/ # Shared Types & Constants
│ ├── types/ # TypeScript types
│ ├── constants/ # Shared constants
│ ├── utils/ # Shared utilities
│ └── index.ts
│
├── infrastructure/ # Docker & Deployment
│ ├── docker/ # Dockerfiles
│ ├── docker-compose.yml
│ ├── nginx/ # Nginx configuration
│ ├── ssl/ # SSL certificates
│ ├── monitoring/ # Prometheus & Grafana
│ └── scripts/ # Deployment scripts
│
├── docs/ # Documentation
│ ├── api/ # API documentation
│ ├── architecture/ # Architecture docs
│ ├── deployment/ # Deployment guides
│ ├── user-guide/ # User guides
│ └── developer-guide/ # Developer guides
│
├── scripts/ # Utility scripts
├── .gitignore
├── .env.example
├── LICENSE
└── README.md

text

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- MongoDB (local or Atlas)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tevanox/tevanoxmovie.git
cd tevanoxmovie

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 3. Start infrastructure services
cd infrastructure
docker-compose up -d

# 4. Set up backend
cd ../apps/tevanoxmovie-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 5. Set up web app
cd ../tevanoxmovie-web
npm install
npm run dev

# 6. Set up admin dashboard
cd ../tevanoxmovie-admin
npm install
npm run dev

# 7. Set up mobile app
cd ../tevanoxmovie-mobile
npm install
npx react-native run-android  # or run-ios

# 8. Set up sales agent app
cd ../tevanoxmovie-sales-agent
npm install
npx react-native run-android  # or run-ios
Access URLs
Service	Local URL	Production URL
Web App	http://localhost:3000	https://tevanox.com
Admin Dashboard	http://localhost:3001	https://admin.tevanox.com
Backend API	http://localhost:8000	https://api.tevanox.com
API Docs	http://localhost:8000/api/docs	https://api.tevanox.com/docs
MinIO Console	http://localhost:9001	https://storage.tevanox.com
🌐 Deployment
Production Deployment
bash
# 1. Set up environment
cd infrastructure
cp .env.example .env
# Edit .env with production values

# 2. Configure SSL
./scripts/ssl-setup.sh tevanox.com admin@tevanox.com

# 3. Deploy
./scripts/deploy.sh tevanox.com production
Deployment URLs
Service	URL
Web App	https://tevanox.com
Admin Dashboard	https://admin.tevanox.com
Backend API	https://api.tevanox.com
Sales Agent App	https://agent.tevanox.com
Storage	https://storage.tevanox.com
🔧 Environment Variables
Backend (.env)
env
# Database
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=tevanoxmovie

# Security
SECRET_KEY=your-super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Domain
DOMAIN=tevanox.com
API_URL=https://api.tevanox.com
WEB_URL=https://tevanox.com
ADMIN_URL=https://admin.tevanox.com

# Storage (MinIO)
STORAGE_ENDPOINT=https://storage.tevanox.com
STORAGE_ACCESS_KEY=your_access_key
STORAGE_SECRET_KEY=your_secret_key
STORAGE_BUCKET=tevanoxmovie

# Payment
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxx

# Commission Settings
TEVANOX_SHARE=0.60
NETWORK_TOTAL=0.40
LEVEL_1_COMMISSION=0.25
LEVEL_2_COMMISSION=0.10
LEVEL_3_COMMISSION=0.05
Web App (.env)
env
VITE_API_URL=https://api.tevanox.com/api/v1
VITE_APP_NAME=TevanoxMovie
VITE_APP_URL=https://tevanox.com
VITE_DOMAIN=tevanox.com
Admin Dashboard (.env)
env
VITE_API_URL=https://api.tevanox.com/api/v1
VITE_APP_NAME=TevanoxMovie Admin
VITE_APP_URL=https://admin.tevanox.com
VITE_DOMAIN=tevanox.com
📚 API Documentation
Base URL
text
https://api.tevanox.com/api/v1
Authentication
All API requests (except auth endpoints) require a Bearer token:

text
Authorization: Bearer <your_token>
Key Endpoints
Method	Endpoint	Description
POST	/auth/register	User registration
POST	/auth/login	User login
GET	/movies	Get all movies
GET	/movies/trending	Get trending movies
GET	/series	Get all series
GET	/music	Get all music
POST	/subscriptions/activate	Activate subscription
GET	/agents/dashboard	Agent dashboard
POST	/admin/movies	Add movie (admin)
GET	/categories	Get all categories
POST	/vjs	Create VJ (admin)
Full API Documentation
For complete API documentation, visit:

Swagger UI: https://api.tevanox.com/api/docs

ReDoc: https://api.tevanox.com/api/redoc

🤝 Contributing
We welcome contributions! Please see our Contributing Guide for details.

Development Workflow
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Coding Standards
Backend: PEP 8, Black, isort

Frontend: ESLint, Prettier

Mobile: ESLint, Prettier

Commit Messages: Conventional Commits

📄 License
This project is proprietary and confidential. Unauthorized copying, distribution, or use of this software is strictly prohibited.

© 2024 Tevanox. All rights reserved.

📞 Support
Channel	Contact
Email	support@tevanox.com
Website	https://tevanox.com
Phone	+256 XXX XXX XXX
🙏 Acknowledgments
Tevanox - Platform owner and operator

All Contributors - Who help build this platform

Our Users - For trusting us with their entertainment

🏆 Key Metrics
Metric	Target
Monthly Active Users	10,000+
Content Library	1,000+ Movies
Active Agents	500+
Monthly Revenue	150,000,000+ UGX
User Retention	70%+
🚀 Roadmap
Phase 1 (Q1 2024)
✅ Platform launch

✅ Basic content management

✅ Subscription system

✅ Agent referral system

Phase 2 (Q2 2024)
🔲 Mobile app launch

🔲 Offline downloads

🔲 Advanced analytics

🔲 VJ content expansion

Phase 3 (Q3 2024)
🔲 Live streaming

🔲 Content recommendations

🔲 Social features

🔲 International expansion

Phase 4 (Q4 2024)
🔲 AI-powered content curation

🔲 Original content production

🔲 Partner integrations

🔲 Enterprise features

📊 Current Status
Component	Status	Version
Backend API	✅ Production	v1.0.0
Web App	✅ Production	v1.0.0
Admin Dashboard	✅ Production	v1.0.0
Mobile App	🔲 Development	v0.9.0
Agent App	🔲 Development	v0.9.0
Database	✅ Production	v6.0
Storage	✅ Production	Latest
🔐 Security
✅ JWT authentication with session management

✅ Single-device login enforcement

✅ HTTPS everywhere

✅ Password hashing with bcrypt

✅ Rate limiting

✅ CORS protection

✅ Input validation and sanitization

✅ Secure session management

✅ Regular security audits

🎬 TevanoxMovie - Built with ❤️ by Tevanox

