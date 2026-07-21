import {
    FaFolderOpen,
    FaFileCode,
    FaPlayCircle,
    FaRobot
} from "react-icons/fa";

import AnimatedCounter from "./AnimatedCounter";

import "./DashboardStats.css";

function DashboardStats({

    projects = 0,

    files = 0,

    runs = 0,

    chats = 0

}) {

    const stats = [

        {
            title: "Projects",
            value: projects,
            icon: <FaFolderOpen />,
            growth: "+2 this week",
            color: "#2563eb"
        },

        {
            title: "Files",
            value: files,
            icon: <FaFileCode />,
            growth: "+18 today",
            color: "#22c55e"
        },

        {
            title: "Runs",
            value: runs,
            icon: <FaPlayCircle />,
            growth: "+31 executions",
            color: "#f97316"
        },

        {
            title: "AI Chats",
            value: chats,
            icon: <FaRobot />,
            growth: "+9 today",
            color: "#7c3aed"
        }

    ];

    return (

        <div className="stats-grid">

            {

                stats.map((card, index) => (

                    <div
                        key={index}
                        className="stat-card"
                    >

                        <div className="stat-top">

                            <div
                                className="stat-icon"
                                style={{
                                    background: card.color
                                }}
                            >

                                {card.icon}

                            </div>

                            <span className="growth">

                                {card.growth}

                            </span>

                        </div>

                        <h2>

                            <AnimatedCounter value={card.value} />

                        </h2>

                        <p>

                            {card.title}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardStats;