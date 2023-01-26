import React from 'react'; 
import './ErrorMessage.scss'; 

function ErrorMessage({text}){
    return(
        <div className="errorMessage">
            {text}
        </div>
    )
}; 

export default React.memo(ErrorMessage); 