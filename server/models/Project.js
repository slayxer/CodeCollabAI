const mongoose = require("mongoose");

// ========================================
// File / Folder Schema
// ========================================

const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["file", "folder"],
        default: "file"
    },

    parent: {
        type: String,
        default: "root"
    },

    language: {
        type: String,
        default: "javascript"
    },

    code: {
        type: String,
        default: ""
    }

});

// ========================================
// Project Schema
// ========================================

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    techStack: {
        type: String,
        default: ""
    },

    visibility: {
        type: String,
        enum: ["private", "public"],
        default: "private"
    },

    favorite: {
        type: Boolean,
        default: false
    },

    projectCode: {
        type: String,
        unique: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    files: [fileSchema]

},
{
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);