import './SignupForm.scss'; 

function SignupForm(){
    return(

        <div className ='SignupForm'>

            <div className='SignupForm_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </div>

            <h2 className= 'SignupForm_title'>inscription <span>Ou connexion</span></h2>

            <div className='ui form'>
                
                <div className='required field'>
                    <label>Nom</label> 
                    <input className='SignupForm_form_input'type='text' placeholder='Nom'/>
                </div>

                <div className="required field">
                    <label>Prénom</label> 
                    <input type="text" placeholder="Prénom"/>
                </div>

                <div className="required field">
                    <label>Spécialité</label>
                    <div className="ui selection dropdown">
                        <input type="hidden" name="front"/>
                        <i className="dropdown icon"></i>
                        <div className="default text">Spécialité</div>
                        <div className="menu">
                            <div className="item" data-value="1">Front</div>
                            <div className="item" data-value="0">Back</div>
                            <div className="item" data-value="0">FullStack</div>
                        </div>
                    </div>
                </div>

                <div className="required field">
                    <label>Email</label> 
                    <input type="text" placeholder="Email"/>
                </div>

                <div className="required field">
                    <label>Mot de passe</label> 
                    <input type="text" placeholder="Mot de passe"/>
                </div>

                <div className="required field">
                    <label>Confirmation du mot de passe</label> 
                    <input type="text" placeholder="Confirmer mot de passe"/>
                </div>

                <div className="inline field">
                    <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden"/>
                    <label>J'accepte les conditions générales</label>
                    </div>
                </div>

                <div className="inline field">
                    <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden"/>
                    <label>J'accepte la politique de confidentialité relative au traitement de mes données personnelles</label>
                    </div>
                </div>
            
            </div>

            <div className='SignupForm_buttons-container'>
                <div className="ui submit button">S'inscrire</div>
                <p>ou <span>se</span> connecter</p>
            </div>
    
        </div>

       
    )
}

export default SignupForm; 