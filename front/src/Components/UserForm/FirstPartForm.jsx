import React, { useContext }from 'react'; 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; 
import { firstPartFormSchema } from "../../utils/formSchema";
import { getActionSetValue } from '../../actions/actions'; 
import { NavLink, useNavigate } from 'react-router-dom';
import Field from '../Field/Field'; 
import Button from '../Button/Button'; 
import { FormContext } from '../../Context/FormContext';
import { checkEmailAvailability } from '../../requests/userRequests';

function FirstPartForm(){
    
    const navigate = useNavigate(); 

    const { formUserState, formUserDispatch } = useContext(FormContext); 

    const { register, handleSubmit, setError, formState : { errors }} = useForm({
        mode : 'all', 
        criteriaMode: "all", 
        resolver : yupResolver(firstPartFormSchema,  { abortEarly: false}),
        defaultValues : formUserState
    }); 

    const onSubmit = async ( data, e ) => {
        try{
            e.preventDefault(); 
            for(let item in data){
                formUserDispatch(getActionSetValue(item, data[item])); 
            }
            
            await checkEmailAvailability(data.email); 
            navigate('/signup/2'); 
        }catch(error){
            setError('email', {type: 'manual', message : 'Email non disponible'}); 
        }
        
    }

    return(
        <form className='ui form'>
            <Field 
                text = 'Nom'
                type = 'text'
                isRequired ={ true }
                name = 'lastname'
                register = { register }
                error = { errors?.lastname?.message }
            />

            <Field 
                text = 'Prénom'
                type = 'text'
                isRequired ={ true }
                name = 'firstname'
                register = { register }
                error = { errors?.firstname?.message }
            />

            <Field
                text = 'Email'
                type = 'text'
                isRequired ={ true }
                name = 'email'
                register = { register }
                error = { errors?.email?.message }
            />

            <Field 
                text = 'Mot de passe'
                type = 'text'
                isRequired ={ true }
                register = { register }
                name = 'password'
                error = { errors?.password ? errors.password : undefined }
            />
            
            <Field 
                text = 'Confirmation du mot de passe'
                type = 'text'
                isRequired ={ true }
                register = { register }
                name = 'confirmPassword'
                error = { errors?.confirmPassword?.message }
            />

            <p className='required_information'> * champs obligatoires</p>

            <div className='SignupForm_buttons-container'>
                <Button 
                    text = "Suivant"
                    type='submit'
                    handleClick= { handleSubmit(onSubmit) }
                />                    

                <NavLink to='/login' className='link'>ou <span>se</span> connecter</NavLink>
            </div>
        </form>
    )
}

export default React.memo(FirstPartForm)
