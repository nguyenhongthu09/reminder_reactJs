import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReminder,
  addNewReminder,
  delREminder,
  updateReminderData,
} from "../../fetchApi/fetchApiREminder";
import { IReminderType } from "../../types/reminder.type";
import { setLoading } from "../globalState/loading";

export const getReminders = createAsyncThunk(
  "reminders/getReminders",
  async (selectedListId: string, thunkAPI) => {
    if (selectedListId) {
      thunkAPI.dispatch(setLoading(true));
      const reminderData: IReminderType[] = await getReminder(selectedListId);
      thunkAPI.dispatch(setLoading(false));
      console.log(reminderData, "reminder");
      return reminderData;
    }
  }
);

export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async (newReminder: IReminderType, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const newNote = {
      id: newReminder.id,
      title: newReminder.title,
      status: false,
      idlist: newReminder.idlist,
    };
    const createdReminder = await addNewReminder(newNote);
    thunkAPI.dispatch(setLoading(false));
    console.log(newReminder, "successfully added");
    return createdReminder;
  }
);

export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async (idDeleReminder: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    await delREminder(idDeleReminder);
    thunkAPI.dispatch(setLoading(false));
    console.log(idDeleReminder, "deleted reminder action");
  }
);

export const updateReminder = createAsyncThunk(
  "reminders/updateReminder",
  async (
    {
      idEditReminder,
      newData,
      updateType,
    }: {
      idEditReminder: string;
      newData: string | boolean;
      updateType: string;
    },
    thunkAPI
  ) => {
    let updatedReminder: IReminderType | undefined;
    thunkAPI.dispatch(setLoading(true));
    if (updateType === "title") {
      updatedReminder = await updateReminderData(idEditReminder, {
        title: newData as string,
      });
    } else if (updateType === "status") {
      updatedReminder = await updateReminderData(idEditReminder, {
        status: newData as boolean,
      });
    } else {
      throw new Error("Invalid update type");
    }
    thunkAPI.dispatch(setLoading(false));
    console.log(idEditReminder, newData, updateType, "edit action");
    return updatedReminder;
  }
);
