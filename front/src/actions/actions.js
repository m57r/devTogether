export const SET_VALUE_INPUT = 'SET_VALUE_INPUT';
export const ERROR_INPUT_VALUE = 'ERROR_INPUT_VALUE'; 
export const RESET = 'RESET';

export function getActionSetValue(name, value){
    return{
        type: SET_VALUE_INPUT, 
        payload : { name, value }
    }; 
}; 

export function getErrorSetValue(name, value){
    return{
        type: ERROR_INPUT_VALUE, 
        payload : { name, value }
    }; 
}; 

export function getActionReset(){
    return {
        type : 'RESET'
    }; 
}; 