import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../store/redux/index"

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export { store };
