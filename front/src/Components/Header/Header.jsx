import React, { useState }from 'react'; 
import { NavLink, Link } from 'react-router-dom'; 

import './header.scss';

function Header({
    setIsOpen
}) {

    const [ isLogged, setIsLogged ] = useState(true); // TODO context

    return (
        <header className='header'>

            <Link to='/' className='header_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </Link>

            <div className='header_icons'>
                {
                    isLogged ? <i className="header_icons large bars icon" onClick={() => setIsOpen(true)}></i>
                    :  <i className="large user circle icon"></i>
                }
               
            </div>

            <nav className='navLink--desktop'>
                <ul className='navLink_items navLink_items--desktop'>
                    {
                        isLogged ? 
                        <>
                            <li><NavLink to='/login' className='navLink_item navLink_item--desktop'>Trouver un projet</NavLink></li>
                            <li><NavLink className='navLink_item navLink_item--desktop'>Former une équipe</NavLink></li>
                            <li><NavLink className='navLink_item navLink_item--desktop'>Proposer un projet</NavLink></li>
                            <button className='header_button' onClick={() => setIsLogged(false)}>Déconnexion</button>
                        </>
                        : 
                        <>
                            <NavLink to='/login'className='navLink_item navLink_item--desktop'>Se connecter</NavLink>
                            <NavLink to='/signup' className='navLink_item navLink_item--desktop'>S'inscrire</NavLink>
                        </>
                    }
                </ul>
            </nav>

        </header>
    )
}

export default Header;