import { NavLink, Link } from 'react-router-dom';
import Button from '../Button/Button'; 
import './SignupForm.scss'; 

function SignupForm(){
    return(

        <div className ='SignupForm'>

            <Link to='/' className='SignupForm_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </Link>

            <h2 className= 'SignupForm_title'>inscription<Link to='/login' className='link'>Ou connexion</Link></h2>

            <form className='ui form'>
                
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

                <div className="required inline field">
                    <div className="ui checkbox">
                    <input type="checkbox" name='conditions' className="hidden"/>
                    <label>J'accepte les conditions générales</label>
                    </div>
                </div>

                <div className="required inline field">
                    <div className="ui checkbox">
                    <input type="checkbox"  name='politic' className="hidden" />
                    <label>J'accepte la politique de confidentialité relative au traitement de mes données personnelles</label>
                    </div>
                </div>
            
            <div className='SignupForm_buttons-container'>
                <Button 
                    text = "S'inscrire"
                    type = 'submit'
                />
                <NavLink className='link'>ou <span>se</span> connecter</NavLink>
            </div>

            </form>

           


    
        </div>

       
    )
}

export default SignupForm; 