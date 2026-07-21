import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import Profile from "./pages/Profile";
import Project from "./pages/Project";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/editor" element={<Editor />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/project" element={<Project />} />
    </Routes>
  );
}

export default App;