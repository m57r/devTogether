import { createContext, useEffect, useState } from 'react'; 
import { setToken } from '../requests/instance';
import { tokenVerifyToStayConnected } from '../requests/userRequests';
export const LoginContext = createContext(); 

export const LoginContextProvider = ({children}) => {
    const token = localStorage.getItem('token');
    const [ isLogged, setIsLogged ] = useState(false); 
    const [ pseudo, setPseudo ] = useState(''); 
    const [ isAvailableStatus, setIsAvailableStatus ] = useState(false); 
    const [ isMenuBurgerOpen, setIsMenuBurgerOpen ] = useState(false);  
    const [ userRole, setUserRole ] = useState(''); 

    const verifyToken = async () => {
        try{
            if (!token) {
                setIsLogged(false);
            }
            if (token) {
                setToken(token);
                const response = await tokenVerifyToStayConnected();    
                setIsLogged(true);
                setPseudo(response.pseudo);
            } else {
                setIsLogged(false);
            }
            
        }catch(error){
            console.log(error); 
        }
    }

    useEffect(()=>{
        verifyToken()
    })
    
    return(
        <LoginContext.Provider 
            value = {{
                isLogged, 
                setIsLogged, 
                pseudo, 
                setPseudo,
                isAvailableStatus, 
                setIsAvailableStatus,
                isMenuBurgerOpen,
                setIsMenuBurgerOpen
            }}>
                {children}
        </LoginContext.Provider>
    );
};