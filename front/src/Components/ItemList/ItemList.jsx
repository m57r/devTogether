
import Item from "../Item/Item"; 
import Pagination from "../Pagination/Pagination";
import './ItemList.scss'; 

function ItemList({
    usersList, 
    totalPage, 
    currentPage, 
    setCurrentPage, 
}){
    return(
        <>
        <div className='itemList'>
            {
                usersList.map(
                    ({
                        id, active, avatar, firstname, lastname, speciality, languages, user_technologies, description 
                    }) => (
                        <Item
                            key={ id }
                            active={ active }
                            avatar= { avatar }
                            firstname = { firstname }
                            lastname = { lastname }
                            speciality = { speciality }
                            languages = { languages }
                            technologies = { user_technologies }
                            description = { description }
                        /> 
                    )
                )
            }
        </div>
        
        {
            totalPage >1 && 
            <Pagination 
            totalPage = { totalPage }
            currentPage = { currentPage }
            setCurrentPage = { setCurrentPage }
            />
        }
       
        
        </>
    
    )
}

export default ItemList; 

// TODO image props