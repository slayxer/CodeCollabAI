import { useState } from "react";
import "./CreateProjectModal.css";

function CreateProjectModal({ onClose, onCreate }) {

    const [form, setForm] = useState({

        title: "",
        description: "",
        techStack: "",
        visibility: "private"

    });

    const [loading, setLoading] = useState(false);

    // ============================
    // Handle Input Change
    // ============================

    const handleChange = (e) => {

        setForm((prev) => ({

            ...prev,
            [e.target.name]: e.target.value

        }));

    };

    // ============================
    // Submit
    // ============================

    const submitHandler = async (e) => {

        e.preventDefault();

        if (!form.title.trim()) {

            alert("Project title is required.");
            return;

        }

        try {

            setLoading(true);

            await onCreate({

                title: form.title.trim(),
                description: form.description.trim(),
                techStack: form.techStack.trim(),
                visibility: form.visibility

            });

        }

        catch (err) {

            console.error(err);
            alert("Failed to create project.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >

                <form
                    className="modal-content"
                    onSubmit={submitHandler}
                >

                    <h2>Create New Project</h2>

                    <input
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Project Description"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="techStack"
                        placeholder="React • Node • MongoDB"
                        value={form.techStack}
                        onChange={handleChange}
                    />

                    <select
                        name="visibility"
                        value={form.visibility}
                        onChange={handleChange}
                    >
                        <option value="private">🔒 Private</option>
                        <option value="public">🌍 Public</option>
                    </select>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Project"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateProjectModal;