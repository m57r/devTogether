import React, { useState, useContext }from 'react'; 
import Button from '../Button/Button'; 
import { TechnologiesByCategoryContext } from '../../Context/TechnologiesByCategoryContext';
import './FilterMenu.scss'; 

function FilterMenu({
    setIsOpen
}){
    const { technologiesByCategory } = useContext(TechnologiesByCategoryContext)
    const [ isFavoritesChecked, setIsFavoritesChecked ] = useState(false)

    return(
        <div className = 'overlay-filterMenu'>
            <div className= 'filterMenu'>
                <button className="filterMenu_close-button" onClick={() => setIsOpen(false)} >x</button>
                <form>

                    <div className ='filterMenu_category'>
                        <div className = 'filterMenu_category filterMenu_category--favorite' onClick = { () => setIsFavoritesChecked(!isFavoritesChecked) }>
                        { !isFavoritesChecked ? 
                            <i className="heart outline icon"></i>
                            : <i className="heart icon"></i>
                        }
                            <h2>Mes favoris</h2>
                        </div>

                    </div>
                        {/* <div className= 'filterMenu_category'>
                            <h2 className='filterMenu_category_title'>statut</h2>
                            <div className="filterMenu_category_checkbox">
                                <input 
                                    type="checkbox"
                                    name='test'
                                />
                                <label>Ouvert</label>
                            </div>
                            <div className="filterMenu_category_checkbox">
                                <input 
                                    type="checkbox"
                                    name='test'
                                />
                                <label>Complet</label>
                            </div>
                        </div> */}

                        { technologiesByCategory.map(({id, name, technologies }) => (

                            <div className= 'filterMenu_category' key={ id }>
                                <h2 className='filterMenu_category_title'>{name}</h2>
                                {
                                    technologies.map(({ id, name }) => (
                                        <div className="filterMenu_category_checkbox" key={id}>
                                            <input type="checkbox"
                                                name={name}
                                            />
                                            <label>{ name[0].toUpperCase() }{ name.slice(1) }</label>
                                        </div>
                                    ))
                                }
                            </div>

                        ))
                        
                        }
                    <Button 
                        text = 'Filtrer'
                        type = 'submit'
                    />
                </form>
                <button className="filterMenu_button-reset">Réinitialiser mes choix</button>
            </div>
        </div>
    )
}

export default React.memo(FilterMenu)

// TODO proptypes