import React, { useState, useEffect} from 'react'; 
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ItemList from "../ItemList/ItemList"; 
import FilterTags from "../FilterTags/FilterTags";
import FilterMenu from "../FilterMenu/FilterMenu"; 
import MenuBurger from "../MenuBurger/MenuBurger"; 
import Button from '../Button/Button'; 

import { getAllUsers } from "../../requests/displayRequests";
 
import './UsersPage.scss'; 

function UsersPage(){

  const [pageNumber, setPageNumber] = useState(0); 
  const [searchText, setSearchText] = useState(''); 
  const [technologies, setTechnologies] = useState(''); 
  const [ IsfilterMenuOpen, setIsFilterMenuOpen ] = useState(false); 
  const [ IsMenuBurgerOpen, setIsMenuBurgerOpen ] = useState(false)

  const handleButtonClick = () => {
    setIsFilterMenuOpen(true)
  }
  // const fetchData = async (pageNumber) => {
  //   try {
  //     const data = await getAllUsers(pageNumber, searchText, technologies); 
  //     console.log('ici', data); 
  //     return data; 
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
   
  // };
  
  // useEffect(
  //   () => {
  //     fetchData();
  //   },
  //   [],
  // );

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

          <SearchBar />

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
          <FilterTags />
          <ItemList />
        </div>
    )
}

export default UsersPage; 