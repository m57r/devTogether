import React from 'react'; 
import './ErrorMessage.scss'; 

function ErrorMessage({
    error,
    name, 
}){
    return(
        name !== 'password' ? 
        <div className="message"> { error }</div>
        : 
        <div className="message message-password"> {error.message} 
        {  error.types.matches && typeof(error.types.matches) !== "string" ?
            <ul>
                {
                    error.types.matches?.map((item, index) => (
                        <li key={index}>{ item }</li>
                    ))
                }
            </ul>       
        :
            error.types.matches
        }
            
        </div>

    )
}; 

export default React.memo(ErrorMessage)