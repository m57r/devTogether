import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ItemList from "../ItemList/ItemList"; 
import FilterTags from "../FilterTags/FilterTags";

import { useEffect } from 'react'; 

import './UsersPage.scss'; 

import { getAllUsers } from "../../requests/displayRequests";
 

function UsersPage(){
  
  const pageNumber = 0;

  const fetchData = async (pageNumber) => {
    try {
      const data = await getAllUsers(pageNumber); 
      console.log('ici', data); 
      return data; 
    }
    catch (err) {
      console.error(err);
    }
   
  };
  
  useEffect(
    () => {
      fetchData();
    },
    [],
  );

    return(
        <div className='usersPage'>
          <Header/>
          <SearchBar/>
          <FilterTags/>
          <ItemList/>
        </div>
    )
}

export default UsersPage; 