import { getReminderTotal, getReminderDone } from "./fetchApiREminder";
import apiClient from "../config/axios";
import { IListNote } from "../types/listNote.type";

export const getAllList = async (): Promise<IListNote[]> => {
  try {
    const response = await apiClient.get("/listNote");

    if (response.status === 200) {
      const listData: IListNote[] = response.data;

      const total = await Promise.all(
        listData.map(async (listItem) => {
          try {
            const reminderResponse = await getReminderTotal(listItem.id);
            const totalCount = reminderResponse.totalCount ?? 0;
            const reminderDoneResponse = await getReminderDone(listItem.id);
            const totalDone = reminderDoneResponse.totalDone ?? 0;

            return {
              id: listItem.id,
              name: listItem.name,
              isColor: listItem.isColor,
              totalCount: totalCount,
              totalDone: totalDone,
            };
          } catch (error) {
            console.error("Error fetching reminders:", error);
            return null;
          }
        })
      );
      const filteredTotal = total.filter(
        (item) => item !== null
      ) as IListNote[];

      return filteredTotal;
    } else {
      throw new Error("Failed to fetch list data");
    }
  } catch (error) {
    console.error("Error fetching list:", error);
    throw error;
  }
};

export const addNewList = async (list: IListNote): Promise<IListNote> => {
  try {
    const response = await apiClient.post("/listNote", list);

    if (response.status === 201) {
      console.log("Thêm mới thành công");
      const createdListNote = response.data;

      console.log("Dữ liệu trả về từ server:", createdListNote);
      return createdListNote;
    } else {
      console.error("Lỗi khi thêm mới, mã trạng thái:", response.status);
      throw new Error("Failed to add new list");
    }
  } catch (error) {
    console.error("Lỗi trong quá trình thêm mới:", error);
    throw error;
  }
};

export const delList = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/listNote/${id}`);
  } catch (error) {
    console.error("Lỗi khi xóa list:");
  }
};

export const updateListData = async (
  id: string,
  newName: string,
  newColor: string
): Promise<IListNote> => {
  try {
    const response = await apiClient.put(`/listNote/${id}`, {
      name: newName,
      isColor: newColor,
    });

    if (response.status === 200) {
      const updatedList = response.data;
      console.log("Cập nhật thành công", updatedList);
      return updatedList; // Trả về dữ liệu từ phản hồi của API
    } else {
      throw new Error("Failed to update list");
    }
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật:", error);
    throw error;
  }
};

export default getAllList;
