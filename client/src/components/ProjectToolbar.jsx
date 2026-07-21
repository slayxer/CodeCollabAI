import "./ProjectToolbar.css";

function ProjectToolbar({

    onCreate,

    search,

    setSearch

}){

    return(

        <div className="project-toolbar">

            <input

                placeholder="Search projects..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <button onClick={onCreate}>

                + New Project

            </button>

        </div>

    );

}

export default ProjectToolbar;