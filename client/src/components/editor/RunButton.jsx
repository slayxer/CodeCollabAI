function RunButton({

    onRun

}){

    return(

        <button

            className="run-btn"

            onClick={onRun}

        >

            ▶ Run Code

        </button>

    );

}

export default RunButton;