import { useState } from 'react'; 
import * as yup from 'yup'; 


const useFieldError = () => {

    const [ error , setError ] = useState(null); 

    const getSchema = ( name ) => {
        let schema

        if(name === 'lastname' || name === 'firstname' || name === 'speciality' ){
            console.log('ici'); 
            schema = yup.string().trim( `Veuillez saisir un ${ name !== 'speciality' ? `un ${name}` : 'une spécialité' }`); 
        }else if(name === 'description'){
            schema = yup.string().trim().min(30, "Veuillez saisir une decription (30 caractères minimum)").required(null); 
        }else if(name === 'email'){
            schema = yup.string().email('Veuillez saisir un email valide.').required('Veuillez saisir un email valide.');  
        }else if(name === 'password'){
            schema = yup.string()
            .required('Veuillez saisir un mot de passe.')
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
            .matches(/[a-z]+/, 'Le mot de passe doit contenir au moins 1 minuscule.')
            .matches(/[A-Z]+/, 'Le mot de passe doit contenir au moins 1 majuscule.')
            .matches(/\d+/, 'Le mot de passe doit contenir au moins 1 chiffre.')
            .matches(/[!@#$%^&*()-+]+/,  'Le mot de passe doit contenir au moins 1 caractère spéciale.'); 
        }else if(name === 'confirmPassword'){
            schema = yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe ne sont pas identiques.').required(null); 
        }else if(name === 'technologies'){
            console.log('technologies'); 
            schema = yup.array().min(1, 'Veuillez choisir au moins une technologie.').required('Veuillez choisir au moins une technologie.')
        }else if(name === 'general_conditions' || name === 'privacy_policy'){
            schema =yup.bool().oneOf([true], `Veuillez accepter ${ name === 'general_conditions ' ? 'les conditions générales.' : 'la politique de confidentialité.'}`).required();
        }else if(name === 'technologies'){
            schema = yup.array().min(1, 'Veuillez choisir au moins une technologie.').required();
        }

        return schema; 
    }

    const validateField = async (name, value) => {
        try{
            let schema = getSchema(name); 
            if(schema){
                const result = await schema.validate( value, { abortEarly: false })
                !result.errors && setError(null)
            }else{
                setError(null); 
            }
        }catch(error){
            console.log(error.errors); 
            setError(error.errors); 
        }
    } 

    return {
        error, 
        validateField
    }
   
}

export default useFieldError; 

// export const userSchema = yup.object().shape({
//     confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required({ name : 'confirmPasswordError', value : 'Les mots de passe ne sont pas identiques.'}), 
//     technologies : yup.array().min(1, { name : 'technologiesError', value:'Veuillez choisir au moins une technologie.'}).required(),
//     general_conditions : yup.bool().oneOf([true], { name : 'generalConditionsError', value:'Veuillez accepter les conditions générales.'}).required(), 
//     privacy_policy: yup.bool().oneOf([true], { name: 'privacyPolicyError', value : 'Veuillez accepter la politique de confidentialité.'} ).required(), 
// }); 

// export const userSchema = yup.object().shape({
//     lastname : yup.string().trim({ name : 'lastnameError', value : 'Veuillez saisir un nom.'}).required({ name : 'lastnameError', value : 'Veuillez saisir un nom.'}),
//     firstname : yup.string().trim().required({ name : 'firstnameError', value : 'Veuillez saisir un prénom.'}),
//     email : yup.string().email({ name : 'emailError', value : 'Veuillez saisir un email valide.'}).required({ name : 'emailError', value : 'Veuillez saisir un email valide.'}), 
//     password : yup.string().required({ name : 'passwordError', value : 'Veuillez saisir un mot de passe.'}),
//     confirmPassword: yup.string().oneOf([yup.ref("password"), null], { name : 'confirmPasswordError', value : 'Les mots de passe ne sont pas identiques.'}).required({ name : 'confirmPasswordError', value : 'Les mots de passe ne sont pas identiques.'}), 
//     speciality: yup.string().trim().required({ name : 'specialityError', value : 'Veuillez saisir une spécialité.'}), 
//     description : yup.string().trim().min(20, { name : 'descriptionError', value : "Veuillez saisir une description d'au moins 20 caractères"}).required({ name : 'descriptionError', value : "Veuillez saisir une description d'au moins 20 caractères"}), 
//     technologies : yup.array().min(1, { name : 'technologiesError', value:'Veuillez choisir au moins une technologie.'}).required(),
//     general_conditions : yup.bool().oneOf([true], { name : 'general_conditionsError', value:'Veuillez accepter les conditions générales.'}).required(), 
//     privacy_policy: yup.bool().oneOf([true], { name: 'privacy_policyError', value : 'Veuillez accepter la politique de confidentialité.'} ).required(), 
// }); 
