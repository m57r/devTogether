import React from 'react'; 
import './Modal.scss'; 

function SuccessModal({
    text,
    type
}){
    return(
        <div className = 'overlay'>
            <div className ={`modal-message modal-message${type === 'sucess' ? '--sucess' : '--error'}`}>
                { text }
            </div>
        </div>
    )
}

export default React.memo(SuccessModal); 

