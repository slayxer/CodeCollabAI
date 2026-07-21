import "./EditorHeader.css";

function EditorHeader({

    language,
    setLanguage,
    onRun,
    onSave,
    saveStatus,
    onlineUsers = []

}) {

    return (

        <div className="editor-header">

            <div className="editor-left">

                <h2>💻 CodeCollab AI</h2>

            </div>

            <div className="editor-center">

                <select

                    value={language}

                    onChange={(e) => setLanguage(e.target.value)}

                >

                    <option value="javascript">JavaScript</option>

                    <option value="python">Python</option>

                    <option value="cpp">C++</option>

                    <option value="java">Java</option>

                </select>

                <button onClick={onRun}>
                    ▶ Run
                </button>

                <button onClick={onSave}>
                    💾 Save
                </button>

            </div>

            <div className="editor-right">

                <span className="save-status">
                    {saveStatus}
                </span>

                <div className="online-users">

                    <span className="users-icon">
                        👥
                    </span>

                    {

                        onlineUsers.map((user, index) => (

                            <div

                                key={index}

                                className="online-user"

                                title={user.user}

                            >

                                {user.user.charAt(0).toUpperCase()}

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default EditorHeader;