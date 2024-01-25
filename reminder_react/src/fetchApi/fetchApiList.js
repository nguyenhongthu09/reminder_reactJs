import { getReminderTotal, getReminderDone } from "./fetchApiREminder";
import apiClient from "../config/axios";

const getAllList = async () => {
  try {
    const response = await apiClient.get("/listNote");

    if (response.status === 200) {
      const listData = response.data;
      const a = await Promise.all(
        listData.map(async (listItem) => {
          const { reminderData, totalCount, totalDone, reminderDataDone } =
            await fetchTotals(listItem.id);
          listItem.reminders = reminderData || [];
          listItem.totalCount = parseInt(totalCount, 10) || 0;
          listItem.totalDone = parseInt(totalDone, 10) || 0;
          listItem.remindersDone = reminderDataDone || [];
          return listItem;
        })
      );
     
      return a;
    }
  } catch (error) {
    console.error("Error fetching list:", error);
  }
};

export const fetchTotals = async (listId) => {
  const { reminderData, totalCount } = await getReminderTotal(listId);
  const { reminderDataDone, totalDone } = await getReminderDone(listId);
  return { reminderData, totalCount, totalDone, reminderDataDone };
};

export const addNewList = async (list) => {
  try {
    const response = await apiClient.post("/listNote", list);

    if (response.status === 201) {
      console.log("Thêm mới thành công");

      const createdListNote = response.data;
      console.log("Dữ liệu trả về từ server:", createdListNote);
    } else {
      console.error("Lỗi khi thêm mới, mã trạng thái:", response.status);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình thêm mới:", error.message);
  }
};

export const delList = async (id) => {
  await apiClient.delete(`/listNote/${id}`);
};

export const updateListData = async (id, newName, newColor) => {
  try {
    const response = await apiClient.put(`/listNote/${id}`, {
      name: newName,
      isColor: newColor,
    });

    if (response.status === 200) {
      const updatedList = response.data;
      // Xử lý dữ liệu trả về từ server
      // const processedData = {
      //   id: updatedList.id,
      //   name: updatedList.name.name, // Lấy trường 'name' từ đối tượng 'name'
      //   isColor: updatedList.name.isColor, // Lấy trường 'isColor' từ đối tượng 'name'
      // };
      // console.log("Update successful", processedData);
      console.log("Update successful", updatedList);
      return updatedList; // Trả về dữ liệu đã được xử lý
    }
  } catch (error) {
    console.error("Error during update:", error);
  }
};

export default getAllList;
