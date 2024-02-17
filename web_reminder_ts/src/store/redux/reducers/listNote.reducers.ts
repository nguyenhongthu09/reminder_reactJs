import {
  GET_LIST_NOTE,
  ADD_LIST_NOTE,
  EDIT_LIST_NOTE,
  DELETE_LIST_NOTE,
  UPDATE_LIST_NOTE_COUNT,
  UPDATE_LIST_TOTAL_COUNT,
  UPDATE_TOTAL_DONE,
  GET_COLORS,
} from "../../../types/actionTypes.type";
import { IListNote } from "../../../types/listNote.type";
import { IColor } from "../../../types/color.type";

const initialState: IListState = {
  listNote: [],
  colors: [],
};
interface IListState {
  listNote: IListNote[];
  colors: IColor[];
}

const listReducer = (
  state: IListState = initialState,
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

    // case UPDATE_LIST_NOTE_COUNT:
    //   return {
    //     ...state.listNote,
    //     listNote: state.listNote.map((list: IListNote) =>
    //       list.id === action.payload.listId
    //         ? { ...list, totalCount: action.payload.newTotalCount }
    //         : list
    //     ),
    //   };
    // case UPDATE_LIST_TOTAL_COUNT:
    //   return {
    //     ...state.listNote,
    //     listNote: state.listNote.map((list: IListNote) =>
    //       list.id === state.selectedListId
    //         ? { ...list, totalCount: action.payload.newTotalCount }
    //         : list
    //     ),
    //   };
    // case UPDATE_TOTAL_DONE:
    //   return {
    //     ...state.listNote,
    //     listNote: state.listNote.map((list: IListNote) =>
    //       list.id === state.selectedListId
    //         ? { ...list, totalDone: action.payload.newTotalDone }
    //         : list
    //     ),
    //   };

    default:
      return state;
  }
};

export default listReducer;
