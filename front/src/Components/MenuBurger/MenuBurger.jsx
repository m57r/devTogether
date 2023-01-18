import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import Button from '../Button/Button'; 

import './MenuBurger.scss'; 

function MenuBurger({
    setIsOpen,
    isAvailableStatus, 
    handleStatus
}){

    return(
        <div className = 'overlay-menuBurger' >
            <div className='menu-burger'>
                <button className="menu-burger_close-button" onClick={() => setIsOpen(false)}>x</button>
                <div className="menu-burger_status" onClick={() => handleStatus(!isAvailableStatus)}>
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