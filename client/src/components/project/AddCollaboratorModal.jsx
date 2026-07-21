import { useState } from "react";
import "./AddCollaboratorModal.css";

function AddCollaboratorModal({

    project,
    onClose,
    onAdd

}) {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            alert("Enter collaborator email.");
            return;

        }

        try {

            setLoading(true);

            await onAdd(project._id, email);

            alert("Collaborator added successfully!");

            onClose();

        }

        catch (err) {

            console.error(err);

            alert("Failed to add collaborator.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Add Collaborator

                </h2>

                <p>

                    Project:
                    <strong> {project.title}</strong>

                </p>

                <form onSubmit={handleSubmit}>

                    <input

                        type="email"

                        placeholder="Enter collaborator email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                    />

                    <div className="modal-buttons">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="create-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                ? "Adding..."

                                : "Add"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddCollaboratorModal;