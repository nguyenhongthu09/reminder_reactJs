import { combineReducers } from "redux";
import listReducer from "./reducers/listNote.reducers"; 

const rootReducer = combineReducers({
  listReducer,
});

export default rootReducer;
