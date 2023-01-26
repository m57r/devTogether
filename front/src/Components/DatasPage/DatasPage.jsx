import React, { useState, useEffect, useContext } from 'react'; 
import { useLocation } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import colorStyles from '../../utils/colorStyles';
import Select from 'react-select'; 
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import ItemList from "../ItemList/ItemList"; 
import MenuBurger from "../MenuBurger/MenuBurger"; 
import Button from '../Button/Button'; 
import Loading from '../Loading/Loading'; 
import { useFilterReducer } from '../../reducer/useFilterReducer'; 
import { getActionSetValue } from '../../actions/actions'; 
import { LoginContext } from '../../Context/LoginContext';
import { TechnologiesByCategoryContext } from '../../Context/TechnologiesByCategoryContext';
import { getAllProjects, getAllUsers } from "../../requests/displayRequests";
import './DatasPage.scss'; 

// TODO  review filter + searchBar = back ? front ? reducer ? 

function UsersPage(){
  const { groupedOptions } = useContext(TechnologiesByCategoryContext); 
  const { isMenuBurgerOpen, setIsMenuBurgerOpen } = useContext(LoginContext);
  const [ isLoading, setIsLoading ] = useState(false);
  
  const [ datasList, setDatasList ] = useState([])
  const [ totalPage, setTotalPage ] = useState(1)
  const [ pageNumber, setPageNumber ] = useState(0); 

  const { filterState, filterDispatch } = useFilterReducer(); 

  const location = useLocation(); 
  
  const handleChange = (selectedOptions) => {
    let technologies = selectedOptions.map(item => item.value).join(',');
     filterDispatch(getActionSetValue('technologies', technologies)); 
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchDatas(); 
  }

  const fetchDatas = async () =>{
    try{
      setIsLoading(true);
      let response; 
      if(location.pathname === '/users'){
        response = await getAllUsers(filterState.searchValue, pageNumber, filterState.technologies) 
      }else if('/projects'){
        response = await getAllProjects(filterState.searchValue, pageNumber, filterState.technologies); 
      }
      setDatasList(response.content);  
      setTotalPage(response.totalPages); 
      // (filterState.searchValue.trim() === '' && filterState.technologies.trim() === '') ? setTotalPage(response.totalPages) : setTotalPage(response.content.length/6)

    }catch(err){
      console.log(err); 
      setDatasList([]); 
      setTotalPage(0); 
    }
    finally{
      setIsLoading(false)
    }
  }
  
  useEffect(
    () => { 
      fetchDatas(); 
    }, [ pageNumber, filterState.searchValue ]
  )

    return(
        <div className='datasPage'>
          <Header/>
          
          {
            isMenuBurgerOpen && 
            <MenuBurger
              setIsOpen = { setIsMenuBurgerOpen }
            />
          }

        <Form>

            <SearchBar 
              placeholder = {location.pathname === '/users' ? 'Rechercher via nom ou un prénom' : 'Rechercher un projet'}
              title = {location.pathname === '/users' ? 'développeurs' : 'projets'}
            />

            <Select 
              className = 'datasPage_select'
              placeholder="Rechercher par technologies"
              options={ groupedOptions }
              onChange = { handleChange }
              styles = { colorStyles } 
              isMulti
            />

            <div className='datasPage_button'>
              <Button 
                text='Filtrer'
                type = 'submit'
                handleClick= { handleSubmit }
              />

            <Button 
                text='Réinitialiser'
                type='submit'
            />
            </div>


          </Form>
       

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

export default React.memo(UsersPage); 