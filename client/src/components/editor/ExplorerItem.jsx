import {
    FaFolder,
    FaFolderOpen,
    FaFileCode
} from "react-icons/fa";

function ExplorerItem({

    item,

    expandedFolders,

    toggleFolder,

    currentFile,

    setCurrentFile,

    openContextMenu,

    renderChildren

}) {

    // ===========================
    // Folder
    // ===========================

    if (item.type === "folder") {

        const isOpen = expandedFolders.includes(item._id);

        return (

            <div>

                <div

                    className="folder-item"

                    onClick={() => toggleFolder(item._id)}

                    onContextMenu={(e) => openContextMenu(e, item)}

                >

                    {

                        isOpen

                            ? <FaFolderOpen className="folder-icon"/>

                            : <FaFolder className="folder-icon"/>

                    }

                    <span>

                        {item.name}

                    </span>

                </div>

                {

                    isOpen && (

                        <div className="folder-children">

                            {renderChildren()}

                        </div>

                    )

                }

            </div>

        );

    }

    // ===========================
    // File
    // ===========================

    return (

        <div

            className={

                currentFile?._id === item._id

                    ? "file-item active"

                    : "file-item"

            }

            onClick={() => setCurrentFile(item)}

            onContextMenu={(e) => openContextMenu(e, item)}

        >

            <FaFileCode className="file-icon"/>

            <span>

                {item.name}

            </span>

        </div>

    );

}

export default ExplorerItem;