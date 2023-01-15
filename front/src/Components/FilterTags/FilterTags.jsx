import React from 'react';

import TagList from "../TagList/TagList";
import Button from "../Button/Button"; 

import './FilterTags.scss';

function FilterTags({
    tagList
}) {
    
    return (
        <form className='ui form filterTags'>
            <div className='TagList'>
                {
                    tagList.map(({id, technologies }) => (
                    
                            <TagList
                                key={id}
                                tagList={ technologies }
                            />
                    ))
                }
            </div>

            < Button 
                text = 'Filtrer'
                type = 'submit'
            />
        </form>
    )
}

export default FilterTags; 