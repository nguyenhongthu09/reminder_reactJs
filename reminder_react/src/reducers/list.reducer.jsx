import {
  GET_LIST_NOTE,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
} from "../store/constans";

const initState = {
  listNote: [],
};

function listNoteReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_NOTE:
      return { ...state, listNote: payload };

    case ADD_LIST:
      return { ...state, listNote: [...state.listNote, payload] };

    case EDIT_LIST:
      return {
        ...state,
        listNote: state.listNote.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };

    case DELETE_LIST:
      return {
        ...state,
        listNote: state.listNote.filter((item) => item.id !== payload),
      };

    default:
      throw new Error("loi");
  }
}

export default listNoteReducer;
export { initState };
