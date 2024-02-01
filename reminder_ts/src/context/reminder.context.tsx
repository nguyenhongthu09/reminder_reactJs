import { useState, createContext, useContext } from "react";
import React from "react";
import {
  getReminder,
  delREminder,
  addNewReminder,
  updateReminderData,
} from "../fetchApi/fetchApiREminder.ts";
import { ListContext } from "./listNote.context.tsx";
import { ReminderType } from "../types/reminder.type.ts";
import { ReminderProviderProps } from "../types/reminder.provider.type.ts";
import { ReminderContextType } from "../types/reminder.context.type.ts";
export const ReminderContext = createContext<ReminderContextType>({
  reminders: [],
  getAllReminders: () => Promise.resolve(),
  deleteReminder: () => Promise.resolve(),
  addReminder: () => Promise.resolve(),
  updateReminder: () => Promise.resolve(),
});

export const ReminderProvider = ({ children }: ReminderProviderProps) => {
  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const contextList = useContext(ListContext);

  const getAllReminders = async () => {
    if (contextList.selectedListId) {
      const reminderData = await getReminder(contextList.selectedListId);
      setReminders(reminderData);
    }
  };

  const addReminder = async (newReminder: ReminderType) => {
    try {
      await addNewReminder({
        id: newReminder.id,
        title: newReminder.title,
        status: false,
        idlist: newReminder.idlist,
      });
      setReminders((prevReminder) => [...prevReminder, newReminder]);

      const listNote = contextList.listNote.find(
        (list) => list.id === newReminder.idlist
      );
      console.log(listNote, "lisst");

      if (listNote) {
        const updatedTotalCount = (listNote.totalCount || 0) + 1;
        console.log(updatedTotalCount, " total");

        contextList.updateListNoteCount(newReminder.idlist, updatedTotalCount);
      } else {
        console.error("Không tìm thấy listnote để cập nhật totalCount");
      }
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    }
  };

  const updateReminder = async (
    idEditReminder: string,
    newData: string | boolean,
    updateType: string
  ) => {
    let updatedReminder;
    if (updateType === "title") {
      updatedReminder = await updateReminderData(idEditReminder, {
        title: newData as string,
      });
    } else if (updateType === "status") {
      updatedReminder = await updateReminderData(idEditReminder, {
        status: newData as boolean,
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

  const deleteReminder = async (idDeleReminder: string, status: boolean) => {
    await delREminder(idDeleReminder);
    setReminders((prevReminder) =>
      prevReminder.filter((note) => note.id !== idDeleReminder)
    );
    const newTotalCount = reminders.length - 1;
    if (status) {
      contextList.updateListTotalCount(newTotalCount);
      const newTotalDone = reminders.filter(
        (reminder) => reminder.id !== idDeleReminder && reminder.status
      ).length;
      contextList.updateTotalDone(newTotalDone);
    } else {
      contextList.updateListTotalCount(newTotalCount);
    }
    console.log(idDeleReminder, "xoa thanh cong");
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
