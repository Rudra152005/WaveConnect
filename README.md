# 🌊 WaveConnect - Real-Time Chat Application

<div align="center">

![WaveConnect Logo](https://img.shields.io/badge/WaveConnect-Chat%20in%20Waves-blueviolet?style=for-the-badge)

**Chat in Waves. Connect in Style.**

A modern, visually stunning real-time chat application with neon fashion vibes, glassmorphism design, and smooth animations.

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Documentation](#documentation) • [Deployment](#deployment)

</div>

---

## ✨ Features

### 🎨 **Stunning UI/UX**
- Neon gradient colors and glassmorphism effects
- Smooth animations with Framer Motion
- Dark mode and light mode support
- Mobile-responsive design
- Modern, fashionable interface

### 💬 **Real-Time Messaging**
- Instant message delivery with Socket.IO
- Typing indicators
- Online/offline status
- Read receipts
- Message history with pagination

### 🔐 **Secure Authentication**
- JWT-based authentication (access + refresh tokens)
- Password hashing with bcrypt
- Protected routes
- Automatic token refresh

### 👤 **User Management**
- User profiles with avatars
- Bio and profile customization
- User search functionality
- Account deletion

### 🎯 **Additional Features**
- One-to-one chat conversations
- Emoji picker integration
- Real-time user status updates
- Chat list with last message preview
- Responsive sidebar

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Real-time**: Socket.IO Client
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Emoji Picker**: emoji-picker-react
- **Date Formatting**: date-fns

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Real-time**: Socket.IO
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Validation**: express-validator
- **CORS**: cors

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/waveconnect.git
cd waveconnect
```

#### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/waveconnect
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Start frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📁 Project Structure

```
WaveConnect/
├── Backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── socket.js          # Socket.IO configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── chatController.js  # Chat operations
│   │   ├── messageController.js # Message handling
│   │   └── userController.js  # User management
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── errorHandler.js    # Error handling
│   │   └── upload.js          # File upload config
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Chat.js            # Chat schema
│   │   └── Message.js         # Message schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── chatRoutes.js      # Chat endpoints
│   │   ├── messageRoutes.js   # Message endpoints
│   │   └── userRoutes.js      # User endpoints
│   ├── utils/
│   │   └── generateToken.js   # JWT utilities
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Entry point
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatBubble.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── MessageInput.jsx
    │   │   ├── ThemeToggle.jsx
    │   │   ├── TypingIndicator.jsx
    │   │   ├── UserAvatar.jsx
    │   │   └── WaveBackground.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── ChatPage.jsx
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── SettingsPage.jsx
    │   ├── services/
    │   │   ├── api.js           # Axios instance
    │   │   └── socket.js        # Socket.IO client
    │   ├── store/
    │   │   ├── authStore.js     # Auth state
    │   │   └── chatStore.js     # Chat state
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── postcss.config.js
```

---

## 📚 Documentation

Comprehensive documentation is available in the `brain` folder:

- **[API Documentation](./brain/API_DOCUMENTATION.md)** - Complete REST API reference
- **[Socket.IO Events](./brain/SOCKET_EVENTS.md)** - Real-time event documentation
- **[Database Schema](./brain/DATABASE_SCHEMA.md)** - MongoDB schema details
- **[Deployment Guide](./brain/DEPLOYMENT_GUIDE.md)** - Production deployment instructions

---

## 🎨 Design Philosophy

WaveConnect embraces a bold, modern aesthetic:

- **Neon Colors**: Vibrant purple, pink, and blue gradients
- **Glassmorphism**: Frosted glass effects for depth
- **Smooth Animations**: Framer Motion for fluid interactions
- **Dark-First**: Beautiful dark mode as the primary theme
- **Mobile-First**: Responsive design that works everywhere

---

## 🔑 Key Features Explained

### Real-Time Communication

Socket.IO enables instant message delivery, typing indicators, and online status updates without page refreshes.

### JWT Authentication

Secure authentication with access and refresh tokens. Access tokens expire in 15 minutes, refresh tokens in 7 days.

### State Management

Zustand provides lightweight, performant state management for auth and chat data with persistence.

### Theme System

CSS variables enable seamless theme switching with localStorage persistence.

---

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**
   - Register new account
   - Login with credentials
   - Verify token refresh
   - Logout

2. **Chat Features**
   - Search for users
   - Create new chat
   - Send messages
   - Verify real-time delivery

3. **Real-Time Features**
   - Open two browser windows
   - Test typing indicators
   - Test online/offline status
   - Test message read receipts

---

## 🚢 Deployment

### Quick Deploy

**Frontend (Vercel)**:
```bash
cd Frontend
vercel
```

**Backend (Render/Railway)**:
- Push to GitHub
- Connect repository
- Add environment variables
- Deploy

See [Deployment Guide](./brain/DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Socket.IO** - Real-time engine
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **MongoDB** - Database
- **Vercel** - Frontend hosting

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">

**Made with 💜 by the WaveConnect Team**

[⬆ Back to Top](#-waveconnect---real-time-chat-application)

</div>
