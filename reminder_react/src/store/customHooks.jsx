import Context from './Context'
import { useContext } from 'react'

export const useListsContext = () => {
    const { state, dispatch }  = useContext(Context)
        return { state, dispatch } 
  };