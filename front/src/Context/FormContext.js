import { createContext } from 'react'; 
import { formInitialState, useFormReducer } from "../reducer/useSignupFormReducer" ; 

export const FormContext = createContext(formInitialState); 

export const FormContextProvider = ({children}) => {

    const { formState, formDispatch } = useFormReducer(); 

    return(
        <FormContext.Provider value = { { formState, formDispatch } }>
            {children}
        </FormContext.Provider>
    )
}