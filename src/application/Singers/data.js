import React from 'react'
import {fromJS} from 'immutable'

export const CategoryDataContext = React.createContext({})

export const CHANGE_CATEGORY = 'singer/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singer/CHANGE_ALPHA'

export function reducer(state,action){
    switch(action.type){
        case CHANGE_CATEGORY:
            return state.set('category',action.data)
        case CHANGE_ALPHA:
            return state.set('alpha',action.data)
        default:
            return state
    }
}

export const Data = props=>{
    const [data,dispatch] = React.useReducer(reducer,fromJS({
        category:'',
        alpha:''
    }))
    return (
        <CategoryDataContext.Provider value={{data,dispatch}}>
            {props.children}
        </CategoryDataContext.Provider>
    )
}
