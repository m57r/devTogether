import React from 'react';
import ErrorFormMessage from '../Message/ErrorFormMessage/ErrorFormMessage';

import './Field.scss'; 

function Field({
    text,
    type,
    name,
    register, 
    error
}) {

    return (
        <div className={`required field ${ type === 'checkbox' && 'checkbox'} ${error && 'error' }`}>
        <div className={`field-informations-container ${ name==='password' && 'error-password' }`}>
            
            {   
                error && type === 'checkbox' &&
                < ErrorFormMessage 
                    name = { name } 
                    error = { error }
                />
            }
            
            <label>{text}</label>
            
            {
                error && type !== 'checkbox' &&
                < ErrorFormMessage 
                    name = { name } 
                    error = { error }
                />
            }

        </div>   

            {
                type === 'checkbox' ?

                    <input
                        type={type}
                        placeholder={text}
                        name={name}
                        {...register(`${name}`)}
                    />
                    :
                    <input
                        type={type}
                        placeholder={text}
                        name={name}
                        {...register(`${name}`)}
                    />
            }

        </div>
    )
}

export default React.memo(Field); 