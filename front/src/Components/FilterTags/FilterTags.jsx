import React, { useState, useEffect } from 'react';
import { getAllTechnologies } from '../../requests/displayRequests';

import TagList from "../TagList/TagList";
import Button from "../Button/Button"; 

import './FilterTags.scss';

function FilterTags() {
    
    const [ tagList, setTagList ] = useState([]); 

    const fetchTechnologies = async () =>{
        const response = await getAllTechnologies();
        setTagList(response); 
    } 

    useEffect(
        () => { fetchTechnologies() }, []
    )

    return (
        <form className='ui form filterTags'>
            <TagList
                tagList={tagList}
            />
            < Button 
                text = 'Filtrer'
                type = 'submit'
            />
        </form>
    )
}

export default FilterTags; 