import React, { useState }from 'react'; 
import { NavLink, Link } from 'react-router-dom'; 

import './header.scss';

function Header({
    setIsOpen, 
    isAvailableStatus, 
    handleStatus
}) {

    const [ isLogged, setIsLogged ] = useState(true); // TODO context

    return (
        <header className='header'>

            <Link to='/' className='header_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </Link>

            

            <div className='header_icons'>
                {
                    isLogged ? 
                    <>
                        <i className={ `large toggle on icon ${ isAvailableStatus ? 'green' : 'orange'}`} onClick={ () =>{handleStatus(!isAvailableStatus)}}/>
                        <i className="header_icons large bars icon" onClick={() => setIsOpen(true)}></i>
                    </>
                    :  <i className="large user circle icon"></i>
                }
               
            </div>
            <nav className='navLink--desktop'>
                <ul className='navLink_items navLink_items--desktop'>
                    {
                        isLogged ? 
                        <>
                            <li><i className={ `big toggle on icon ${ isAvailableStatus ? 'green' : 'orange'}`} onClick={ () =>{handleStatus(!isAvailableStatus)}}/></li>
                            <li><NavLink to='/projects' className={`navLink_item navLink_item--desktop ${ ({ isActive }) => isActive ?  'active' : '' } `}>Trouver un projet</NavLink></li>
                            <li><NavLink to='/users' className={`navLink_item navLink_item--desktop ${ ({ isActive }) => isActive ?  'active' : '' }  `}>Former une équipe</NavLink></li>
                            <li><NavLink to='/createprojects' className={`navLink_item navLink_item--desktop ${ ({ isActive }) => isActive ?  'active' : '' } `}>Proposer un projet</NavLink></li>
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