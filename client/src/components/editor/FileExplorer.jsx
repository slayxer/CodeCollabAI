import { useEffect, useState } from "react";

import {
    FaPlus,
    FaFolderPlus
} from "react-icons/fa";

import {
    getFiles,
    createFile,
    createFolder,
    renameFile,
    removeFile
} from "../../services/projectService";

import ExplorerTree from "./ExplorerTree";
import ContextMenu from "./ContextMenu";
import socket from "../../socket/socket";
import "./FileExplorer.css";

function FileExplorer({

    projectId,

    currentFile,

    setCurrentFile

}) {

    const [files, setFiles] = useState([]);

    const [expandedFolders, setExpandedFolders] = useState(["root"]);

    const [creating, setCreating] = useState(false);

    const [createType, setCreateType] = useState("file");

    const [parentFolder, setParentFolder] = useState("root");

    const [newName, setNewName] = useState("");

    const [contextMenu, setContextMenu] = useState(null);

    const [selectedItem, setSelectedItem] = useState(null);

    // ===============================
    // Load Files
    // ===============================

    useEffect(() => {

        if (projectId) {

            loadFiles();

        }

    }, [projectId]);

    // ===============================
    // Close Context Menu
    // ===============================

    useEffect(() => {

        const closeMenu = () => {

            setContextMenu(null);

        };

        window.addEventListener("click", closeMenu);

        return () => {

            window.removeEventListener("click", closeMenu);

        };

    }, []);

    // ===============================
    // Load Files
    // ===============================

    const loadFiles = async () => {

        try {

            const res = await getFiles(projectId);

            setFiles(res.files || []);

        }

        catch (err) {

            console.error(err);

        }

    };

    // ===============================
    // Create File
    // ===============================

    const handleCreateFile = (parent = "root") => {

        setCreating(true);

        setCreateType("file");

        setParentFolder(parent);

        setNewName("");

    };

    // ===============================
    // Create Folder
    // ===============================

    const handleCreateFolder = (parent = "root") => {

        setCreating(true);

        setCreateType("folder");

        setParentFolder(parent);

        setNewName("");

    };

    // ===============================
    // Finish Create
    // ===============================

    const finishCreate = async () => {

        if (!newName.trim()) {

            setCreating(false);

            setNewName("");

            return;

        }

        try {

            if (createType === "file") {

                await createFile(projectId, {

                    name: newName,

                    parent: parentFolder,

                    language: "javascript",

                    code: ""

                });

            }

            else {

                await createFolder(projectId, {

                    name: newName,

                    parent: parentFolder

                });

            }

            await loadFiles();
            socket.emit("file-created", { projectId });

        }

        catch (err) {

            console.error(err);

        }

        setCreating(false);

        setNewName("");

    };

 // =====================================
// Rename File / Folder
// =====================================

const handleRename = async (item) => {

    const newName = prompt(
        "Enter new name",
        item.name
    );

    if (!newName?.trim()) return;

    try {

        await renameFile(
            projectId,
            item._id,
            newName
        );

        await loadFiles();
        socket.emit("file-renamed", { projectId });

    } catch (err) {

        console.error(err);

        alert("Failed to rename");

    }

};

// =====================================
// Delete File / Folder
// =====================================

const handleDelete = async (item) => {

    const confirmDelete = window.confirm(
        `Delete "${item.name}" ?`
    );

    if (!confirmDelete) return;

    try {

        await removeFile(
            projectId,
            item._id
        );

        if (currentFile?._id === item._id) {

            setCurrentFile(null);

        }

        await loadFiles();
        socket.emit("file-deleted", { projectId });

    } catch (err) {

        console.error(err);

        alert("Failed to delete");

    }

};
    // ===============================
    // Context Menu
    // ===============================

    const openContextMenu = (e, item) => {

        e.preventDefault();

        e.stopPropagation();

        setSelectedItem(item);

        setContextMenu({

            x: e.clientX,

            y: e.clientY

        });

    };
    // ======================================
    // Live File Explorer Refresh
    // ======================================

    useEffect(() => {

        const refreshFiles = () => {

            loadFiles();

        };

        socket.on(

            "refresh-files",

            refreshFiles

        );

        return () => {

            socket.off(

                "refresh-files",

                refreshFiles

            );

        };

    }, []);

    return (

        <>

            <div className="file-explorer">

                <div className="explorer-header">

                    <h3>

                        Explorer

                    </h3>

                    <div>

                        <button

                            onClick={() => handleCreateFile()}

                        >

                            <FaPlus />

                        </button>

                        <button

                            onClick={() => handleCreateFolder()}

                        >

                            <FaFolderPlus />

                        </button>

                    </div>

                </div>

                <div className="explorer-tree">

                    <ExplorerTree

                        files={files}

                        parent="root"

                        expandedFolders={expandedFolders}

                        setExpandedFolders={setExpandedFolders}

                        currentFile={currentFile}

                        setCurrentFile={setCurrentFile}

                        openContextMenu={openContextMenu}

                    />

                    {

                        creating && (

                            <div className="new-item">

                                <input

                                    autoFocus

                                    value={newName}

                                    placeholder={

                                        createType === "file"

                                            ? "File name"

                                            : "Folder name"

                                    }

                                    onChange={(e) =>

                                        setNewName(e.target.value)

                                    }

                                    onBlur={finishCreate}

                                    onKeyDown={(e) => {

                                        if (e.key === "Enter") {

                                            finishCreate();

                                        }

                                        if (e.key === "Escape") {

                                            setCreating(false);

                                            setNewName("");

                                        }

                                    }}

                                />

                            </div>

                        )

                    }

                </div>

            </div>

           <ContextMenu

             contextMenu={contextMenu}

             selectedItem={selectedItem}

             handleCreateFile={handleCreateFile}

             handleCreateFolder={handleCreateFolder}

            onRename={handleRename}

            onDelete={handleDelete}

            closeMenu={() => setContextMenu(null)}

            />

        </>

    );

}

export default FileExplorer;