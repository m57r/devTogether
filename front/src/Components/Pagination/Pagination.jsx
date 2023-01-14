import { useState } from 'react'; 
import './Pagination.scss'; 

function Pagination(){
    const totalPage = 6; 
    const array = Array.from(Array(totalPage), (_, index) => index +1)

    const [ currentPage, setCurrentPage ] = useState(0); 
  
    return(
        <div className="pagination">
            {
              currentPage > 0  && <i 
                   className="big caret left icon"
                   onClick={() => setCurrentPage(currentPage - 1)}   
               ></i>
            }
         
            { 
                array.map(item => (
                    
                        <div 
                            className={`item ${ currentPage === item-1 ? 'active' : ''}`} 
                            key={ item } 
                            onClick={(e) => setCurrentPage(item-1)}>
                            
                            {item}

                        </div>
                ) )
            }

            {
                currentPage < array.length-1  &&
                <i 
                className="big caret right icon"
                onClick={() => setCurrentPage(currentPage + 1)}  
                ></i>
            }
           
        </div>
    )
}

export default Pagination; 