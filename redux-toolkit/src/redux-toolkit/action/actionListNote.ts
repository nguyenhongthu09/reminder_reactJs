import { createAsyncThunk } from "@reduxjs/toolkit";
import getAllList, {
  addNewList,
  updateListData,
  delList,
} from "../../fetchApi/fetchApiList";
import getColor from "../../fetchApi/fetchColor";
import { IColor } from "../../types/color.type";
import { IListNote } from "../../types/listNote.type";

export const getListNote = createAsyncThunk(
  "listNote/getListNote",
  async (_, thunkAPI) => {
    const res: IListNote[] = await getAllList();
    console.log(res, " API list");
    return res;
  }
);
export const getColors = createAsyncThunk(
  "colors/getColors",
  async (_, thunkAPI) => {
    const res: IColor[] = await getColor();
    console.log(res, " API color");

    return res;
  }
);

export const createList = createAsyncThunk(
  "listNote/createList",
  async (list: IListNote) => {
    const newList: IListNote = { ...list };
    const createdListNote = await addNewList(newList);
    return { ...createdListNote, totalDone: 0, totalCount: 0 };
  }
);

export const deleteListNote = createAsyncThunk(
  "listNote/deleteListNote",
  async (listId: string) => {
    await delList(listId);
  }
);

export const editListNote = createAsyncThunk(
  "listNote/editListNote",
  async (updatedList: IListNote) => {
    const { id, totalDone, totalCount, ...updateList } = updatedList;
    return await updateListData(id, updateList.name, updateList.isColor);
  }
);
