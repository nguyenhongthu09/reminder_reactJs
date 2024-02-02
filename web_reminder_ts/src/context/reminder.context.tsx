import { useState, createContext, useContext, ReactNode } from "react";
import React from "react";
import {
  getReminder,
  delREminder,
  addNewReminder,
  updateReminderData,
} from "../fetchApi/fetchApiREminder";
import { ListContext } from "./listNote.context";
import { IReminderType } from "../types/reminder.type";

interface IReminderProvider {
  children: ReactNode;
}

interface IReminderContextType {
  reminders: IReminderType[];
  getAllReminders: () => Promise<void>;
  deleteReminder: (idDeleReminder: string, status: boolean) => Promise<void>;
  addReminder: (newReminder: IReminderType) => Promise<void>;
  updateReminder: (
    idEditReminder: string,
    newData: string | boolean,
    updateType: string
  ) => Promise<void>;
}

export const ReminderContext = createContext<IReminderContextType>({
  reminders: [],
  getAllReminders: () => Promise.resolve(),
  deleteReminder: () => Promise.resolve(),
  addReminder: () => Promise.resolve(),
  updateReminder: () => Promise.resolve(),
});

export const ReminderProvider = ({ children }: IReminderProvider) => {
  const [reminders, setReminders] = useState<IReminderType[]>([]);
  const contextList = useContext(ListContext);

  const getAllReminders = async (): Promise<void> => {
    if (contextList.selectedListId) {
      const reminderData = await getReminder(contextList.selectedListId);
      console.log(reminderData, "remidner");

      setReminders(reminderData);
    }
  };

  const addReminder = async (newReminder: IReminderType): Promise<void> => {
    try {
      const newNote = {
        id: newReminder.id,
        title: newReminder.title,
        status: false,
        idlist: newReminder.idlist,
      };
      const createdReminder = await addNewReminder(newNote);
      setReminders((prevReminder) => [...prevReminder, createdReminder]);

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
      console.error("Lỗi khi thêm mới reminder:");
    }
  };

  const updateReminder = async (
    idEditReminder: string,
    newData: string | boolean,
    updateType: string
  ): Promise<void> => {
    let updatedReminder: IReminderType;

    if (updateType === "title") {
      updatedReminder = await updateReminderData(idEditReminder, {
        title: newData as string,
      });
    } else if (updateType === "status") {
      updatedReminder = await updateReminderData(idEditReminder, {
        status: newData as boolean,
      });
    } else {
      console.error("Loại cập nhật không hợp lệ");
      return;
    }

    if (updatedReminder) {
      const updatedReminders = reminders.map((note) =>
        note.id === updatedReminder!.id ? updatedReminder! : note
      );
      const newTotalDone = updatedReminders.filter(
        (note) => note.status
      ).length;

      contextList.updateTotalDone(newTotalDone);
      setReminders(updatedReminders.filter(Boolean));
    }
  };

  const deleteReminder = async (
    idDeleReminder: string,
    status: boolean
  ): Promise<void> => {
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
