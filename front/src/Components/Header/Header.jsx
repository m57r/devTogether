import React, { useContext }from 'react'; 
import { NavLink, Link, useNavigate } from 'react-router-dom'; 
import { LoginContext } from '../../Context/LoginContext';
import { removeToken } from '../../requests/instance';
import './header.scss';

function Header() {
    const navigate = useNavigate();
    const { isLogged, setIsLogged, isAvailableStatus, setIsAvailableStatus, setIsMenuBurgerOpen } = useContext(LoginContext);
    
    const handleLogout = () => {
        removeToken(); 
        localStorage.removeItem('token'); 
        setIsLogged(false); 
        navigate('/')
    }

    return (
        <header className='header'>

            <Link to='/' className='header_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </Link>

            <div className='header_icons'>
                {
                    isLogged ? 
                    <>
                        <i className={ `large toggle on icon ${ isAvailableStatus ? 'green' : 'orange'}`} onClick={ () => {setIsAvailableStatus(!isAvailableStatus)}}/>
                        <i className="header_icons large bars icon" onClick={() => setIsMenuBurgerOpen(true)}></i>
                    </>
                    :  
                    <Link to='/login'>
                        <i className="large user circle icon"></i>
                    </Link>
                    
                }
               
            </div>
            <nav className='navLink--desktop'>
                <ul className='navLink_items navLink_items--desktop'>
                    {
                        isLogged ? 
                        <>
                            <li><i className={ `big toggle on icon ${ isAvailableStatus ? 'green' : 'orange'}`} onClick={ () =>{setIsAvailableStatus(!isAvailableStatus)}}/></li>
                            <li><NavLink to='/projects' className={`navLink_item navLink_item--desktop ${ ({ isActive }) => isActive ?  'active' : '' } `}>Trouver un projet</NavLink></li>
                            <li><NavLink to='/users' className={`navLink_item navLink_item--desktop ${ ({ isActive }) => isActive ?  'active' : '' }  `}>Former une équipe</NavLink></li>
                            <li><NavLink to='/createprojects' className={`navLink_item navLink_item--desktop ${ ({ isActive }) => isActive ?  'active' : '' } `}>Proposer un projet</NavLink></li>
                            <button className='header_button' onClick={ handleLogout }>Déconnexion</button>
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

export default React.memo(Header);