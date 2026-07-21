const http = require("http");
const { Server } = require("socket.io");
const initializeSocket = require("./socket/socketManager");
require("dotenv").config();
console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const codeRoutes = require("./routes/codeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 CodeCollab AI Backend Running Successfully",
  });
});

// API Routes
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/code", codeRoutes);

app.use("/api/ai", aiRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server);

initializeSocket(io);

server.listen(PORT, () => {
  console.log("======================================");
  console.log(`🚀 Server Running on Port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("======================================");
});