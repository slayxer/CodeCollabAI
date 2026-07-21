import { useState } from "react";
import {
    FaUserCircle,
    FaEnvelope,
    FaEdit,
    FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import EditProfileModal from "./EditProfileModal";
import { updateProfile } from "../../services/profileService";

function ProfileCard({ user, refreshProfile }) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("projectId");

        navigate("/login");

    };

    const handleSave = async (formData) => {

        try {

            await updateProfile(formData);

            await refreshProfile();

            setShowModal(false);

            alert("✅ Profile Updated!");

        }

        catch (err) {

            console.error(err);

            alert("❌ Failed to update profile.");

        }

    };

    return (

        <>

            <div className="profile-card">

                <FaUserCircle className="avatar" />

                <h2>{user.name}</h2>

                <p>Full Stack Developer</p>

                <div className="profile-info">

                    <FaEnvelope />

                    <span>{user.email}</span>

                </div>

                <button

                    className="edit-btn"

                    onClick={() => setShowModal(true)}

                >

                    <FaEdit />

                    Edit Profile

                </button>

                <button

                    className="logout-btn-profile"

                    onClick={logout}

                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

            {

                showModal && (

                    <EditProfileModal

                        user={user}

                        onClose={() => setShowModal(false)}

                        onSave={handleSave}

                    />

                )

            }

        </>

    );

}

export default ProfileCard;