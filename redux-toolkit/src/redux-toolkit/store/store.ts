import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../reducer/listReducer";
import reminderReducer from "../reducer/reminderReducer";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    listNote: listReducer,
    reminders: reminderReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
