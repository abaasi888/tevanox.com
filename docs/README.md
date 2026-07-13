# 📚 TevanoxMovie Documentation

Welcome to the TevanoxMovie documentation. This is a comprehensive guide for developers, administrators, and users of the TevanoxMovie platform.

## 📖 Overview

TevanoxMovie is a complete entertainment platform that offers:
- 🎬 Movies streaming and downloading
- 📺 Series with episode management
- 🎵 Music streaming with offline playback
- 👔 Sales Agent referral system
- 🖥️ Admin dashboard for content management

## 🏗️ Architecture

The platform consists of:
1. **Backend API** - Python FastAPI
2. **Web App** - React.js
3. **Mobile App** - React Native (Android & iOS)
4. **Admin Dashboard** - React.js
5. **Sales Agent App** - React Native
6. **Storage** - MinIO (Self-hosted on your PC)
7. **Database** - MongoDB

## 📁 Documentation Structure
docs/
├── api/ # API Endpoints Documentation
├── architecture/ # System Architecture
├── deployment/ # Deployment Guides
├── user-guide/ # User Guides
└── developer-guide/ # Developer Guides


## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/tevanox/tevanoxmovie.git
cd tevanoxmovie

# Install dependencies
cd apps/tevanoxmovie-backend && pip install -r requirements.txt
cd ../tevanoxmovie-web && npm install
cd ../tevanoxmovie-mobile && npm install

# Start services
cd ../../infrastructure && docker-compose up -d

# Run backend
cd ../apps/tevanoxmovie-backend && uvicorn app.main:app --reload

# Run web app
cd ../tevanoxmovie-web && npm run dev

🌐 URLs
Service	URL
Web App	https://tevanox.com
Admin Dashboard	https://admin.tevanox.com
API	https://api.tevanox.com
Agent App	https://agent.tevanox.com
Storage	https://storage.tevanox.com

📞 Support
Email: support@tevanox.com

Website: https://tevanox.com

GitHub: https://github.com/tevanox/tevanoxmovie