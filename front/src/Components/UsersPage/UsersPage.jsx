import React, { useState, useEffect, useContext } from 'react'; 
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ItemList from "../ItemList/ItemList"; 
import FilterTags from "../FilterTags/FilterTags";
import FilterMenu from "../FilterMenu/FilterMenu"; 
import MenuBurger from "../MenuBurger/MenuBurger"; 
import Button from '../Button/Button'; 
import Loading from '../Loading/Loading'; 

import { TechnologiesByCategoryContext } from '../../Context/TechnologiesByCategoryContext';
import { getAllUsers } from "../../requests/displayRequests";

 
import './UsersPage.scss'; 

function UsersPage(){
  const [isLoading, setIsLoading] = useState(false);
  const [ usersList, setUsersList ] = useState([])
  const [ totalPage, setTotalPage ] = useState(1)
  const [ pageNumber, setPageNumber] = useState(0); 
  const [searchValue, setSearchValue] = useState(''); 
  const [technologies, setTechnologies] = useState(''); 
  const [ IsfilterMenuOpen, setIsFilterMenuOpen ] = useState(false); 
  const [ IsMenuBurgerOpen, setIsMenuBurgerOpen ] = useState(false);

  const { technologiesByCategory } = useContext(TechnologiesByCategoryContext); 

  const handleButtonClick = () => {
    setIsFilterMenuOpen(true)
  }

  const fetchUsers = async () =>{
    try{
      setIsLoading(true);
      const response = await getAllUsers(searchValue, pageNumber, technologies);
      setUsersList(response.content); 

      searchValue.trim() === '' ? setTotalPage(response.totalPages) : setTotalPage(response.content.length/6)

    }catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
} 

useEffect(
    () => { fetchUsers() }, [ searchValue, pageNumber, technologies ]
)
    return(
        <div className='usersPage'>
          <Header
            setIsOpen = { setIsMenuBurgerOpen }
          />
          
          {
            IsMenuBurgerOpen && 
            <MenuBurger
              setIsOpen = { setIsMenuBurgerOpen }
            />
          }

          <SearchBar 
            setSearchText = { setSearchValue }
            title = 'développeurs'
          />

          <div className='usersPage_button'>
            <Button 
              text='Filtrer'
              handleClick = { handleButtonClick }
            />
          </div>
          
          {
            IsfilterMenuOpen && 
            <FilterMenu
              setIsOpen = { setIsFilterMenuOpen }
            />
          }
          <FilterTags 
            tagList = { technologiesByCategory }
          />

          {
            isLoading ? <Loading />
            : 
            <ItemList 
            usersList = { usersList }
            totalPage = { totalPage }
            currentPage = { pageNumber }
            setCurrentPage = { setPageNumber }
          />
          }

        </div>
    )
}

export default UsersPage; 