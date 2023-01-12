import './LoginForm.scss'; 

function LoginForm(){
    return(

        <div className ='LoginForm'>

            <div className='LoginForm_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </div>

            <h2 className= 'LoginForm_title'>connexion</h2>

            <div className='ui form'>
                
                <div className='required field'>
                    <input className='LoginForm_form_input'type='text' placeholder='Email'/>
                </div>

                <div className="required field">
                    <input type="text" placeholder="Mot de passe"/>
                </div>

                <div className='LoginForm_buttons-container'>
                    <div className="ui submit button">Se connecter</div>
                    <p>ou <span>s'inscrire</span></p>
                </div>
                <div className='LoginForm_forget-password'>Mot de passe oublié ?</div>
            </div>
        
        </div>

       
    )
}

export default LoginForm; 

