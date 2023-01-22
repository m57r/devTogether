import {  createContext, useEffect, useState, useCallback } from 'react';
import { getAllTechnologiesByCategory } from '../requests/displayRequests';

export const TechnologiesByCategoryContext = createContext(); 

export const TechnologiesByCategoryProvider = ({children}) => {

    const [ technologiesByCategory, setTechnologiesByCategory ] = useState([]);
    const [ groupedOptions, setGroupedOptions ] = useState({})

    const specialities = [
        { value : 'front', label : 'Front', color : '#e32e45', name : 'speciality'},
        { value : 'back', label : 'Back', color : 'black', name: 'speciality'},
        { value : 'fullStack', label : 'FullStack', color : '#5123d4', name : 'speciality'}
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
                    color : `#${technology.color}`, 
                    name : 'technologies'
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
        <TechnologiesByCategoryContext.Provider value={ { fetchTechnologiesByCategory, technologiesByCategory, groupedOptions, specialities } }>
                {children}
        </TechnologiesByCategoryContext.Provider>
    )
}