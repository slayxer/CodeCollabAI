import { useState, useEffect, useRef} from "react";

import Editor from "@monaco-editor/react";

import "../styles/editor.css";

import EditorHeader from "../components/editor/EditorHeader";
import FileExplorer from "../components/editor/FileExplorer";
import FileTabs from "../components/editor/FileTabs";
import OutputConsole from "../components/editor/OutputConsole";
import AISidebar from "../components/ai/AISidebar";
import socket from "../socket/socket";

import { executeCode } from "../services/judge0Service";

import {
    getFiles,
    updateFile
} from "../services/projectService";

function CodeEditor() {

    const projectId = localStorage.getItem("projectId");

    const [files, setFiles] = useState([]);

    const [currentFile, setCurrentFile] = useState(null);

    const [language, setLanguage] = useState("javascript");

    const [code, setCode] = useState("");

    const [output, setOutput] = useState(
`Welcome to CodeCollab AI 🚀

Click Run to execute your code.`
    );

    const [saveStatus, setSaveStatus] = useState("Saved");
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [remoteCursors, setRemoteCursors] = useState([]);
    const [typingUser, setTypingUser] = useState("");

    const editorRef = useRef(null);

    const monacoRef = useRef(null);

    const decorationsRef = useRef([]);
    
    const username =
        JSON.parse(localStorage.getItem("user"))?.name ||
        JSON.parse(localStorage.getItem("user"))?.username ||
        "Anonymous";
    // ==========================================
    // Load Files
    // ==========================================

    useEffect(() => {

        loadFiles();

    }, []);

    const loadFiles = async () => {

        try {

            const res = await getFiles(projectId);

            setFiles(res.files || []);

            if (res.files.length > 0) {

                setCurrentFile(res.files[0]);

            }

        }

        catch (err) {

            console.error(err);

        }

    };
// ======================================
// Connect Socket
// ======================================

useEffect(() => {

    if (!projectId) return;

    if (!socket.connected) {

        socket.connect();

    }

    const user = JSON.parse(

        localStorage.getItem("user")

    );

    socket.emit(

        "join-project",

        {

            projectId,

            user: user?.name || "Anonymous"

        }

    );

    return () => {

        socket.disconnect();

    };

}, [projectId]);
    // ==========================================
    // Change Selected File
    // ==========================================

    useEffect(() => {

        if (!currentFile) return;

        setLanguage(currentFile.language || "javascript");

        setCode(currentFile.code || "");

        setSaveStatus("Saved");

    }, [currentFile]);

 // ======================================
// Receive Live Code
// ======================================

useEffect(() => {

    socket.on(

        "receive-code",

        ({ fileId, code }) => {

            if (!currentFile) return;

            if (fileId !== currentFile._id) return;

            setCode((prev) =>  {
                if (prev === code) return prev;
                return code;
            });


        }

    );

    return () => {

        socket.off("receive-code");

    };

}, [currentFile]);
    // ==========================================
    // Auto Save
    // ==========================================

    useEffect(() => {

        if (!currentFile) return;

        const timer = setTimeout(async () => {

            try {

                setSaveStatus("Saving...");

                await updateFile(

                    projectId,

                    currentFile._id,

                    {

                        name: currentFile.name,

                        language,

                        code

                    }

                );

                setSaveStatus("Saved");

            }

            catch (err) {

                console.error(err);

                setSaveStatus("Unsaved");

            }

        }, 1000);

        return () => clearTimeout(timer);

    }, [

        code,

        language,

        currentFile,

        projectId

    ]);

    // ==========================================
    // Run Code
    // ==========================================

    const handleRun = async () => {

        try {

            setOutput("⏳ Running Code...");

            const response = await executeCode(

                language,

                code

            );

            setOutput(

                response.data.output ||

                "Program executed successfully."

            );

        }

        catch (err) {

            console.error(err);

            setOutput("❌ Failed to execute code.");

        }

    };

    // ==========================================
    // Save File
    // ==========================================

    const handleSave = async () => {

        if (!currentFile) return;

        try {

            setSaveStatus("Saving...");

            await updateFile(

                projectId,

                currentFile._id,

                {

                    name: currentFile.name,

                    language,

                    code

                }

            );

            setSaveStatus("Saved");

        }

        catch (err) {

            console.error(err);

            setSaveStatus("Unsaved");

        }

    };

    // ==========================================
    // Keyboard Shortcuts
    // ==========================================

    useEffect(() => {

        const handleKeyDown = (e) => {

            if (e.ctrlKey && e.key === "s") {

                e.preventDefault();

                handleSave();

            }

            if (e.ctrlKey && e.key === "Enter") {

                e.preventDefault();

                handleRun();

            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {

            window.removeEventListener("keydown", handleKeyDown);

        };

    }, [

        code,

        language,

        currentFile

    ]);

    // ==========================================
    //Socket Typing Indicator
    // ==========================================

    useEffect(() => {

    socket.on("user-typing", (user) => {

        setTypingUser(user);

        setTimeout(() => {

            setTypingUser("");

        }, 1000);

    });

    return () => {

        socket.off("user-typing");

    };

}, []);
// ==========================================
// Online Users
// ==========================================

useEffect(() => {

    const updateUsers = (users) => {

        setOnlineUsers(users);

    };

    socket.on(

        "users-update",

        updateUsers

    );

    return () => {

        socket.off(

            "users-update",

            updateUsers

        );

    };

}, []);
// ==========================================
// Remote Cursor Updates
// ==========================================

useEffect(() => {

    socket.on("receive-cursor", (data) => {

        setRemoteCursors((prev) => {

            const others = prev.filter(

                cursor => cursor.user !== data.user

            );

            return [

                ...others,

                data

            ];

        });

    });

    return () => {

        socket.off("receive-cursor");

    };

}, []);
// ==========================================
// Draw Remote Cursors
// ==========================================

useEffect(() => {

    if (!editorRef.current || !monacoRef.current) return;

    const decorations = remoteCursors.map((cursor) => ({

        range: new monacoRef.current.Range(

            cursor.position.lineNumber,

            cursor.position.column,

            cursor.position.lineNumber,

            cursor.position.column

        ),

        options: {

            className: "remote-cursor",

            hoverMessage: {

                value: cursor.user

            }

        }

    }));

    editorRef.current.deltaDecorations(

        [],

        decorations

    );

}, [remoteCursors]);



    return (

        <div className="editor-page">

            <FileExplorer

                projectId={projectId}

                currentFile={currentFile}

                setCurrentFile={setCurrentFile}

                refreshFiles={loadFiles}

            />

            <div className="editor-main">

                <EditorHeader

                    language={language}

                    setLanguage={setLanguage}

                    onRun={handleRun}

                    onSave={handleSave}

                    saveStatus={saveStatus}

                    onlineUsers={onlineUsers}

                />

                <FileTabs

                    files={files}

                    currentFile={currentFile}

                    setCurrentFile={setCurrentFile}

                />

                <div className="editor-wrapper">


                {
                typingUser && (

                <div className="typing-indicator">

                {typingUser} is typing...

                </div>

                )
                }
                    <Editor
                        height="100%"
                        width="100%"
                        language={language}
                        theme="vs-dark"
                        value={code}

                    

                        

                

                        onChange={(value) => {

                            const updatedCode = value || "";

                            setCode(updatedCode);

                            setSaveStatus("Unsaved");

                            if (currentFile) {

                                socket.emit("code-change", {

                                    projectId,

                                    fileId: currentFile._id,

                                    code: updatedCode

                                });

                            }

                            socket.emit("typing", {

                                projectId,

                                user: username

                            });

                        }}

                        options={{

                            fontSize: 16,

                            minimap: {

                                enabled: false

                            },

                                automaticLayout: true,

                                scrollBeyondLastLine: false,

                                wordWrap: "on",

                                smoothScrolling: true,

                                tabSize: 4

                        }}
                    />

                
                </div>

                <OutputConsole

                    output={output}

                />

            </div>

            <AISidebar

                code={code}

            />

        </div>

    );

}

export default CodeEditor;