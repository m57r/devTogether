import './header.scss';

function Header() {
    return (
        <header className='header'>

            <div className='header_logo'>
                <h1><span>DEV'</span><br />TOGETHER</h1>
            </div>

            <div className='header_icons'>
                <i className="large user circle icon"></i>
                {/* <i class="header_icons large bars icon"></i> */}
            </div>

            <nav className='navLink--desktop'>
                <ul className='navLink_items navLink_items--desktop'>
                    <li className='navLink_item--desktop'>Se connecter</li>
                    <li className='navLink_item--desktop'>S'inscrire</li>
                    {/* <li className='navLink_item--desktop'>Trouver un projet</li>
                    <li className='navLink_item--desktop'>Proposer un projet</li>
                    <li className='navLink_item--desktop'>Former une équipe</li> */}
                   
                </ul>
                {/* <button>Se déconnecter</button> */}
            </nav>

        </header>
    )
}

export default Header;