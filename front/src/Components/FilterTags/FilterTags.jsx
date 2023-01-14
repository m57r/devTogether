import TagList from "../TagList/TagList"; 

import './FilterTags.scss'; 

function FilterTags(){
    return(
        <form className='ui form filterTags'>
            <TagList/>
            <div className="ui submit button">Filtrer</div>
        </form>
    )
}

export default FilterTags; 