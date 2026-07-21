import {
    FaRocket,
    FaFolderPlus,
    FaCode
} from "react-icons/fa";

import "./WelcomeCard.css";

function WelcomeCard({

    userName = "Developer",

    onCreateProject,

    onContinue

}) {

    const today = new Date().toLocaleDateString("en-US", {

        weekday: "long",
        month: "long",
        day: "numeric"

    });

    return (

        <div className="welcome-card">

            <div className="welcome-left">

                <span className="welcome-date">

                    {today}

                </span>

                <h1>

                    Welcome back, {userName} 👋

                </h1>

                <p>

                    Ready to build something amazing today?

                </p>

                <div className="welcome-buttons">

                    <button

                        className="primary-btn"

                        onClick={onCreateProject}

                    >

                        <FaFolderPlus />

                        New Project

                    </button>

                    <button

                        className="secondary-btn"

                        onClick={onContinue}

                    >

                        <FaCode />

                        Continue Coding

                    </button>

                </div>

            </div>

            <div className="welcome-right">

                <div className="rocket-circle">

                    <FaRocket />

                </div>

            </div>

        </div>

    );

}

export default WelcomeCard;