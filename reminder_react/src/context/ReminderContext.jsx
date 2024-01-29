import { useState, createContext } from "react";
import React from "react";
import {
  getReminder,
  delREminder,
  addNewReminder,
  updateReminderData,
} from "../fetchApi/fetchApiREminder";

export const ReminderContext = createContext({});

export const ReminderProvider = ({ children }) => {
  const [reminder, setReminder] = useState([]);
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
    } else {
      console.error("Loại cập nhật không hợp lệ");
      return;
    }
    console.log(updatedReminder, " Cập nhật thành công");
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
