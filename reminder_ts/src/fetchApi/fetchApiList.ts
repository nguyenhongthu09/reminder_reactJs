import { getReminderTotal, getReminderDone } from "./fetchApiREminder.ts";
import apiClient from "../config/axios.ts";
import { ListNote } from "../types/listNote.type.ts";
// const getAllList = async () => {
//   try {
//     const response = await apiClient.get("/listNote");

//     if (response.status === 200) {
//       const listData = response.data;
//       const a = await Promise.all(
//         listData.map(async (listItem) => {
//           const { reminderData, totalCount, totalDone, reminderDataDone } =
//             await fetchTotals(listItem.id);
//           listItem.reminders = reminderData || [];
//           listItem.totalCount = parseInt(totalCount, 10) || 0;
//           listItem.totalDone = parseInt(totalDone, 10) || 0;
//           listItem.remindersDone = reminderDataDone || [];
//           return listItem;
//         })
//       );

//       return a;
//     }
//   } catch (error) {
//     console.error("Error fetching list:", error);
//   }
// };

// export const fetchTotals = async (listId) => {
//   const { reminderData, totalCount } = await getReminderTotal(listId);
//   const { reminderDataDone, totalDone } = await getReminderDone(listId);
//   return { reminderData, totalCount, totalDone, reminderDataDone };
// };

// export const addNewList = async (list) => {
//   try {
//     const response = await apiClient.post("/listNote", list);

//     if (response.status === 201) {
//       console.log("Thêm mới thành công");
//       const createdListNote = response.data;
//       console.log("Dữ liệu trả về từ server:", createdListNote);
//     } else {
//       console.error("Lỗi khi thêm mới, mã trạng thái:", response.status);
//     }
//   } catch (error) {
//     console.error("Lỗi trong quá trình thêm mới:", error.message);
//   }
// };

// export const delList = async (id) => {
//   await apiClient.delete(`/listNote/${id}`);
// };

// export const updateListData = async (id, newName, newColor) => {
//   try {
//     const response = await apiClient.put(`/listNote/${id}`, {
//       name: newName,
//       isColor: newColor,
//     });

//     if (response.status === 200) {
//       const updatedList = response.data;

//       console.log("Update successful", updatedList);
//       return updatedList;
//     }
//   } catch (error) {
//     console.error("Error during update:", error);
//   }
// };
export const getAllList = async () => {
  try {
    const response = await apiClient.get("/listNote");

    if (response.status === 200) {
      const listData = response.data;
      console.log(listData, " listnote");

      const total = await Promise.all(
        listData.map(async (listItem: any) => {
          const reminderResponse = await getReminderTotal(listItem.id);
          console.log(reminderResponse, " reminder");
          
          const reminderData = reminderResponse?.reminderData;
         
          
          const totalCount = reminderResponse?.totalCount ?? 0;
          console.log(totalCount, "totalCount");
          

          const reminderDoneResponse = await getReminderDone(listItem.id);
          console.log(reminderDoneResponse,  "remidner done");
          const reminderDataDone = reminderDoneResponse?.reminderDataDone;
          const totalDone = reminderDoneResponse?.totalDone ?? 0;
          return {
            id: listItem.id,
            name: listItem.name,
            isColor: listItem.isColor,
            totalCount: totalCount,
            totalDone: totalDone,
            reminders: reminderData?.reminders || [],
            remindersDone: reminderDataDone?.remindersDone || [],
          };
        })
      );
      return total;
    }
  } catch (error) {
    console.error("Error fetching list:", error);
  }
};

export const addNewList = async (list: ListNote) => {
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

export const delList = async (id: string) => {
  try {
    await apiClient.delete(`/listNote/${id}`);
  } catch (error) {
    console.error("Lỗi khi xóa list:", error.message);
  }
};

export const updateListData = async (
  id: string,
  newName: string,
  newColor: string
) => {
  try {
    const response = await apiClient.put(`/listNote/${id}`, {
      name: newName,
      isColor: newColor,
    });

    if (response.status === 200) {
      const updatedList = response.data;
      console.log("Cập nhật thành công", updatedList);
      return updatedList;
    }
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật:", error);
  }
};
export default getAllList;