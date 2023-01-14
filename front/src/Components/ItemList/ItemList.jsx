
import Item from "../Item/Item"; 
import Pagination from "../Pagination/Pagination";
import './ItemList.scss'; 

function ItemList(){
    return(
        <>
        <div className='itemList'>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
        </div>
        
        <Pagination />
        
        </>
    
    )
}

export default ItemList; 