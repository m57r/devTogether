import React from 'react';
import { Link } from 'react-router-dom';
import Video from "../Video/Video";
import FirstPartForm from './FirstPartForm';
import SecondPartForm from "./SecondPartForm";

import './UserForm.scss';

function UserForm({
    page
}) {

    return (
        < div className='SignupPage'>
            <Video />
            <div className='SignupForm'>

                <Link to='/' className='SignupForm_logo'>
                    <h1><span>DEV'</span><br />TOGETHER</h1>
                </Link>

                <h2 className='SignupForm_title'>inscription<Link to='/login' className='link'>Ou connexion</Link></h2>

                <div>
                    {
                        page === 1 ?
                            <FirstPartForm />
                            :
                            <>

                            <SecondPartForm 
                                formType = 'signup'
                            />
                            </>
                            
                    }
                </div>

            </div>
        </div>
    )
}

export default React.memo(UserForm); 