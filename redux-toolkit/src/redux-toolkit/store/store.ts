import { configureStore } from "@reduxjs/toolkit";
import listNoteSlice from "../reducer/listReducer";
import reminderSlice from "../reducer/reminderReducer";
import globalState from "../globalState/loading";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    listNote: listNoteSlice,
    reminders: reminderSlice,
    loading: globalState,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
