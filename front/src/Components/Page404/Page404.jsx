import React from 'react'; 
import Header from '../Header/Header';

import './Page404'; 

function Page404(){

    return(
        <div className='Page404'>
            <Header/>
            <h1>TEST</h1>
        </div>
    )
  
}

export default React.memo(Page404)