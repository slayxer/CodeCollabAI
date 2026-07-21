import { useState } from "react";
import "./EditProjectModal.css";

function EditProjectModal({ project, onClose, onSave }) {

    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [techStack, setTechStack] = useState(project.techStack);
    const [visibility, setVisibility] = useState(project.visibility);

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave({

            title,
            description,
            techStack,
            visibility

        });

    };

    return (

        <div className="modal-overlay">

            <div className="edit-modal">

                <h2>Edit Project</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Project Title"
                        required
                    />

                    <textarea
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        placeholder="Description"
                    />

                    <input
                        value={techStack}
                        onChange={(e)=>setTechStack(e.target.value)}
                        placeholder="Tech Stack"
                    />

                    <select
                        value={visibility}
                        onChange={(e)=>setVisibility(e.target.value)}
                    >

                        <option value="private">
                            Private
                        </option>

                        <option value="public">
                            Public
                        </option>

                    </select>

                    <div className="modal-buttons">

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProjectModal;