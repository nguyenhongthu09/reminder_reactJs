// import { getReminderTotal, getReminderDone } from "./fetchApiREminder";
import apiClient from "../config/axios.ts";

import { ListNote } from "../types/listNote.type.ts";
// import { Reminder } from "../types/reminder.type";

const getAllList = async (): Promise<ListNote[]> => {
  try {
    const response = await apiClient.get("/listNote");
    if (response.status === 200) {
      const listData: ListNote[] = response.data;
      return listData;
    }
    throw new Error("Failed to fetch list data");
  } catch (error) {
    console.error("Error fetching list:", error);
    throw error;
  }
};

export const addNewList = async (list: ListNote): Promise<void> => {
  try {
    const response = await apiClient.post("/listNote", list);
    if (response.status === 201) {
      const createdListNote: ListNote = response.data;
      console.log("Thêm mới thành công", createdListNote);
    } else {
      console.error("Lỗi khi thêm mới, mã trạng thái:", response.status);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình thêm mới:", error.message);
  }
};

export const delList = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/listNote/${id}`);
  } catch (error) {
    console.error("Error deleting list:", error);
  }
};

export const updateListData = async (
  id: string,
  newName: string,
  newColor: string
): Promise<void> => {
  try {
    const response = await apiClient.put(`/listNote/${id}`, {
      name: newName,
      isColor: newColor,
    });
    if (response.status === 200) {
      console.log("Update successful");
    } else {
      console.error("Update failed, status:", response.status);
    }
  } catch (error) {
    console.error("Error during update:", error);
  }
};

export default getAllList;
