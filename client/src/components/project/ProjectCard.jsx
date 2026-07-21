import {
    FaFolder,
    FaTrash,
    FaEdit,
    FaStar,
    FaRegStar,
    FaClock,
    FaUsers
} from "react-icons/fa";

import "./ProjectCard.css";

function ProjectCard({

    project,
    onOpen,
    onDelete,
    onEdit,
    onFavorite,
    onCollaborators

}) {

    return (

        <div className="project-card">

            {/* ===================== */}
            {/* Top */}
            {/* ===================== */}

            <div className="project-top">

                <div className="project-title">

                    <FaFolder className="folder-icon"/>

                    <h2>{project.title}</h2>

                </div>

                <button

                    className="favorite-btn"

                    onClick={() => onFavorite(project._id)}

                >

                    {

                        project.favorite

                        ? <FaStar/>

                        : <FaRegStar/>

                    }

                </button>

            </div>

            {/* ===================== */}
            {/* Description */}
            {/* ===================== */}

            <p className="project-description">

                {

                    project.description ||

                    "No description available."

                }

            </p>

            {/* ===================== */}
            {/* Tags */}
            {/* ===================== */}

            <div className="project-tags">

                <span className="tech-badge">

                    💻 {project.techStack || "JavaScript"}

                </span>

                <span

                    className={

                        project.visibility === "public"

                        ? "public-badge"

                        : "private-badge"

                    }

                >

                    {

                        project.visibility === "public"

                        ? "🌍 Public"

                        : "🔒 Private"

                    }

                </span>

            </div>

            {/* ===================== */}
            {/* Footer */}
            {/* ===================== */}

            <div className="project-footer">

                <div className="updated-time">

                    <FaClock/>

                    <span>

                        {

                            new Date(project.updatedAt)

                            .toLocaleDateString()

                        }

                    </span>

                </div>

                <div className="project-buttons">

                    <button

                        className="open-btn"

                        onClick={onOpen}

                    >

                        🚀 Open

                    </button>

                    <button

                        className="edit-btn-project"

                        onClick={() => onEdit(project)}

                    >

                        <FaEdit/>

                    </button>

                    <button

                        className="collab-btn"

                        onClick={() => onCollaborators(project)}

                    >

                        <FaUsers/>

                    </button>

                    <button

                        className="delete-btn"

                        onClick={onDelete}

                    >

                        <FaTrash/>

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProjectCard;