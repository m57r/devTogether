import React from 'react'; 


import './SuccessModal.scss'; 

function SuccessModal({
    text
}){
    return(
        <div className = 'overlay'>
            <div className = 'modal-message'>
                { text }
            </div>
        </div>
    )
}

export default React.memo(SuccessModal); 

