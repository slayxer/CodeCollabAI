import "./OutputConsole.css";

function OutputConsole({ output }) {

    return (

        <div className="output-console">

            <h3>Output</h3>

            <pre>{output}</pre>

        </div>

    );

}

export default OutputConsole;