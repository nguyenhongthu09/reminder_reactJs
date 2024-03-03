import { createAsyncThunk } from "@reduxjs/toolkit";
import getAllList, {
  addNewList,
  updateListData,
  delList,
  getDetailListNote,
} from "../../fetchApi/fetchApiList";
import getColor from "../../fetchApi/fetchColor";
import { IColor } from "../../types/color.type";
import { IListNote } from "../../types/listNote.type";
import { setLoading } from "../globalState/loading";

export const getListNote = createAsyncThunk(
  "listNote/getListNote",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const res: IListNote[] = await getAllList();
    thunkAPI.dispatch(setLoading(false));
    console.log(res, " API list");
    return res;
  }
);

export const getDetailList = createAsyncThunk(
  "listNote/getListNoteById",
  async (list:  IListNote) => {
    const res: IListNote = await getDetailListNote(list);
    console.log(res, " listnote detail");
    return res;
  }
);
export const getColors = createAsyncThunk(
  "colors/getColors",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const res: IColor[] = await getColor();
    console.log(res, " API color");
    thunkAPI.dispatch(setLoading(false));
    return res;
  }
);

export const createList = createAsyncThunk(
  "listNote/createList",
  async (list: IListNote, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const newList: IListNote = { ...list };
    const createdListNote = await addNewList(newList);
    thunkAPI.dispatch(setLoading(false));
    return { ...createdListNote, totalDone: 0, totalCount: 0 };
  }
);

export const deleteListNote = createAsyncThunk(
  "listNote/deleteListNote",
  async (listId: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    await delList(listId);
    thunkAPI.dispatch(setLoading(false));
  }
);

export const editListNote = createAsyncThunk(
  "listNote/editListNote",
  async (updatedList: IListNote, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { id, totalDone, totalCount, ...updateList } = updatedList;
    thunkAPI.dispatch(setLoading(false));
    return await updateListData(id, updateList.name, updateList.isColor);
  }
);
