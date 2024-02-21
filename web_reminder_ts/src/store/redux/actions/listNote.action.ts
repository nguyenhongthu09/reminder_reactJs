import {
  GET_LIST_NOTE,
  ADD_LIST_NOTE,
  EDIT_LIST_NOTE,
  DELETE_LIST_NOTE,
  GET_COLORS,
  UPDATE_LIST_TOTAL_COUNT,
} from "../../../types/actionTypesListNote.type";
import getAllList, {
  addNewList,
  updateListData,
  delList,
} from "../../../fetchApi/fetchApiList";
import getColor from "../../../fetchApi/fetchColor";
import { Dispatch } from "redux";
import { IListNote } from "../../../types/listNote.type";
import { IColor } from "../../../types/color.type";

const getListNote = () => async (dispatch: Dispatch) => {
  try {
    const listData: IListNote[] = await getAllList();
    dispatch({ type: GET_LIST_NOTE, payload: listData });
    console.log(listData, " listnote");
  } catch (error) {
    console.error("Error fetching list data:", error);
  }
};

const getColors = () => async (dispatch: Dispatch) => {
  try {
    const listData: IColor[] = await getColor();
    dispatch({ type: GET_COLORS, payload: listData });
  } catch (error) {
    console.error("Error fetching list data:", error);
  }
};

const addListNote = (list: IListNote) => async (dispatch: Dispatch) => {
  try {
    const newList = { ...list };
    const createdListNote = await addNewList(newList);
    const updatedListNote = {
      ...createdListNote,
      totalDone: 0,
      totalCount: 0,
    };
    dispatch({ type: ADD_LIST_NOTE, payload: updatedListNote });
    console.log(list, " add new list");
  } catch (error) {
    console.error("Error adding list:", error);
  }
};

const updateListNote =
  (updatedList: IListNote) => async (dispatch: Dispatch) => {
    try {
      const { id, totalDone, totalCount, ...updateList } = updatedList;
      await updateListData(id, updateList.name, updateList.isColor);
      dispatch({ type: EDIT_LIST_NOTE, payload: { updatedList } });
      console.log(updatedList, "update action");
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

const deleteListNote = (listId: string) => async (dispatch: Dispatch) => {
  try {
    await delList(listId);
    dispatch({ type: DELETE_LIST_NOTE, payload: { listId } });
    console.log(listId, "xoa thanh cong");
  } catch (error) {
    console.error("Error deleting list:", error);
  }
};

const updateListTotalCount = (listId: string) => ({
  type: UPDATE_LIST_TOTAL_COUNT,
  payload: { listId },
});

export {
  updateListTotalCount,
  getListNote,
  addListNote,
  updateListNote,
  deleteListNote,
  getColors,
};
