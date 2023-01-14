import { Icon } from '@iconify/react';
import './Tag.scss'; 

function Tag(){

    const name = 'symfony'; 
    const project = 'red'
    return(
        <div className='tag' style={{backgroundColor: `${project}`}}>
            {
                name.toLowerCase().split(' ').join('') === 'nodejs' ? 
                <Icon className="tag_icon" icon={`mdi:${name.toLowerCase().split(' ').join('')}`} />
                : 
                <Icon className="tag_icon" icon={`cib:${name.toLowerCase()}`} />
            }
            <h3 className='tag_name'>{name}</h3>
        </div>
    )
};

export default Tag; 