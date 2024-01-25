import {
  GET_LIST_NOTE,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
} from "../store/constans";
import getAllList, {
  addNewList,
  updateListData,
  delList,
} from "../fetchApi/fetchApiList";

const getListNote = () => async (dispatch) => {
  try {
    const listData = await getAllList();
    dispatch({ type: GET_LIST_NOTE, payload: listData });
  } catch (error) {
    console.error("Error fetching list data:", error);
  }
};

const createListNote = async (list, dispatch) => {
  try {
    const { name, id, isColor } = list;
    await addNewList({ name, id, isColor });
    dispatch({ type: ADD_LIST, payload: { name, id, isColor } });
    console.log(list, " add new list");
  } catch (error) {
    console.error("Error adding list:", error);
  }
};

const updateListNote = async (listId, updatedList, dispatch) => {
  try {
    const { name, isColor } = updatedList; 
    await updateListData(listId, name, isColor); 
    dispatch({ type: EDIT_LIST, payload: { listId, updatedList } });
    console.log(updatedList, "update action");
  } catch (error) {
    console.error("Error updating list:", error);
  }
};

const deleteListNote = async (listId, dispatch) => {
  try {
    await delList(listId);
    dispatch({ type: DELETE_LIST, payload: listId });
  } catch (error) {
    console.error("Error deleting list:", error);
  }
};

export { getListNote, createListNote, updateListNote, deleteListNote };
