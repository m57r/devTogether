import {  createContext, useEffect, useState } from 'react';
import { getAllTechnologiesByCategory } from '../requests/displayRequests';

export const TechnologiesByCategoryContext = createContext(); 

export const TechnologiesByCategoryProvider = ({children}) => {

    const [ technologiesByCategory, setTechnologiesByCategory ] = useState([]);

    const fetchTechnologiesByCategory = async () => {

        try{
            const response = await getAllTechnologiesByCategory(); 
            setTechnologiesByCategory(response); 
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => { fetchTechnologiesByCategory() }, [])

    return(
        <TechnologiesByCategoryContext.Provider value={ { fetchTechnologiesByCategory, technologiesByCategory } }>
                {children}
        </TechnologiesByCategoryContext.Provider>
    )
}