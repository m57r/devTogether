import PropTypes from 'prop-types'; 
import React from 'react'; 
import Tag from '../Tag/Tag'

import './TagList.scss'; 

function TagList({
    tagList
}){

    return(
        // <div className='TagList'>
        //     {
                tagList.map(({id, name, color}) => (
                    <Tag
                        key = { id }
                        name = { name }
                        color = { color }
                    />
                ))
        //     }
         
        // </div>
    )
}

export default React.memo(TagList); 

TagList.propTypes = {
    taglist : PropTypes.shape({
        id: PropTypes.string.isRequired, 
        name : PropTypes.string.isRequired, 
        color : PropTypes.string.isRequired
    }) 
}