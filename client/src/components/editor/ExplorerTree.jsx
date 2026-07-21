import ExplorerItem from "./ExplorerItem";

function ExplorerTree({

    files,

    parent,

    expandedFolders,

    setExpandedFolders,

    currentFile,

    setCurrentFile,

    openContextMenu

}) {

    const toggleFolder = (folderId) => {

        setExpandedFolders((prev) =>

            prev.includes(folderId)

                ? prev.filter((id) => id !== folderId)

                : [...prev, folderId]

        );

    };

    return (

        <>

            {

                files

                    .filter((item) => item.parent === parent)

                    .map((item) => (

                        <ExplorerItem

                            key={item._id}

                            item={item}

                            files={files}

                            expandedFolders={expandedFolders}

                            toggleFolder={toggleFolder}

                            currentFile={currentFile}

                            setCurrentFile={setCurrentFile}

                            openContextMenu={openContextMenu}

                            renderChildren={() => (

                                <ExplorerTree

                                    files={files}

                                    parent={item._id}

                                    expandedFolders={expandedFolders}

                                    setExpandedFolders={setExpandedFolders}

                                    currentFile={currentFile}

                                    setCurrentFile={setCurrentFile}

                                    openContextMenu={openContextMenu}

                                />

                            )}

                        />

                    ))

            }

        </>

    );

}

export default ExplorerTree;