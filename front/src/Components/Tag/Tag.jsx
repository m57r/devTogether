import PropTypes from 'prop-types'; 
import React from 'react'; 
import { Icon } from '@iconify/react';
import './Tag.scss'; 

function Tag({
    name, 
    color
}){
    return(
        <div className='tag' style={{backgroundColor: `#${color}`}}>
            {
                name.toLowerCase().split(' ').join('') === 'vuejs' ? 
                <Icon className="tag_icon" icon={`mdi:${ name.toLowerCase().split(' ').join('')}`} />
                : 
                <Icon className="tag_icon" icon={`simple-icons:${ name.toLowerCase()}`} />
            }
            <h3 className='tag_name'>{ `${name[0].toUpperCase()}${name.slice(1)}` }</h3>
        </div>
    )
};

export default React.memo(Tag);

Tag.propTypes = {
    name : PropTypes.string.isRequired, 
    color : PropTypes.string.isRequired
}


