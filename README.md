# 💻 CodeCollabAI

### 🚀 AI-Powered Collaborative Coding Platform

**CodeCollabAI** is a full-stack collaborative development platform built with the **MERN stack**. It provides developers with a centralized workspace to create projects, write and manage code, collaborate in real time, and use AI-powered coding assistance.

---

## 🌟 Highlights

<table>
<tr>
<td>🔐 <b>Authentication</b><br>Secure JWT-based registration & login</td>
<td>💻 <b>Code Editor</b><br>Browser-based Monaco code editor</td>
<td>🤖 <b>AI Assistance</b><br>AI-powered developer support</td>
</tr>
<tr>
<td>📁 <b>Project Management</b><br>Create and manage coding projects</td>
<td>⚡ <b>Real-Time Collaboration</b><br>Socket.IO powered communication</td>
<td>📊 <b>Dashboard</b><br>Developer-focused project overview</td>
</tr>
</table>

---

## ✨ Features

### 🔐 Authentication & User Management

* User registration
* User login
* JWT authentication
* Protected API routes
* User profile
* Profile updates
* Secure password hashing

### 📁 Project Management

* Create projects
* View projects
* Manage project information
* Project-based development workspace

### 💻 Online Code Editor

* Monaco Editor integration
* Browser-based coding environment
* IDE-like coding experience
* Multiple programming-language support through the editor

### 🤖 AI Coding Assistance

* AI-powered coding support
* Developer-focused assistance
* Google Gemini API integration
* AI interaction through backend APIs

### ⚡ Real-Time Features

* Socket.IO integration
* Real-time communication
* Collaborative development architecture
* Live socket connection handling

### 📊 Developer Dashboard

* Project overview
* Project statistics
* Developer workspace
* Interactive UI components
* Responsive interface

---

# 🛠️ Tech Stack

### 🎨 Frontend

<p>
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
</p>

* React
* Vite
* React Router
* Axios
* Monaco Editor
* Socket.IO Client
* Recharts
* React Hot Toast
* React Markdown
* React Icons

### ⚙️ Backend

<p>
<img src="https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white"/>
</p>

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Socket.IO
* Multer
* Axios
* CORS
* dotenv

### 🤖 AI

* Google Gemini API

### 🧰 Development Tools

* Git
* GitHub
* VS Code
* MongoDB Compass
* Thunder Client
* npm

---

# 🏗️ Project Architecture

```text
CodeCollabAI/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🔄 Application Flow

```text
                ┌──────────────────────┐
                │     React Client     │
                │      Vite App        │
                └──────────┬───────────┘
                           │
                    Axios / Socket.IO
                           │
                           ▼
                ┌──────────────────────┐
                │    Express Server    │
                │       Node.js        │
                └───────┬───────┬──────┘
                        │       │
              ┌─────────┘       └─────────┐
              ▼                           ▼
      ┌────────────────┐         ┌────────────────┐
      │  MongoDB Atlas │         │   Gemini API   │
      │    Database    │         │ AI Assistance  │
      └────────────────┘         └────────────────┘
```

---

# ⚙️ Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/slayxer/CodeCollabAI.git
```

```bash
cd CodeCollabAI
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside:

```text
server/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

For the frontend, create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

> ⚠️ **Never upload `.env` files or API keys to GitHub.**

---

# ▶️ Running the Application

## Start Backend

```bash
cd server
npm start
```

Backend:

```text
http://localhost:5000
```

## Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 Production Build

To test the frontend production build:

```bash
cd client
npm run build
```

Vite generates:

```text
client/dist/
```

---

# 🔌 Backend API

The backend is organized into modular API routes:

```text
/api/auth
/api/projects
/api/code
/api/ai
```

### Authentication

```text
POST /api/auth/register

POST /api/auth/login

GET  /api/auth/me

GET  /api/auth/profile

PUT  /api/auth/profile
```

Protected routes use JWT authentication middleware.

---

# 🔑 Authentication Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
Express API
 │
 ▼
MongoDB
 │
 ▼
JWT Token
 │
 ▼
React Client
 │
 ▼
Protected Requests
```

---

# 🤖 AI Integration

CodeCollabAI integrates the **Google Gemini API** to provide AI-powered assistance inside the developer workspace.

The frontend communicates with the backend AI routes, while the backend handles communication with the AI service.

This keeps sensitive API credentials on the server instead of exposing them directly in the browser.

---

# ⚡ Real-Time Communication

CodeCollabAI uses **Socket.IO** for real-time communication.

The architecture supports:

* Persistent socket connections
* Real-time events
* Collaborative development features
* Client/server socket communication

---

# 📸 Screenshots

Add screenshots of the application here.

Recommended screenshots:

1. Login / Register
2. Dashboard
3. Project Workspace
4. Code Editor
5. AI Assistant
6. Profile Page

Example:

```markdown
![Dashboard](screenshots/dashboard.png)

![Code Editor](screenshots/editor.png)

![Login](screenshots/login.png)
```

---

# 📈 Future Improvements

Possible future improvements include:

* 👥 Advanced multi-user code collaboration
* 💬 Integrated project chat
* 🌍 Production deployment
* 🔔 Real-time notifications
* 🧪 Automated testing
* 🐳 Docker support
* 🔄 CI/CD pipeline
* 📊 Advanced project analytics
* 🔒 Additional security controls

---

# 📚 Learning Outcomes

This project provided practical experience with:

* MERN stack development
* RESTful API development
* React component architecture
* JWT authentication
* MongoDB database management
* Express middleware
* Socket.IO
* AI API integration
* API testing
* Git & GitHub
* Frontend/backend integration
* Environment variable management

---

# 👨‍💻 Author

### Slayxer

🎓 BTech / IT & AI-ML Background

💻 Full-Stack Developer

🤖 AI/ML Enthusiast

**GitHub:**
https://github.com/slayxer

---

# ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the **ISC License**.
