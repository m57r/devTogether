
import Item from "../Item/Item"; 
import Pagination from "../Pagination/Pagination";
import './ItemList.scss'; 

function ItemList({
    location, 
    datasList, 
    totalPage, 
    currentPage, 
    setCurrentPage, 
}){
    console.log('ici', location); 
    
    return(
        <>
        <div className='itemList'>
            {
                location === '/users' ? 
                datasList.map(
                    ({
                        id, active, avatar, firstname, lastname, speciality, languages, user_technologies, description 
                    }) => (
                        <Item
                            key={ id }
                            active={ active }
                            avatar= { avatar }
                            title = { `${firstname[0].toUpperCase()}${firstname.slice(1)} ${lastname[0].toUpperCase()}${lastname.slice(1)}`}
                            subtitle = { `${speciality[0].toUpperCase()}${speciality.slice(1)}` }
                            languages = { languages }
                            technologies = { user_technologies }
                            description = { description }
                            location = { location }
                        /> 
                    )
                )
                : 
                datasList.map(
                    ({
                        id, recruiting, avatar, name, author, technologies, description 
                    }) => (
                        <Item
                            key={ id }
                            active={ recruiting }
                            avatar= { avatar }
                            title = { name }
                            subtitle = { `${author.firstname[0].toUpperCase()}${author.firstname.slice(1)} ${author.lastname[0].toUpperCase()}${author.lastname.slice(1)}` }
                            technologies = { technologies }
                            description = { description }
                            location = { location }
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