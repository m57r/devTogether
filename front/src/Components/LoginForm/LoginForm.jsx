import { NavLink, Link} from 'react-router-dom';
import Button from '../Button/Button'; 

import './LoginForm.scss'; 

function LoginForm(){
    return(

        <div className ='LoginForm'>

            <Link to='/' className='LoginForm_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </Link>

            <h2 className= 'LoginForm_title'>connexion</h2>

            <form className='ui form'>
                
                <div className='required field'>
                    <input className='LoginForm_form_input'type='text' placeholder='Email'/>
                </div>

                <div className="required field">
                    <input type="text" placeholder="Mot de passe"/>
                </div>

                <div className='LoginForm_buttons-container'>
                    <Button 
                        text = 'Se connecter'
                        type = 'submit'
                    />

                    <Link to='/signup' className='link'>ou <span>s'inscrire</span></Link>
                </div>
                <Link className='LoginForm_forget-password'>Mot de passe oublié ?</Link>
            </form>
        
        </div>

       
    )
}

export default LoginForm; 

