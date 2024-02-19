import {
  GET_LIST_NOTE,
  ADD_LIST_NOTE,
  EDIT_LIST_NOTE,
  DELETE_LIST_NOTE,
  GET_COLORS,
} from "../../../types/actionTypes.type";
import { IListNote } from "../../../types/listNote.type";
import { IColor } from "../../../types/color.type";

const initialState: IInitialState = {
  listNote: [],
  colors: [],
};
interface IInitialState {
  listNote: IListNote[];
  colors: IColor[];
}

const listReducer = (
  state: IInitialState = initialState,
  action: { type: string; payload: any }
) => {
  console.log(state, action, "action");
  const { type, payload } = action;
  switch (type) {
    
    case GET_LIST_NOTE:
      return { ...state, listNote: payload };

    case GET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };

    case ADD_LIST_NOTE:
      return { ...state, listNote: [...state.listNote, payload] };

    case EDIT_LIST_NOTE:
      return {
        ...state,
        listNote: state.listNote.map((list: IListNote) =>
          list.id === payload.updatedList.id ? payload.updatedList : list
        ),
      };

    case DELETE_LIST_NOTE:
      const id = payload.listId;
      return {
        ...state,
        listNote: state.listNote.filter((list: IListNote) => list.id !== id),
      };

    default:
      return state;
  }
};

export default listReducer;
