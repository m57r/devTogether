import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
                < ErrorMessage 
                    name = { name } 
                    error = { error }
                />

            }
            
            <label>{text}</label>
            {
                error && type !== 'checkbox' &&
                < ErrorMessage 
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