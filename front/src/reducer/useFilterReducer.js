import { useReducer } from 'react'; 
import { SET_VALUE_INPUT, RESET } from '../actions/actions'; 

//initial state
export const filterInitialState = {
    searchValue : '', 
    technologies : '', 
}; 

// reducer
export function filterReducer(oldState, action){
    switch(action.type){
        case SET_VALUE_INPUT : {
            return {
                ...oldState, 
                [action.payload.name] : action.payload.value
            }
        }
        case RESET : {
            return filterInitialState
        }

        default : 
            return oldState
    }
}

export function useFilterReducer(){
    const [ filterState, filterDispatch ] = useReducer(filterReducer, filterInitialState); 
    return {
        filterState, filterDispatch
    }
}
