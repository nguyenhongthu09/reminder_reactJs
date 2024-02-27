import { createSlice } from "@reduxjs/toolkit";
import { IListNote } from "../../types/listNote.type";
import { IColor } from "../../types/color.type";
import {
  getListNote,
  getColors,
  createList,
  editListNote,
  deleteListNote,
} from "../action/actionListNote";
interface IInitialState {
  listNote: IListNote[];
  colors: IColor[];
}

const initialState: IInitialState = {
  listNote: [],
  colors: [],
};

const listReducer = createSlice({
  name: "listNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListNote.fulfilled, (state, action) => {
        state.listNote = action.payload;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.colors = action.payload;
      })
      .addCase(createList.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload) {
          state.listNote.push(payload);
        }
      })
      .addCase(deleteListNote.fulfilled, (state, action) => {
        const listId = action.meta.arg;
        if (listId) {
          state.listNote = state.listNote.filter((list) => list.id !== listId);
        }
      })
      .addCase(editListNote.fulfilled, (state, action) => {
        const updatedList = action.payload;
        state.listNote = state.listNote.map((list) =>
          list.id === updatedList.id ? updatedList : list
        );
      });
  },
});

export default listReducer.reducer;
