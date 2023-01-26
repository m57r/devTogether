// import PropTypes from 'prop-types';
import React, { useState } from 'react'
import { Input, Form } from 'semantic-ui-react';
import { useFilterReducer } from '../../reducer/useFilterReducer'; 
import { getActionSetValue } from '../../actions/actions'; 

import './SearchBar.scss'; 

function SearchBar({
    title,
    placeholder, 
}){
    const { filterState, filterDispatch } = useFilterReducer(); 
    // const [ value, setValue ] = useState('');

    return (
     <>
        <div className='searchBar_container'>
        <h1 className='searchBar_title'>Recherchez des { title }</h1>
        <Form.Field>
            <Input
                focus
                icon="search"
                iconPosition="left"
                placeholder={ placeholder }
                name='searchValue'
                value={ filterState.searchValue }
                onChange = {(e) => { filterDispatch(getActionSetValue(e.target.name, e.target.value)) }}
                // onChange={(e) => setValue(e.target.value)}
            />
            </Form.Field>
        </div>
      </>  
    )
}

export default React.memo(SearchBar); 

// TODO propTypes 