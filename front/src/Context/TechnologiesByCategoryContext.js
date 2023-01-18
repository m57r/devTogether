import {  createContext, useEffect, useState, useCallback } from 'react';
import { getAllTechnologiesByCategory } from '../requests/displayRequests';

export const TechnologiesByCategoryContext = createContext(); 

export const TechnologiesByCategoryProvider = ({children}) => {

    const [ technologiesByCategory, setTechnologiesByCategory ] = useState([]);
    const [ groupedOptions, setGroupedOptions ] = useState({})

    const speciality = [
        { value : 'Front', label : 'Front', color : '#e32e45'},
        { value : 'Back', label : 'Back', color : 'black'},
        { value : 'FullStack', label : 'FullStack', color : '#5123d4'}
    ]

    //need tu use useCallback to avoid infinit loop
    const fetchTechnologiesByCategory = useCallback(async () => {

        try{
            const response = await getAllTechnologiesByCategory(); 
            setTechnologiesByCategory(response); 
            setGroupedOptions(response.map(category => ( {
                label : `${category.name}`, 
                options : category.technologies.map(technology => ({
                    value : `${technology.id}`, 
                    label : `${technology.name[0].toUpperCase()}${technology.name.slice(1)}`, 
                    color : `#${technology.color}`
                }))
            })))
        }catch(err){
            console.log(err)
        }
    }, [] )

    useEffect(() => { 
        fetchTechnologiesByCategory(); 

    }, [fetchTechnologiesByCategory])

    return(
        <TechnologiesByCategoryContext.Provider value={ { fetchTechnologiesByCategory, technologiesByCategory, groupedOptions, speciality } }>
                {children}
        </TechnologiesByCategoryContext.Provider>
    )
}