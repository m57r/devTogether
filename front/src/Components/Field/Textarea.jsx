import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Textarea({
    isRequired,
    text, 
    name, 
    rows, 
    register, 
    error
}){
    

    return(
       
            <div className={`${isRequired  ? 'required field' : ''} ${error && 'error'}`}>
                <label>{ `${name[0].toUpperCase()}${name.slice(1)}` }</label> 
                {
                error &&  
                < ErrorMessage 
                    name = { name } 
                    error = { error }
                />

            }
                <textarea
                    rows = { rows } 
                    placeholder={ text } 
                    { ...register(name)}
                    name={ name } 
                />
         
            </div>
    )
}

export default React.memo(Textarea); 