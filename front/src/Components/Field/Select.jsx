import React from 'react'; 
import Select from 'react-select'; 
import colorStyles from '../SignupForm/colorStyles'; 
import useFieldError from '../../Validations/UseFieldError';

function SelectComponent({
    placeholder, 
    options, 
    multiOptions, 
    onChange, 
    name, 
    defaultValue 
}){
    
    const { error, validateField } = useFieldError();

    const handleChange = (selectedOptions) => {
        console.log(selectedOptions); 
        if(selectedOptions.length){
            let technologies = []
            for (let item of selectedOptions) {
                technologies.push(Number(item.value))
            }
            onChange('technologies', technologies)
            validateField(technologies, 'technologies'); 
            console.log(error); 
        }else{
            onChange(selectedOptions.name, selectedOptions.value)
        }

    }

   return( 
    <>
        {
            error && <p>{error}</p>
        }

        <Select  
            placeholder= { placeholder}
            options={ options }
            onChange={ handleChange }
            styles = { colorStyles } 
            isMulti = { multiOptions ? true : false}
            name={ name }
            defaultValue = {defaultValue || null}
        />
    </>
   )
}

export default React.memo(SelectComponent); 