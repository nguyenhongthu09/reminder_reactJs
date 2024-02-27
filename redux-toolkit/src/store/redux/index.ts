import { combineReducers } from "redux";
import listReducer from "./reducers/listNote.reducers";
import reminderReducer from "./reducers/reminder.reducer";

const rootReducer = combineReducers({
  listReducer,
  reminderReducer,
});

export default rootReducer;
