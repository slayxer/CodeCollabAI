const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    toggleFavorite,
    addCollaborator,

    createFile,
    createFolder,
    getFiles,
    updateFile,
    renameFile,
    deleteFile

} = require("../controllers/projectController");

// ========================================
// PROJECT ROUTES
// ========================================

// Create Project
router.post("/", protect, createProject);

// Get All Projects
router.get("/", protect, getProjects);

// Get Single Project
router.get("/:id", protect, getProjectById);

// Update Project
router.put("/:id", protect, updateProject);

// Toggle Favorite
router.patch("/:id/favorite", protect, toggleFavorite);

// Delete Project
router.delete("/:id", protect, deleteProject);

// Add Collaborator
router.post("/:id/collaborators", protect, addCollaborator);

// ========================================
// FILE ROUTES
// ========================================

// Create File
router.post("/:id/files", protect, createFile);

// Create Folder
router.post("/:id/folders", protect, createFolder);

// Get Files
router.get("/:id/files", protect, getFiles);

// Update File
router.put("/:id/files/:fileId", protect, updateFile);

// Rename File
router.patch("/:id/files/:fileId/rename", protect, renameFile);

// Delete File
router.delete("/:id/files/:fileId", protect, deleteFile);

module.exports = router;