import React from 'react'; 
import { NavLink, Link } from 'react-router-dom';
import Button from '../Button/Button'; 

function FirstPartForm(){
    return(
        <>
            <div className='required field'>
                <label>Nom</label> 
                <input type='text' placeholder='Nom'/>
            </div>

            <div className="required field">
                <label>Prénom</label> 
                <input type="text" placeholder="Prénom"/>
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

            <p className='required_information'> * champs obligatoires</p>

            <div className='SignupForm_buttons-container'>
                <Link  to='/signup/2'>
                    <Button 
                        text = "Suivant"
                        type = 'submit'
                    />                    
                </Link>

                <NavLink className='link'>ou <span>se</span> connecter</NavLink>
            </div>
        </>
    )
}

export default React.memo(FirstPartForm)
