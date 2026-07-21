import {
    FaFolderOpen,
    FaFileCode,
    FaClock
} from "react-icons/fa";

function ProfileStats() {

    return (

        <div className="stats-grid">

            <div className="stat-card">

                <FaFolderOpen/>

                <h2>0</h2>

                <p>Projects</p>

            </div>

            <div className="stat-card">

                <FaFileCode/>

                <h2>0</h2>

                <p>Files</p>

            </div>

            <div className="stat-card">

                <FaClock/>

                <h2>2026</h2>

                <p>Member Since</p>

            </div>

        </div>

    );

}

export default ProfileStats;