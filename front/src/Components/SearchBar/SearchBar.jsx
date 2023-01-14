import { useState } from 'react'

import { Form, Input } from 'semantic-ui-react';
import './SearchBar.scss'; 

function SearchBar(){

    const [searchValue, setSearchValue] = useState('');

    return (
     <>
        <h1 className='searchBar_title'>Recherchez des développeurs</h1>
        <Form>
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