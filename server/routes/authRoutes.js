const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getCurrentUser,
    getProfile,
    updateProfile
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Authentication Routes
router.post("/register", registerUser);

router.post("/login", loginUser);

// Protected Route
router.get("/me", protect, getCurrentUser);

// ================= PROFILE =================

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

module.exports = router;