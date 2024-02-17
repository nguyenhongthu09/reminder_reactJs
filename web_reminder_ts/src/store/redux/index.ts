import { combineReducers } from "redux";
import listReducer from "./reducers/listNote.reducers"; // import your reducers

const rootReducer = combineReducers({
  listReducer,
});

export default rootReducer;
