function LanguageSelector({

    language,

    setLanguage

}){

    return(

        <select

            value={language}

            onChange={(e)=>setLanguage(e.target.value)}

            className="language-selector"

        >

            <option value="javascript">

                JavaScript

            </option>

            <option value="python">

                Python

            </option>

            <option value="java">

                Java

            </option>

            <option value="cpp">

                C++

            </option>

            <option value="c">

                C

            </option>

        </select>

    );

}

export default LanguageSelector;