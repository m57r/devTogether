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
    firstname, 
    lastname, 
    speciality, 
    languages, 
    technologies, 
    description
}){
    return(
        <div className="card">

            <div className='card_image'>
                <img src={user} alt={`${ firstname }${ lastname }`}/> {/* // TODO image */}
            </div>

            <div className="card_header">
                <h1 className="card_header_title">{ firstname[0].toUpperCase()}{firstname.slice(1)} {lastname[0].toUpperCase()}{lastname.slice(1)}</h1>
                <div className='card_header_content'>
                    <h2 className="card_header_subtitle"> {speciality[0].toUpperCase()}{speciality.slice(1)}</h2>
                    {
                        languages.map(({id, name }) => (
                            <Icon key={ id }className="card_header_flag" icon = {`circle-flags:${name === 'anglais' ? 'uk' : name === 'allemand' ? 'de' : name.slice(0,2)}`}/>
                        ))
                    }
                </div>
            </div>
            
            <div className = 'card_technologies'>
                <TagList 
                tagList = { technologies } 
                />
            </div>
          
            
            <p className='card_description'>{ description }</p>

            <div className="card_extra-content">
                <div className='card_extra-content_icons'>
                    <i className="envelope icon"/>
                    <Icon icon = "mingcute:user-follow-fill"/> 
                    {/* // TODO  <Icon icon = "mingcute:user-add-fill" />  */}
                </div>
               
                <Link to='#' className='card_extra-content_link'>Voir le profil</Link>
            </div>
        </div>
    )
}

export default Item; 