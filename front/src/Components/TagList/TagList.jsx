import PropTypes from 'prop-types'; 
import React from 'react'; 
import Tag from '../Tag/Tag'

import './TagList.scss'; 

function TagList({
    tagList
}){
    return(
        tagList.map(({id, name, color}) => (
            <Tag
                key = { id }
                name = { name }
                color = { color }
            />
        ))
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