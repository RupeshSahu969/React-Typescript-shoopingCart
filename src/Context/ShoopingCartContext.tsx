import React from 'react'
import {createContext,useContext,ReactNode} from "react" ;


const ShoopingCartContext = createContext({})
  
export function useShoppingCart(){
    return useContext(ShoopingCartContext)
}


type ShoppingCartProviderProps={
    children : ReactNode
}

export function ShoppingCartProvider({children} : ShoppingCartProviderProps){
    
    return(
        <ShoopingCartContext.Provider value={{}}>
            {children}
        </ShoopingCartContext.Provider>
    )
}



















