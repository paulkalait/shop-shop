import React, { createContext, useContext } from "react"
import { useProductReducer } from "./reducers"


const StoreContext = createContext()
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props}) => {
    const [state, dispatch ] = useProductReducer({
        products: [], 
        categories: [], 
        currentCatgory: '',
    })
    //use this to confirm it works 
    console.log(state)
                //dispatch is the method we execute to update our state. it will look for an action object assed in an its argumnet
    return <Provider value={[state , dispatch]} {...props} />
}

const useStoreContext = () => {
    return useContext(StoreContext)
}

export { StoreProvider, useStoreContext }  