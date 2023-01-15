// import PropTypes from 'prop-types';
import { useState } from 'react'
import { Form, Input } from 'semantic-ui-react';
import './SearchBar.scss'; 

function SearchBar({
    setSearchText, 
    title
}){

    const [ searchValue, setSearchValue ] = useState('');

    const handleSubmit = () => {
        setSearchText(searchValue)
    }

    return (
     <>
        <h1 className='searchBar_title'>Recherchez des { title }</h1>
        <Form onSubmit={ handleSubmit }>
            <Form.Field>
            <div className='searchBar_container'>
            <Input
                focus
                icon="search"
                iconPosition="left"
                placeholder="Recherche..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            </div>
            </Form.Field>
        </Form>
      </>  
    )
}

export default SearchBar; 

// TODO propTypes 