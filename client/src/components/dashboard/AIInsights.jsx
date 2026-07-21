import {
    FaBrain
} from "react-icons/fa";

import "./AIInsights.css";

function AIInsights(){

    return(

        <div className="ai-card">

            <h2>

                AI Insights

            </h2>

            <div className="score">

                <FaBrain/>

                <h1>

                    92%

                </h1>

            </div>

            <p>

                Productivity Score

            </p>

            <div className="insight">

                ✔ JavaScript is your most used language.

            </div>

            <div className="insight">

                ✔ You created 12 projects.

            </div>

            <div className="insight">

                ✔ AI helped solve 31 problems.

            </div>

        </div>

    );

}

export default AIInsights;