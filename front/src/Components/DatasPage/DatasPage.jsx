import React, { useState, useEffect, useContext } from 'react'; 
import { useLocation } from 'react-router-dom';
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ItemList from "../ItemList/ItemList"; 
import FilterTags from "../FilterTags/FilterTags";
import FilterMenu from "../FilterMenu/FilterMenu"; 
import MenuBurger from "../MenuBurger/MenuBurger"; 
import Button from '../Button/Button'; 
import Loading from '../Loading/Loading'; 
import { LoginContext } from '../../Context/LoginContext';
import { TechnologiesByCategoryContext } from '../../Context/TechnologiesByCategoryContext';
import { getAllProjects, getAllUsers } from "../../requests/displayRequests";

 
import './DatasPage.scss'; 


function UsersPage(){

  const { isMenuBurgerOpen, setIsMenuBurgerOpen } = useContext(LoginContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ datasList, setDatasList ] = useState([])
  const [ totalPage, setTotalPage ] = useState(1)
  const [ pageNumber, setPageNumber ] = useState(0); 
  const [ searchValue, setSearchValue ] = useState(''); 
  const [ technologies, setTechnologies ] = useState(''); 
  const [ IsfilterMenuOpen, setIsFilterMenuOpen ] = useState(false); 

  const { technologiesByCategory } = useContext(TechnologiesByCategoryContext); 
  const location = useLocation(); 

  const handleButtonClick = () => {
    setIsFilterMenuOpen(true)
  }

  const fetchDatas = async () =>{
    try{
      setIsLoading(true);
      let response; 
      if(location.pathname === '/users'){
        response = await getAllUsers(searchValue, pageNumber, technologies) 
      }else if('/projects'){
        response = await getAllProjects(searchValue, pageNumber, technologies); 
      }

      setDatasList(response.content); 
      searchValue.trim() === '' ? setTotalPage(response.totalPages) : setTotalPage(response.content.length/6)

    }catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
} 

useEffect(
    () => { 
      fetchDatas()
    }, [ searchValue, pageNumber, technologies ]
)
    return(
        <div className='usersPage'>
          <Header/>
          
          {
            isMenuBurgerOpen && 
            <MenuBurger
              setIsOpen = { setIsMenuBurgerOpen }
            />
          }

          <SearchBar 
            setSearchText = { setSearchValue }
            title = { location.pathname === '/users' ? 'développeurs' : 'projets' } 
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
            isLoading ? <Loading /> :
            <ItemList 
              location = { location.pathname }
              datasList = { datasList }
              totalPage = { totalPage }
              currentPage = { pageNumber }
              setCurrentPage = { setPageNumber }
            />
           
          }

        </div>
    )
}

export default UsersPage; 