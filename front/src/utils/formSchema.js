import * as yup from 'yup'; 

export const firstPartFormSchema = yup.object().shape({
    lastname : yup.string().trim('Veuillez saisir un nom.').required('Veuillez saisir un nom.'),
    firstname : yup.string().trim().required('Veuillez saisir un prénom.'),
    email : yup.string().email('Veuillez saisir un email valide.').required('Veuillez saisir un email valide.'), 
    password : yup.string()
        .required('Veuillez saisir un mot de passe :')
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
        .matches(/[a-z]+/, 'Il doit contenir au moins 1 minuscule.')
        .matches(/[A-Z]+/, 'Il doit contenir au moins 1 majuscule.')
        .matches(/\d+/, 'Il doit contenir au moins 1 chiffre.')
        .matches(/[!@#$%^&*()-+]+/,  'Il doit contenir au moins 1 caractère spéciale.'), 
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'Les mots de passe ne sont pas identiques.').required('Les mots de passe ne sont pas identiques.'), 
}); 

export const secondPartFormSchema = yup.object().shape({
    speciality : yup.object().shape({
       value : yup.string().trim().required('Veuillez saisir une spécialité.'),
       color: yup.string().trim().required('Veuillez saisir une spécialité.'),
       label: yup.string().trim().required('Veuillez saisir une spécialité.'),
       name: yup.string().trim().required('Veuillez saisir une spécialité.'),
    }),
    description : yup.string().trim().min(20, "Veuillez saisir une description d'au moins 0 caractères.").required("Veuillez saisir une description d'au moins 20 caractères."), 
    technologies : yup.array().min(1, 'Veuillez choisir au moins une technologie.').required('Veuillez choisir au moins une technologie.'),
    general_conditions : yup.bool().oneOf([true], 'Veuillez accepter les conditions générales.').required(), 
    privacy_policy: yup.bool().oneOf([true], 'Veuillez accepter la politique de confidentialité.').required(), 
}); 


export const userSchema = yup.object().shape({
    lastname : yup.string().trim('Veuillez saisir un nom.').required('Veuillez saisir un nom.'),
    firstname : yup.string().trim().required('Veuillez saisir un prénom.'),
    email : yup.string().email('Veuillez saisir un email valide.').required('Veuillez saisir un email valide.'), 
    password : yup.string()
        .required('Veuillez saisir un mot de passe :')
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
        .matches(/[a-z]+/, 'Il doit contenir au moins 1 minuscule.')
        .matches(/[A-Z]+/, 'Il doit contenir au moins 1 majuscule.')
        .matches(/\d+/, 'Il doit contenir au moins 1 chiffre.')
        .matches(/[!@#$%^&*()-+]+/,  'Il doit contenir au moins 1 caractère spéciale.'), 
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'Les mots de passe ne sont pas identiques.').required('Les mots de passe ne sont pas identiques.'), 
    speciality : yup.object().shape({
       value : yup.string().trim().required('Veuillez saisir une spécialité.'),
       color: yup.string().trim().required('Veuillez saisir une spécialité.'),
       label: yup.string().trim().required('Veuillez saisir une spécialité.'),
       name: yup.string().trim().required('Veuillez saisir une spécialité.'),
    }),
    description : yup.string().trim().min(30, "Veuillez saisir une description d'au moins 30 caractères.").required("Veuillez saisir une description d'au moins 20 caractères."), 
    technologies : yup.array().min(1, 'Veuillez choisir au moins une technologie.').required('Veuillez choisir au moins une technologie.'),
    general_conditions : yup.bool().oneOf([true], 'Veuillez accepter les conditions générales.').required(), 
    privacy_policy: yup.bool().oneOf([true], 'Veuillez accepter la politique de confidentialité.').required(), 
}); 