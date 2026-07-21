import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/code",
});

export const executeCode = async (language, code) => {
  const response = await API.post("/run", {
    language,
    code,
  });

  return response.data;
};