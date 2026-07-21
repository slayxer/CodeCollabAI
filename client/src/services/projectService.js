import API from "./api";

// ========================================
// PROJECT APIs
// ========================================

// Get all projects
export const getProjects = async () => {

    const token = localStorage.getItem("token");

    const response = await API.get("/projects", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    return response.data;

};

// Create Project
export const createProject = async (project) => {

    const token = localStorage.getItem("token");

    const response = await API.post(

        "/projects",

        project,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Update Project
export const updateProject = async (projectId, data) => {

    const token = localStorage.getItem("token");

    const response = await API.put(

        `/projects/${projectId}`,

        data,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Delete Project
export const deleteProject = async (projectId) => {

    const token = localStorage.getItem("token");

    const response = await API.delete(

        `/projects/${projectId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Toggle Favorite
export const toggleFavorite = async (projectId) => {

    const token = localStorage.getItem("token");

    const response = await API.patch(

        `/projects/${projectId}/favorite`,

        {},

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Add Collaborator
export const addCollaborator = async (

    projectId,

    email

) => {

    const token = localStorage.getItem("token");

    const response = await API.post(

        `/projects/${projectId}/collaborators`,

        {

            email

        },

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// ========================================
// FILE APIs
// ========================================

// Get Files
export const getFiles = async (projectId) => {

    const token = localStorage.getItem("token");

    const response = await API.get(

        `/projects/${projectId}/files`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Create File
export const createFile = async (

    projectId,

    file

) => {

    const token = localStorage.getItem("token");

    const response = await API.post(

        `/projects/${projectId}/files`,

        file,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Update File
export const updateFile = async (

    projectId,

    fileId,

    file

) => {

    const token = localStorage.getItem("token");

    const response = await API.put(

        `/projects/${projectId}/files/${fileId}`,

        file,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// Delete File
export const deleteFile = async (

    projectId,

    fileId

) => {

    const token = localStorage.getItem("token");

    const response = await API.delete(

        `/projects/${projectId}/files/${fileId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// ========================================
// CREATE FOLDER
// ========================================

export const createFolder = async (

    projectId,

    folder

) => {

    const token = localStorage.getItem("token");

    const response = await API.post(

        `/projects/${projectId}/folders`,

        folder,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// ========================================
// RENAME FILE / FOLDER
// ========================================

export const renameFile = async (

    projectId,

    fileId,

    name

) => {

    const token = localStorage.getItem("token");

    const response = await API.patch(

        `/projects/${projectId}/files/${fileId}/rename`,

        {

            name

        },

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};

// ========================================
// DELETE FILE
// ========================================

export const removeFile = async (

    projectId,

    fileId

) => {

    const token = localStorage.getItem("token");

    const response = await API.delete(

        `/projects/${projectId}/files/${fileId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};