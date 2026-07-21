import {

    FaPlus,

    FaFolderPlus,

    FaPen,

    FaTrash

} from "react-icons/fa";

function ContextMenu({

    contextMenu,

    selectedItem,

    handleCreateFile,

    handleCreateFolder,

    onRename,

    onDelete,

    closeMenu

}) {

    if (!contextMenu) return null;

    return (

        <div

            className="context-menu"

            style={{

                top: contextMenu.y,

                left: contextMenu.x

            }}

        >

            <div

                className="context-item"

                onClick={() => {

                    handleCreateFile(

                        selectedItem?.type === "folder"

                            ? selectedItem._id

                            : selectedItem?.parent || "root"

                    );

                    closeMenu();

                }}

            >

                <FaPlus />

                <span>

                    New File

                </span>

            </div>

            <div

                className="context-item"

                onClick={() => {

                    handleCreateFolder(

                        selectedItem?.type === "folder"

                            ? selectedItem._id

                            : selectedItem?.parent || "root"

                    );

                    closeMenu();

                }}

            >

                <FaFolderPlus />

                <span>

                    New Folder

                </span>

            </div>

            <div

                className="context-item"

                onClick={() => {

                    onRename(selectedItem);

                    closeMenu();

                }}

            >

                <FaPen />

                <span>

                    Rename

                </span>

            </div>

            <div

                className="context-item delete"

                onClick={() => {

                    onDelete(selectedItem);

                    closeMenu();

                }}

            >

                <FaTrash />

                <span>

                    Delete

                </span>

            </div>

        </div>

    );

}

export default ContextMenu;