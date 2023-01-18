import React from 'react'; 
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'; 
import TagList from '../TagList/TagList';

import './Item.scss'; 
import user from './user.png'; 

function Item({
    id, 
    active, 
    avatar, 
    title, 
    subtitle, 
    languages, 
    technologies, 
    description, 
    location
}){

    console.log(location, active); 

    return(
            ((location === "/users" && active) || (location === '/projects')) &&
            <div className="card">

                <div className='card_image'>
                    <img src={user} alt={ title }/> {/* // TODO image */}
                </div>

                <div className="card_header">
                    <h1 className="card_header_title">{ title }</h1>
                    <div className='card_header_content'>
                        <h2 className="card_header_subtitle"> { subtitle }</h2>
                        {   
                        languages && languages.map(({id, name }) => (
                                <Icon key={ id }className="card_header_flag" icon = {`circle-flags:${name === 'anglais' ? 'uk' : name === 'allemand' ? 'de' : name.slice(0,2)}`}/>
                            ))
                        }
                    </div>
                </div>

                {
                    location === "/projects" &&
                    <div className = {`card_tag-project card_tag-project--${ active === true ? 'open' : 'full' }`}>
                        { active === true ? 'Ouvert' : 'Complet' }
                    </div>
                
                }
                
                <div className = 'card_technologies'>
                    <TagList 
                    tagList = { technologies } 
                    />
                </div>
            
                
                <p className='card_description'>{ description }</p>

                <div className="card_extra-content">
                    <div className='card_extra-content_icons'>
                        <i className="envelope icon"/>
                        {
                            location === '/users' ? 
                            <Icon icon = "mingcute:user-follow-fill"/> 
                            // TODO  <Icon icon = "mingcute:user-add-fill" /> 
                            :  <i className="heart outline icon"></i>
                            // <i className="heart icon"></i>
                        }
                    
                    </div>
                
                    {
                        location === '/users' ? 
                        <Link to='#' className='card_extra-content_link'>Voir le profil</Link>
                        : 
                        <Link to='#' className='card_extra-content_link'>Voir le projet</Link>
                    }
                </div>
            </div>
    )
}

export default Item; 