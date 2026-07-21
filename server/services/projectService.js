import axios from "axios";

const API = "http://localhost:5000/api/projects";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get project files
export const getFiles = async (projectId) => {
  const res = await axios.get(
    `${API}/${projectId}/files`,
    authHeader()
  );
  return res.data;
};

// Create new file
export const createFile = async (projectId, data) => {
  const res = await axios.post(
    `${API}/${projectId}/files`,
    data,
    authHeader()
  );
  return res.data;
};

// Update file
export const updateFile = async (
  projectId,
  fileId,
  data
) => {
  const res = await axios.put(
    `${API}/${projectId}/files/${fileId}`,
    data,
    authHeader()
  );

  return res.data;
};

// Delete file
export const deleteFile = async (
  projectId,
  fileId
) => {
  const res = await axios.delete(
    `${API}/${projectId}/files/${fileId}`,
    authHeader()
  );

  return res.data;
};
export const createFolder = async (

    projectId,

    folder

) => {

    const token = localStorage.getItem("token");

    const res = await API.post(

        `/projects/${projectId}/folders`,

        folder,

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    return res.data;

};