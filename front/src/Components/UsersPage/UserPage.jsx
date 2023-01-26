import React, { useContext } from 'react'; 
import DatasPage from '../DatasPage/DatasPage';
import Page404 from '../Page404/Page404'; 
import { LoginContext } from '../../Context/LoginContext'; 

function UsersPage(){

    const { isLogged } = useContext(LoginContext);

    return(
        isLogged ? <DatasPage/> : <Page404/>
    )
}

export default React.memo(UsersPage); 