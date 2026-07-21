import "./FileTabs.css";

function FileTabs({

    files = [],

    currentFile,

    setCurrentFile

}) {

    return (

        <div className="file-tabs">

            {files.map((file) => (

                <button

                    key={file._id}

                    className={
                        currentFile?._id === file._id
                            ? "tab active"
                            : "tab"
                    }

                    onClick={() => setCurrentFile(file)}

                >

                    {file.name}

                </button>

            ))}

        </div>

    );

}

export default FileTabs;