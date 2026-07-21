import {
    FaHome,
    FaFolderOpen,
    FaCode,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("projectId");

        navigate("/login");

    };

    return (

        <aside className="sidebar">

            <div>

                <h1 className="logo">

                    CodeCollabAI

                </h1>

                <nav>

                    <NavLink to="/dashboard">

                        <FaHome />

                        Dashboard

                    </NavLink>

                    <NavLink to="/editor">

                        <FaCode />

                        Editor

                    </NavLink>
                    {/*
                    <NavLink to="/projects">

                        <FaFolderOpen />

                        Projects

                    </NavLink>
                    */}
                    <NavLink to="/profile">

                        <FaUserCircle />

                        Profile

                    </NavLink> 
                    

                </nav>

            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}

export default Sidebar;