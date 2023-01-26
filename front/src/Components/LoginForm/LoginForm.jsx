import React, { useState, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup'; 
import { loginRequest } from '../../requests/userRequests'; 
import { setToken } from '../../requests/instance';
import { LoginContext } from '../../Context/LoginContext';
import Field from '../Field/Field'; 
import Button from '../Button/Button'; 
import './LoginForm.scss'; 


function LoginForm(){

    const navigate = useNavigate()
    const { setIsLogged } = useContext(LoginContext);
    const [ error, setError ] = useState(''); 

    const loginSchema = yup.object().shape({
        email : yup.string().email('Veuillez saisir un email valide.').required('Veuillez saisir un email valide.'), 
        loginPassword : yup.string().required('Veuillez saisir un mot de passe :')
    }); 

    const { register, handleSubmit, formState : { errors }} = useForm({
        mode : 'all', 
        criteriaMode: "all", 
        resolver : yupResolver(loginSchema, { abortEarly: false}),
    }); 

    const handleSubmitLoginForm = async(data, e) => {
        try{
            e.preventDefault(); 
            const response = await loginRequest(data.email, data.loginPassword); 
            setToken(response.token); 
            localStorage.setItem('token', response.token); 
            setIsLogged(true); 
            navigate('/users'); //TO DO: redirection vers page profil  
        }catch(error){
            console.log(error.message); 
            setError('La connexion a échouée : email ou mot de passe invalide');
        }
    }

    return(

        <div className ='LoginForm'>

            <Link to='/' className='LoginForm_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </Link>

            <h2 className= 'LoginForm_title'>connexion</h2>

            { error && 
                <div className="LoginForm_error-message">
                    <i className="close icon" onClick={() => setError(false)}></i>
                    <p>{ error }</p>
                </div>
            } 

            <form className='ui form'>
                
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
                    type = 'password'
                    isRequired ={ true }
                    name = 'loginPassword'
                    register = { register }
                    error = { errors?.loginPassword?.message }
                />

                <div className='LoginForm_buttons-container'>
                    <Button 
                        text = 'Se connecter'
                        type = 'submit'
                        handleClick= { handleSubmit(handleSubmitLoginForm) }
                    />

                    <Link to='/signup' className='link'>ou <span>s'inscrire</span></Link>
                </div>
                <Link className='LoginForm_forget-password'>Mot de passe oublié ?</Link>
            </form>
        
        </div>

       
    )
}

export default React.memo(LoginForm); 

