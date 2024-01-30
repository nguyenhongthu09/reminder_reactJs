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
  const [reminder, setReminder] = useState([]);
  const contextList = useContext(ListContext);
  const getAllReminder = async (selectedListId) => {
    const reminderData = await getReminder(selectedListId);
    setReminder(reminderData);
  };

  const addReminder = async (newReminder) => {
    await addNewReminder({
      id: newReminder.id,
      title: newReminder.title,
      status: false,
      idlist: newReminder.idlist,
    });
    setReminder((prevReminder) => [...prevReminder, newReminder]);
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
        const updatedReminders = reminder.map((note) =>
          note.id === updatedReminder.id ? updatedReminder : note
        );
        const newTotalDone = updatedReminders.filter(
          (note) => note.status
        ).length;

        contextList.updateTotalDone(newTotalDone);
        setReminder(updatedReminders);
      }
    } else {
      console.error("Loại cập nhật không hợp lệ");
      return;
    }
   
  };

  const deleteReminder = async (idDeleNote) => {
    await delREminder(idDeleNote);
    setReminder((prevReminder) =>
      prevReminder.filter((note) => note.id !== idDeleNote)
    );
    console.log(idDeleNote, "xoa thanh cong");
  };

  const value = {
    reminder,
    setReminder,
    getAllReminder,
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
