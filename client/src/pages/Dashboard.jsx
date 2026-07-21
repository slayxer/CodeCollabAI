import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import AIInsights from "../components/dashboard/AIInsights";

import AIWidget from "../components/ai/AIWidget";

import ProjectCard from "../components/project/ProjectCard";
import CreateProjectModal from "../components/project/CreateProjectModal";
import EditProjectModal from "../components/project/EditProjectModal";
import AddCollaboratorModal from "../components/project/AddCollaboratorModal";

import {

    getProjects,
    createProject,
    updateProject,
    deleteProject,
    toggleFavorite,
    addCollaborator

} from "../services/projectService";

function Dashboard() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const userName = user?.name || "Developer";

    // ======================================
    // STATES
    // ======================================

    const [projects, setProjects] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showCollaboratorModal, setShowCollaboratorModal] =
        useState(false);

    const [selectedProject, setSelectedProject] =
        useState(null);

    // ======================================
    // LOAD PROJECTS
    // ======================================

    useEffect(() => {

        loadProjects();

    }, []);

    const loadProjects = async () => {

        try {

            const res = await getProjects();

            setProjects(res.projects || []);

        }

        catch (error) {

            console.error(error);

        }

    };

    // ======================================
    // CREATE PROJECT
    // ======================================

    const handleCreateProject = async (projectData) => {

        try {

            await createProject(projectData);

            await loadProjects();

            setShowModal(false);

        }

        catch (error) {

            console.error(error);

        }

    };

    // ======================================
    // UPDATE PROJECT
    // ======================================

    const handleUpdateProject = async (projectData) => {

        try {

            await updateProject(

                selectedProject._id,

                projectData

            );

            await loadProjects();

            setShowEdit(false);

            setSelectedProject(null);

        }

        catch (error) {

            console.error(error);

        }

    };

    // ======================================
    // DELETE PROJECT
    // ======================================

    const handleDeleteProject = async (projectId) => {

        const confirmDelete = window.confirm(

            "Delete this project?"

        );

        if (!confirmDelete) return;

        try {

            await deleteProject(projectId);

            await loadProjects();

        }

        catch (error) {

            console.error(error);

        }

    };

    // ======================================
    // FAVORITE PROJECT
    // ======================================

    const handleFavorite = async (projectId) => {

        try {

            await toggleFavorite(projectId);

            await loadProjects();

        }

        catch (error) {

            console.error(error);

        }

    };

    // ======================================
    // OPEN PROJECT
    // ======================================

    const openProject = (project) => {

        localStorage.setItem(

            "projectId",

            project._id

        );

        navigate("/editor");

    };

    // ======================================
    // OPEN EDIT MODAL
    // ======================================

    const openEditModal = (project) => {

        setSelectedProject(project);

        setShowEdit(true);

    };

    // ======================================
    // OPEN COLLABORATOR MODAL
    // ======================================

    const openCollaboratorModal = (project) => {

        setSelectedProject(project);

        setShowCollaboratorModal(true);

    };

    // ======================================
    // ADD COLLABORATOR
    // ======================================

    const handleAddCollaborator = async (

        projectId,

        email

    ) => {

        try {

            await addCollaborator(

                projectId,

                email

            );

            await loadProjects();

            setShowCollaboratorModal(false);

            setSelectedProject(null);

        }

        catch (error) {

            console.error(error);

        }

    };
        // ======================================
    // SEARCH FILTER
    // ======================================

    const filteredProjects = projects.filter((project) =>
        project.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ======================================
    // FAVORITES
    // ======================================

    const favoriteProjects = filteredProjects.filter(

        (project) => project.favorite

    );

    const otherProjects = filteredProjects.filter(

        (project) => !project.favorite

    );

    // ======================================
    // UI
    // ======================================

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <DashboardHeader />

                <WelcomeCard

                    userName={userName}

                    onCreateProject={() =>

                        setShowModal(true)

                    }

                    onContinue={() =>

                        navigate("/editor")

                    }

                />

                <DashboardStats

                    projects={projects.length}

                    files={0}

                    runs={0}

                    chats={0}

                />

                <div className="dashboard-top-section">

                    <RecentActivity />

                    <AIInsights />

                </div>

                {/* Toolbar */}

                <div className="dashboard-toolbar">

                    <input

                        className="search-input"

                        type="text"

                        placeholder="🔍 Search Projects..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                    <button

                        className="new-project-btn"

                        onClick={() =>

                            setShowModal(true)

                        }

                    >

                        + New Project

                    </button>

                </div>

                {/* Favorite Projects */}

                {

                    favoriteProjects.length > 0 && (

                        <>

                            <h2 className="section-title">

                                ⭐ Favorite Projects

                            </h2>

                            {

                                favoriteProjects.map((project) => (

                                    <ProjectCard

                                        key={project._id}

                                        project={project}

                                        onOpen={() =>

                                            openProject(project)

                                        }

                                        onDelete={() =>

                                            handleDeleteProject(project._id)

                                        }

                                        onFavorite={handleFavorite}

                                        onEdit={openEditModal}

                                        onCollaborators={

                                            openCollaboratorModal

                                        }

                                    />

                                ))

                            }

                        </>

                    )

                }

                {/* All Projects */}

                <h2 className="section-title">

                    📂 All Projects

                </h2>

                {

                    otherProjects.length === 0 ? (

                        <div className="empty-projects">

                            <h2>

                                No Projects Found

                            </h2>

                            <p>

                                Create your first project.

                            </p>

                        </div>

                    ) : (

                        otherProjects.map((project) => (

                            <ProjectCard

                                key={project._id}

                                project={project}

                                onOpen={() =>

                                    openProject(project)

                                }

                                onDelete={() =>

                                    handleDeleteProject(project._id)

                                }

                                onFavorite={handleFavorite}

                                onEdit={openEditModal}

                                onCollaborators={

                                    openCollaboratorModal

                                }

                            />

                        ))

                    )

                }

                <AIWidget />

            </div>
                        {/* ===========================
                CREATE PROJECT MODAL
            ============================ */}

            {

                showModal && (

                    <CreateProjectModal

                        onClose={() =>

                            setShowModal(false)

                        }

                        onCreate={handleCreateProject}

                    />

                )

            }

            {/* ===========================
                EDIT PROJECT MODAL
            ============================ */}

            {

                showEdit && selectedProject && (

                    <EditProjectModal

                        project={selectedProject}

                        onClose={() => {

                            setShowEdit(false);

                            setSelectedProject(null);

                        }}

                        onUpdate={handleUpdateProject}

                    />

                )

            }

            {/* ===========================
                ADD COLLABORATOR MODAL
            ============================ */}

            {

                showCollaboratorModal && selectedProject && (

                    <AddCollaboratorModal

                        project={selectedProject}

                        onClose={() => {

                            setShowCollaboratorModal(false);

                            setSelectedProject(null);

                        }}

                        onAdd={handleAddCollaborator}

                    />

                )

            }

        </div>

    );

}

export default Dashboard;