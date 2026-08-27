# CodeCollabAI

CodeCollabAI is a full-stack collaborative coding platform built with the MERN stack. It provides developers with a centralized environment to create projects, manage code, collaborate with other users, execute code, and interact with AI-powered development assistance.

## 🚀 Features

* 🔐 User Registration & Login
* 🔑 JWT-based Authentication
* 👤 User Profile Management
* 📁 Project Creation & Management
* 👥 Project Collaboration
* 💻 Online Code Editor
* ▶️ Code Execution
* 🤖 AI-powered Coding Assistance
* 💬 Real-time Collaboration & Chat
* 📊 Developer Dashboard
* 🔔 Toast Notifications
* 📱 Responsive User Interface

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* React Router
* Axios
* Socket.IO Client
* Monaco Editor
* Recharts
* React Hot Toast
* React Markdown

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Socket.IO
* Multer
* Axios

### AI

* Google Gemini API

### Development Tools

* Git
* GitHub
* VS Code
* Thunder Client
* MongoDB Compass

## 📂 Project Structure

```text
CodeCollabAI/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── socket/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
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
│   └── server.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/slayxer/CodeCollabAI.git
cd CodeCollabAI
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

> Never commit your `.env` file to GitHub.

## ▶️ Running the Project

### Start the backend

From the `server` directory:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🔌 API Structure

The backend provides API routes for:

```text
/api/auth
/api/projects
/api/code
/api/ai
```

Authentication-protected endpoints use JWT-based authorization.

## 🤖 AI Assistance

CodeCollabAI integrates AI functionality to assist developers with coding-related tasks and provide intelligent development support.

## 🔄 Real-Time Communication

Socket.IO is used to support real-time communication and collaboration features between connected users.

## 🧪 Build

To create a production build of the frontend:

```bash
cd client
npm run build
```

## 👨‍💻 Author

**Slayxer**

GitHub: https://github.com/slayxer

## 📄 License

This project is licensed under the ISC License.
