import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import Button from '../Button/Button'; 

import './MenuBurger.scss'; 

function MenuBurger({
    setIsOpen
}){

    const [ isAvailableStatus, setIsAvailableStatus ] = useState(true)

    return(
        <div className = 'overlay-menuBurger' >
            <div className='menu-burger'>
                <button className="menu-burger_close-button" onClick={() => setIsOpen(false)}>x</button>
                <div className="menu-burger_status" onClick={() => setIsAvailableStatus(!isAvailableStatus)}>
                            <i class={ `big toggle on icon ${ isAvailableStatus ? 'green' : 'orange'}`}/>
                            <p>{ isAvailableStatus ? 'Statut en ligne' : 'Statut absent'}</p> 
                </div>
                
                <nav className='menu-burger_navLink'>
                    <ul>
                        <li><Link className='menu-burger_navLink_item' to='#'>Mon profil</Link></li>
                        <li><Link className='menu-burger_navLink_item' to='#'>Trouver un projet</Link></li>
                        <li><Link className='menu-burger_navLink_item' to='/users'>Former une équipe</Link></li>
                        <li><Link className='menu-burger_navLink_item' to='#'>Proposer un projet</Link></li>
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