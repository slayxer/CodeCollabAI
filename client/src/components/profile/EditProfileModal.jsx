import { useState } from "react";

function EditProfileModal({

    user,

    onClose,

    onSave

}) {

    const [form, setForm] = useState({

        name: user.name,

        email: user.email

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const submitHandler = (e) => {

        e.preventDefault();

        onSave(form);

    };

    return (

        <div className="modal">

            <div
                className="modal-overlay"
                onClick={onClose}
            ></div>

            <form
                className="modal-content"
                onSubmit={submitHandler}
            >

                <h2>Edit Profile</h2>

                <input

                    type="text"

                    name="name"

                    value={form.name}

                    onChange={handleChange}

                />

                <input

                    type="email"

                    name="email"

                    value={form.email}

                    onChange={handleChange}

                />

                <div className="modal-buttons">

                    <button
                        type="button"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        type="submit"
                    >

                        Save Changes

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditProfileModal;