import React from 'react'; 
import Video from "../Video/Video";
import LoginForm from "../LoginForm/LoginForm";

import './LoginPage.scss'; 

function LoginPage(){
    return(
         < div className='LoginPage'>
                <Video />
                <LoginForm />
        </div>
    )
}

export default React.memo(LoginPage); 