import {
    FaFolderOpen,
    FaFileCode,
    FaRobot,
    FaPlayCircle
} from "react-icons/fa";

import "./RecentActivity.css";

function RecentActivity() {

    const activities = [

        {
            icon: <FaFolderOpen />,
            title: "Created Project",
            subtitle: "CodeCollabAI",
            time: "2 mins ago"
        },

        {
            icon: <FaFileCode />,
            title: "Edited File",
            subtitle: "server.js",
            time: "10 mins ago"
        },

        {
            icon: <FaPlayCircle />,
            title: "Executed Code",
            subtitle: "JavaScript",
            time: "18 mins ago"
        },

        {
            icon: <FaRobot />,
            title: "Asked AI",
            subtitle: "Optimize React Component",
            time: "30 mins ago"
        }

    ];

    return (

        <div className="activity-card">

            <h2>

                Recent Activity

            </h2>

            {

                activities.map((item, index) => (

                    <div

                        className="activity-item"

                        key={index}

                    >

                        <div className="activity-icon">

                            {item.icon}

                        </div>

                        <div className="activity-content">

                            <h4>

                                {item.title}

                            </h4>

                            <p>

                                {item.subtitle}

                            </p>

                        </div>

                        <span>

                            {item.time}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentActivity;