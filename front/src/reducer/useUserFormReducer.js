import { useReducer } from 'react'; 
import { SET_VALUE_INPUT, RESET } from '../actions/actions';

//initial state
export const formInitialState = {
    firstname: '', 
    lastname : '', 
    email : '', 
    password : '', 
    confirmPassword : '',
    general_conditions : false, 
    privacy_policy : false, 
    speciality : '', 
    description : '', 
    technologies : [],
    isFormValid : false, 
}; 

//reducer
export function formReducer(oldState, action){
    switch(action.type){
       case SET_VALUE_INPUT : {
           return {
               ...oldState,
               [action.payload.name] : action.payload.value
           }
       }

       case RESET : {
           return formInitialState
       }

       default: 
            throw new Error (`No case for type ${action.type}  found in useSignuReducer`); 
    }; 
}; 

export function useFormReducer(){
    const [ formUserState, formUserDispatch ] = useReducer(formReducer, formInitialState ); 
    return {
        formUserState, formUserDispatch
    }; 
}
