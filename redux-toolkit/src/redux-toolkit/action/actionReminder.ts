import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReminder,
  addNewReminder,
  delREminder,
  updateReminderData,
} from "../../fetchApi/fetchApiREminder";
import { IReminderType } from "../../types/reminder.type";

export const getReminders = createAsyncThunk(
  "reminders/getReminders",
  async (selectedListId: string, thunkAPI) => {
    if (selectedListId) {
      const reminderData: IReminderType[] = await getReminder(selectedListId);
      console.log(reminderData, "reminder");
      return reminderData;
    }
  }
);

export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async (newReminder: IReminderType, thunkAPI) => {
    const newNote = {
      id: newReminder.id,
      title: newReminder.title,
      status: false,
      idlist: newReminder.idlist,
    };
    const createdReminder = await addNewReminder(newNote);
    console.log(newReminder, "successfully added");
    return createdReminder;
  }
);

export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async (idDeleReminder: string, thunkAPI) => {
    await delREminder(idDeleReminder);
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

    console.log(idEditReminder, newData, updateType, "edit action");
    return updatedReminder;
  }
);
