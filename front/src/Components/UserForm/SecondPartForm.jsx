import React,  { useContext, useState } from 'react'; 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Controller } from 'react-hook-form'; 
import Select from 'react-select'; 
import colorStyles from '../../utils/colorStyles'; 
import { Link, useNavigate } from 'react-router-dom';
import { getActionSetValue } from '../../actions/actions'; 
import { secondPartFormSchema } from "../../utils/formSchema";
import Field from '../Field/Field';
import Textarea from '../Field/Textarea'; 
import Button from '../Button/Button';
import ErrorFormMessage from '../Message/ErrorFormMessage/ErrorFormMessage';
import Modal from '../Message/Modal/Modal';
import { FormContext } from "../../Context/FormContext"; 
import { TechnologiesByCategoryContext } from '../../Context/TechnologiesByCategoryContext';
import { signupRequest } from '../../requests/userRequests';

import './SecondPartForm.scss'; 

function SecondPartForm({
    formType,
}) {
    const { formUserState, formUserDispatch } = useContext(FormContext); 
    const { groupedOptions, specialities } = useContext(TechnologiesByCategoryContext); 
    const [ isSuccess, setSuccess ] = useState(false); 
    
    const { register, handleSubmit, control, formState : { errors }} = useForm({
        mode : 'all', 
        criteriaMode: "all", 
        resolver : yupResolver( secondPartFormSchema,  { abortEarly: false}),
        defaultValues : {
            description : formUserState.description,
            speciality : formUserState.speciality, 
            privacy_policy : formUserState.privacy_policy, 
            general_conditions : formUserState.general_conditions,
            technologies : formUserState.technologies
        }
    }); 

    const navigate = useNavigate(); 

    const handleClick = (data) => {
        for(let item in data){ 
            if(item === 'technologies'){
                const technologies = data.technologies.map(item => Number(item.value)); 
                formUserDispatch(getActionSetValue(item, technologies)); 
            }
            formUserDispatch(getActionSetValue(item, data[item])); 
        }
        navigate('/signup')
        
    }
    
    const onSubmit = async (data) => {
        try{
            for(let item in data){ 
                if(item === 'technologies'){
                    const technologies = data.technologies.map(item => Number(item.value)); 
                    formUserDispatch(getActionSetValue(item, technologies)); 
                }
                formUserDispatch(getActionSetValue(item, data[item])); 
            }

            if(formType === 'signup'){
                await signupRequest(
                    formUserState.firstname,
                    formUserState.lastname, 
                    formUserState.email,
                    formUserState.password, 
                    formUserState.confirmPassword, 
                    data.description, 
                    data.speciality.value, 
                    data.technologies.map(item => Number(item.value)),
                    data.general_conditions, 
                    data.privacy_policy
                )
                setSuccess(true); 
            }

        }catch(error){
            console.log(error); 
        }
       
    }

    if(isSuccess){
        setTimeout(() => {
            navigate('/login'); 
        }, "3000");
    }

    return (
    <>
        { isSuccess && 
            < Modal 
                type = { 'sucess' }
                text = { formType === 'signup' ? 'Votre compte a été créé, vous pouvez vous connecter.' : 'Vos informations ont bien été modifiées' }
            />
        }

        <form className='ui form' onSubmit={ handleSubmit(onSubmit) }>
            <div className="required field">
                <label>Spécialité</label>

                {
                    errors?.speciality &&  
                    < ErrorFormMessage 
                        name = 'speciality'
                        error = { errors?.speciality?.name?.message }
                    />
                }

                <Controller
                    name="speciality"
                    control={ control }
                    render={({ field }) => 
                    <Select 
                        {...field } 
                        placeholder="Votre spécialité"
                        options={ specialities }
                        styles = { colorStyles } 
                        defaultValue = { formUserState.speciality }
                    />}
                />

            </div>
         
                <Textarea
                    isRequired = {true}
                    rows={5} 
                    name = 'description' 
                    text="Dites en plus sur vous ! Un profil avec une desciption a plus de visibilité. "
                    register = { register }
                    error = { errors?.description?.message }
                />
             
            <div className="required field SignupForm_technologies">
                <label className='SignupForm_technologies_title'>Quelles sont les technologies que vous maîtrisez ? </label>
                
                {
                    errors?.technologies &&  
                    < ErrorFormMessage 
                        name = 'technologies'
                        error = { errors?.technologies?.message }
                    />
                }

                <Controller
                    name="technologies"
                    control={ control }
                    render={({ field } ) => 
                    <Select 
                        {...field} 
                        placeholder="Vos technologies"
                        options={ groupedOptions }
                        styles = { colorStyles } 
                        isMulti
                        defaultValue = { formUserState.technologies }
                    />}
                />
            </div>
            
            <div className='SignupForm_checkbox-required'>
                <div className="required inline field">
                    <Field 
                        isRequired={true}
                        type = 'checkbox'
                        name = 'general_conditions'
                        text = "J'accepte les conditions générales"
                        register = { register }
                        error = { errors.general_conditions?.message }
                    />
                </div>
            
                <div className="required inline field">
                    <Field 
                        isRequired={true}
                        type = 'checkbox'
                        name = 'privacy_policy'
                        text = "J'accepte la politique de confidentialité relative au traitement de mes données personnelles"
                        register = { register }
                        error = { errors.privacy_policy?.message }
                    />
                </div>
            </div>

            <p className='required_information'> * champs obligatoires</p>

            <div className='SignupForm_buttons-container'>
                <Link to='/signup'>
                <button className='next-button' type='submit' onClick= { handleSubmit(handleClick) }> 
                    Précédent
                </button>
                   
                </Link>
                
                <Button
                    text="S'inscrire"
                    type='submit'
                    handleClick= { handleSubmit(onSubmit) }
                />
                
                <Link to='/login' className='link'>ou <span>se</span> connecter</Link>
            </div>
        </form>
    </>
    )
}

export default React.memo(SecondPartForm)