import PropTypes from 'prop-types'; 
import React from 'react'; 

import './Button.scss'; 

function Button({
    text, 
    type, 
    handleClick
}){
    return(
        <div 
            className={ type === 'submit' ? 'ui submit button' : 'button' } 
            onClick={ handleClick ? handleClick : null }
        >
            { text }
            
        </div>
    )
}

export default React.memo(Button); 

Button.propTypes = {
    text : PropTypes.string.isRequired, 
    type : PropTypes.string, 
    handleClick : PropTypes.func
}

