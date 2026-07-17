# 🎬 VidVerse

<div align="center">

# 🎥 VidVerse

### Modern Full Stack Video Sharing Platform

A YouTube-inspired video sharing platform built using the **MERN Stack**, featuring secure authentication, video uploads, playlists, subscriptions, community posts, and a fully responsive UI.

<br>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit-success?style=for-the-badge)](https://vid-verse-66xp.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME)

<br>

<p align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>

</p>

</div>

---

# 🌐 Live Demo

### 🚀 https://vid-verse-66xp.vercel.app

---

# 📖 About

VidVerse is a feature-rich **full-stack video sharing platform** inspired by YouTube, developed using the **MERN Stack**. It allows users to upload and stream videos, interact through likes and comments, subscribe to creators, create playlists, publish community posts, and manage personalized profiles.

The application is built with scalability, security, and performance in mind, utilizing **JWT authentication**, **Cloudinary media storage**, **MongoDB Atlas**, and a responsive React frontend.

---

# ✨ Features

| Authentication | Videos | Social |
|---------------|--------|--------|
| JWT Login | Upload Videos | Like Videos |
| Register | Edit Videos | Comments |
| Refresh Tokens | Delete Videos | Subscribe Channels |
| Logout | Custom Thumbnails | Community Posts |
| HTTP Only Cookies | Video Streaming | Creator Profiles |

---

| User Dashboard | Playlist | Security |
|---------------|----------|----------|
| Channel Analytics | Create Playlist | JWT Authentication |
| Uploaded Videos | Add Videos | Refresh Tokens |
| Profile Management | Remove Videos | Password Hashing |
| Subscriber Count | Delete Playlist | Protected Routes |

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Framer Motion
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary
- Cookie Parser

---

## Tools

- Git
- GitHub
- MongoDB Atlas
- Postman
- VS Code
- Vercel
- Render

---

# 🏗 Architecture

```text
                     React + Vite
                           │
                     REST API Calls
                           │
                  Express.js Backend
                           │
         ┌─────────────────┴──────────────────┐
         │                                    │
     MongoDB Atlas                      Cloudinary
(Database & Users)               (Video & Image Storage)
```

---

# 🚀 Key Features

## 🔐 Authentication

- JWT Authentication
- Refresh Tokens
- Secure Cookies
- Password Encryption
- Protected Routes

---

## 🎥 Video Module

- Upload Videos
- Stream Videos
- Publish / Unpublish
- Edit Metadata
- Delete Videos
- Upload Thumbnails
- Search Videos
- View Counter

---

## ❤️ Social Features

- Likes
- Comments
- Subscriptions
- Creator Channels
- Community Posts

---

## 📂 Playlist

- Create Playlist
- Delete Playlist
- Rename Playlist
- Add Videos
- Remove Videos

---

## 👤 Dashboard

- Profile Management
- Uploaded Videos
- Subscriber Count
- Total Likes
- Channel Statistics

---

# 📁 Folder Structure

```text
VidVerse
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── models
│   │   ├── middlewares
│   │   ├── utils
│   │   ├── services
│   │   ├── db
│   │   └── app.js
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── hooks
│   │   ├── context
│   │   ├── services
│   │   ├── utils
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙ Environment Variables

## Backend

```env
PORT=8000

MONGODB_URI=

ACCESS_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=

REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

CORS_ORIGIN=http://localhost:5173
```

---

## Frontend

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/VidVerse.git
```

```bash
cd VidVerse
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📡 REST APIs

## Authentication

```http
POST /users/register
POST /users/login
POST /users/logout
POST /users/refresh-token
GET  /users/current-user
```

---

## Videos

```http
GET    /videos
GET    /videos/:id
POST   /videos
PATCH  /videos/:id
DELETE /videos/:id
```

---

## Comments

```http
POST   /comments
GET    /comments/:videoId
DELETE /comments/:id
```

---

## Likes

```http
POST /likes/video/:id
POST /likes/comment/:id
```

---

## Playlist

```http
POST   /playlist
PATCH  /playlist/:id
GET    /playlist/:id
DELETE /playlist/:id
```

---

## Tweets

```http
POST   /tweets
GET    /tweets
PATCH  /tweets/:id
DELETE /tweets/:id
```

---

## Subscription

```http
POST /subscriptions/:channelId
GET  /subscriptions/channel/:id
```

---

# 🔒 Authentication Flow

```text
Register
      │
      ▼
Login
      │
      ▼
JWT Generated
      │
      ▼
HTTP Only Cookies
      │
      ▼
Protected Routes
      │
      ▼
Refresh Token
      │
      ▼
Logout
```

---

# 📦 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Media | Cloudinary |

---

# 🧪 Testing

✔ Postman API Testing

✔ MongoDB Atlas Integration

✔ Authentication Middleware

✔ Cloudinary Uploads

✔ Responsive UI Testing

---

# 🚀 Future Scope

- AI Video Recommendation
- Watch History
- Watch Later
- Live Streaming
- Notifications
- Email Verification
- Google Authentication
- Infinite Scrolling
- Admin Dashboard
- Real-Time Chat
- Trending Algorithm
- Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome!

```bash
Fork 🍴

Clone 📥

Create Branch 🌿

Commit Changes ✅

Push 🚀

Open Pull Request 🎉
```

---

# 👨‍💻 Developer

## Charvi Singh

**B.Tech Information Technology**

**National Institute of Technology Kurukshetra**

### Connect with me

- GitHub : https://github.com/YOUR_GITHUB_USERNAME
- LinkedIn : https://linkedin.com/in/YOUR_LINKEDIN
- Email : YOUR_EMAIL

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It motivates me to build more open-source projects.

---

<div align="center">

## 🚀 Built with ❤️ by Charvi Singh

### ⭐ Star this repository if you like it!

</div>
