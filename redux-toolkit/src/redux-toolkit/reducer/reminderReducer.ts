import { createSlice } from "@reduxjs/toolkit";
import { IReminderType } from "../../types/reminder.type";
import {
  getReminders,
  addReminder,
  deleteReminder,
  updateReminder,
} from "../action/actionReminder";
interface IInitialState {
  reminders: IReminderType[];
}

const initialState: IInitialState = {
  reminders: [],
};

const reminderReducer = createSlice({
  name: "reminder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReminders.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload) {
          state.reminders = payload;
        }
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        const note = action.payload;
        if (note) {
          state.reminders.push(note);
        }
      })
      .addCase(deleteReminder.fulfilled, (state, action) => {
        const reminderId = action.meta.arg;
        if (reminderId) {
          state.reminders = state.reminders.filter(
            (reminder) => reminder.id !== reminderId
          );
        }
      })
      .addCase(updateReminder.fulfilled, (state, action) => {
        const editReminder = action.payload;
        const updatedReminderIndex = state.reminders.findIndex(
          (reminder) => reminder.id === editReminder.id
        );
        if (updatedReminderIndex !== -1) {
          state.reminders[updatedReminderIndex] = editReminder;
        }
      });
  },
});

export default reminderReducer.reducer;
