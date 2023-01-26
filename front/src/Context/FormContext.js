import { createContext } from 'react'; 
import { formInitialState, useFormReducer } from "../reducer/useUserFormReducer" ; 

export const FormContext = createContext(formInitialState); 

export const FormContextProvider = ({children}) => {

    const { formUserState, formUserDispatch } = useFormReducer(); 

    return(
        <FormContext.Provider value = { { formUserState, formUserDispatch } }>
            {children}
        </FormContext.Provider>
    )
}