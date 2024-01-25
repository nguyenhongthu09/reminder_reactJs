import Context from "./Context";
import { useReducer } from "react";
import listNoteReducer , {initState} from "../reducers/list.reducer";
function Provider ({children}){

const [state , dispatch] = useReducer(listNoteReducer,initState )
const contextValue = { state, dispatch };
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export  default Provider