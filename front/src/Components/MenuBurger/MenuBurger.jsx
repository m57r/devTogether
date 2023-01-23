import React, { useContext } from 'react'; 
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext'; 
import Button from '../Button/Button'; 
import './MenuBurger.scss'; 

function MenuBurger(){
    const { isAvailableStatus, setIsAvailableStatus, setIsMenuBurgerOpen } = useContext(LoginContext);
    return(
        <div className = 'overlay-menuBurger' >
            <div className='menu-burger'>
                <button className="menu-burger_close-button" onClick={() => setIsMenuBurgerOpen(false)}>x</button>
                <div className="menu-burger_status" onClick={() => setIsAvailableStatus(!isAvailableStatus)}>
                            <i className={ `big toggle on icon ${ isAvailableStatus ? 'green' : 'orange'}`}/>
                            <p>{ isAvailableStatus ? 'Statut en ligne' : 'Statut absent'}</p> 
                </div>
                
                <nav className='menu-burger_navLink'>
                    <ul>
                        <li><NavLink className={`menu-burger_navLink_item ${ ({ isActive }) => isActive ? 'active' : '' }`} to='/profil'>Mon profil</NavLink></li>
                        <li><NavLink className={`menu-burger_navLink_item ${ ({ isActive }) => isActive ? 'active' : '' }`} to='/projects'>Trouver un projet</NavLink></li>
                        <li><NavLink className={`menu-burger_navLink_item ${ ({ isActive }) => isActive ? 'active' : '' }`} to='/users'>Former une équipe</NavLink></li>
                        <li><NavLink className={`menu-burger_navLink_item ${ ({ isActive }) => isActive ? 'active' : '' }`} to='/createproject'>Proposer un projet</NavLink></li>
                    </ul>
                </nav>
                <Button 
                    text = 'Se déconnecter'
                /> 
            </div>
        </div>
    )
}

export default React.memo(MenuBurger); 