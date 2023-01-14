import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'; 
import TagList from '../TagList/TagList';

import './Item.scss'; 
import user from './user.png'; 

function Item(){

    return(
        <div className="card">

            <div className='card_image'>
                <img src={user} alt='user'/>
            </div>

            <div className="card_header">
                <h1 className="card_header_title">Leslie Alexander</h1>
                <div className='card_header_content'>
                    <h2 className="card_header_subtitle">FullStack</h2>
                    <i className="france flag"></i>
                    <Icon className="card_header_flag" icon = "circle-flags:uk" />
                    <Icon className="card_header_flag" icon = "circle-flags:uk" />
                </div>
            </div>

            <TagList />
            
            <p className='card_description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure cupiditate recusandae ea a magnam quibusdam quo, iusto aliquid quod dolores? Voluptas obcaecati ex ducimus delectus eos dolorem veritatis nemo fugit.</p>

            <div className="card_extra-content">
                <div className='card_extra-content_icons'>
                    <i className="envelope icon"/>
                    <Icon icon = "mingcute:user-follow-fill"/>
                    {/* <Icon icon = "mingcute:user-add-fill" /> */}
                </div>
               
                <Link to='#' className='card_extra-content_link'>Voir le profil</Link>
            </div>
        </div>
    )
}

export default Item; 