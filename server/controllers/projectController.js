const Project = require("../models/Project");
const User = require("../models/User");

// ======================================
// CREATE PROJECT
// ======================================

const createProject = async (req, res) => {

    try {

        const {

            title,
            description,
            techStack,
            visibility

        } = req.body;

        if (!title) {

            return res.status(400).json({

                success: false,
                message: "Project title is required"

            });

        }

        const projectCode = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        const project = await Project.create({

            title,

            description,

            techStack,

            visibility,

            projectCode,

            owner: req.user._id,

            members: [req.user._id],

            files: []

        });

        res.status(201).json({

            success: true,

            message: "Project created successfully",

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// GET ALL PROJECTS
// ======================================

const getProjects = async (req, res) => {

    try {

        const projects = await Project.find({

            members: req.user._id

        })

        .populate("owner", "name email")

        .populate("members", "name email");

        res.status(200).json({

            success: true,

            count: projects.length,

            projects

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// GET PROJECT BY ID
// ======================================

const getProjectById = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id)

        .populate("owner", "name email")

        .populate("members", "name email");

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        res.status(200).json({

            success: true,

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// UPDATE PROJECT
// ======================================

const updateProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        if (

            project.owner.toString() !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Only owner can update"

            });

        }

        const updatedProject = await Project.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        res.status(200).json({

            success: true,

            message: "Project updated",

            updatedProject

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// TOGGLE FAVORITE
// ======================================

const toggleFavorite = async (req, res) => {

    try {

        const project = await Project.findById(

            req.params.id

        );

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        project.favorite = !project.favorite;

        await project.save();

        res.status(200).json({

            success: true,

            favorite: project.favorite

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// ADD COLLABORATOR
// ======================================

const addCollaborator = async (req, res) => {

    try {

        const { email } = req.body;

        const project = await Project.findById(

            req.params.id

        );

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        if (

            project.owner.toString() !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Only owner can add collaborators"

            });

        }

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const alreadyExists = project.members.some(

            member =>

                member.toString() ===

                user._id.toString()

        );

        if (alreadyExists) {

            return res.status(400).json({

                success: false,

                message: "User already exists"

            });

        }

        project.members.push(user._id);

        await project.save();

        res.status(200).json({

            success: true,

            message: "Collaborator added",

            members: project.members

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// DELETE PROJECT
// ======================================

const deleteProject = async (req, res) => {

    try {

        const project = await Project.findById(

            req.params.id

        );

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        if (

            project.owner.toString() !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Only owner can delete"

            });

        }

        await project.deleteOne();

        res.status(200).json({

            success: true,

            message: "Project deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ======================================
// CREATE FILE
// ======================================

const createFile = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        const isMember = project.members.some(

            member => member.toString() === req.user._id.toString()

        );

        if (!isMember) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        project.files.push({

            name: req.body.name,

            type: "file",

            parent: req.body.parent || "root",

            language: req.body.language || "javascript",

            code: req.body.code || ""

        });

        await project.save();

        res.status(201).json({

            success: true,

            files: project.files

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// CREATE FOLDER
// ======================================

const createFolder = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        const isMember = project.members.some(

            member => member.toString() === req.user._id.toString()

        );

        if (!isMember) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        project.files.push({

            name: req.body.name,

            type: "folder",

            parent: req.body.parent || "root",

            language: "",

            code: ""

        });

        await project.save();

        res.status(201).json({

            success: true,

            files: project.files

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// GET FILES
// ======================================

const getFiles = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        const isMember = project.members.some(

            member => member.toString() === req.user._id.toString()

        );

        if (!isMember) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        res.status(200).json({

            success: true,

            files: project.files

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// UPDATE FILE
// ======================================

const updateFile = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        const file = project.files.id(req.params.fileId);

        if (!file) {

            return res.status(404).json({

                success: false,

                message: "File not found"

            });

        }

        file.name = req.body.name || file.name;

        file.language = req.body.language || file.language;

        file.code = req.body.code || file.code;

        await project.save();

        res.status(200).json({

            success: true,

            file

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ======================================
// RENAME FILE / FOLDER
// ======================================

const renameFile = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        const file = project.files.id(req.params.fileId);

        if (!file) {

            return res.status(404).json({

                success: false,

                message: "File not found"

            });

        }

        file.name = req.body.name;

        await project.save();

        res.status(200).json({

            success: true,

            message: "Renamed successfully",

            file

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// DELETE FILE / FOLDER (Recursive)
// ======================================

const deleteFile = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        const deleteRecursive = (id) => {

            const children = project.files.filter(

                file => file.parent === id

            );

            children.forEach(child => {

                deleteRecursive(child._id.toString());

            });

            project.files.pull(id);

        };

        deleteRecursive(req.params.fileId);

        await project.save();

        res.status(200).json({

            success: true,

            message: "Deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// EXPORTS
// ======================================

module.exports = {

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

};