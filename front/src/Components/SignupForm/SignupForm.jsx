import { Link } from 'react-router-dom';
import Nav from "../Nav/Nav";
import Video from "../Video/Video";
import FirstPartForm from './FirstPartForm';
import SecondPartForm from "../SignupForm/SecondPartForm";

import './SignupForm.scss'; 

function SignupForm({
    page
}){

    return(
        < div className='SignupPage'>
            <Video/>
            <div className ='SignupForm'>

                <Link to='/' className='SignupForm_logo'>
                    <h1><span>DEV'</span><br />TOGETHER</h1>
                </Link>

                <h2 className= 'SignupForm_title'>inscription<Link to='/login' className='link'>Ou connexion</Link></h2>
            
                <Nav/>

                <form className='ui form'>
                    {
                        page === 1 ? 
                        <FirstPartForm/>
                        : 
                        <SecondPartForm/>
                    }
                </form>

            </div>
        </div> 
    )
}

export default SignupForm; 