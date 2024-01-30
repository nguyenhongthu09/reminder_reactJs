import { useState, createContext, useContext } from "react";
import React from "react";
import {
  getReminder,
  delREminder,
  addNewReminder,
  updateReminderData,
} from "../fetchApi/fetchApiREminder";
import { ListContext } from "./ListContext";

export const ReminderContext = createContext({});

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const contextList = useContext(ListContext);
  const getAllReminders = async () => {
    const reminderData = await getReminder(contextList.selectedListId);
    setReminders(reminderData);
  };

  const addReminder = async (newReminder) => {
    await addNewReminder({
      id: newReminder.id,
      title: newReminder.title,
      status: false,
      idlist: newReminder.idlist,
    });
    setReminders((prevReminder) => [...prevReminder, newReminder]);
    const newTotalCount = reminders.length + 1;
    contextList.updateListTotalCount(newTotalCount);
    console.log(newReminder, " newreminder context");
  };
  const updateReminder = async (editedNoteId, newData, updateType) => {
    let updatedReminder;
    if (updateType === "title") {
      updatedReminder = await updateReminderData(editedNoteId, {
        title: newData,
      });
    } else if (updateType === "status") {
      updatedReminder = await updateReminderData(editedNoteId, {
        status: newData,
      });

      if (updatedReminder) {
        const updatedReminders = reminders.map((note) =>
          note.id === updatedReminder.id ? updatedReminder : note
        );
        const newTotalDone = updatedReminders.filter(
          (note) => note.status
        ).length;

        contextList.updateTotalDone(newTotalDone);
        setReminders(updatedReminders);
      }
    } else {
      console.error("Loại cập nhật không hợp lệ");
      return;
    }
  };

  const deleteReminder = async (idDeleNote, status) => {
    await delREminder(idDeleNote);
    setReminders((prevReminder) =>
      prevReminder.filter((note) => note.id !== idDeleNote)
    );
    const newTotalCount = reminders.length - 1;
    if (status) {
      contextList.updateListTotalCount(newTotalCount);
      const newTotalDone = reminders.filter(
        (reminder) => reminder.id !== idDeleNote && reminder.status
      ).length;
      contextList.updateTotalDone(newTotalDone);
    } else {
      contextList.updateListTotalCount(newTotalCount);
    }
    console.log(idDeleNote, "xoa thanh cong");
  };

  const value = {
    reminders,
    getAllReminders,
    deleteReminder,
    addReminder,
    updateReminder,
  };
  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
};
