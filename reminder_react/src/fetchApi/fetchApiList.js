import { API_URL } from "../constants/apiURL";
import { getReminderTotal, getReminderDone } from "./fetchApiREminder";

const getAllList = async () => {
  try {
    const response = await fetch(`${API_URL}/listNote`, {
      method: "GET",
    });

    if (response.status === 200) {
      const listData = await response.json();
   const a =   await Promise.all(
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
          console.log(a, "log thu a");
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

export default getAllList;

export const addNewList = async (list) => {
  try {
    const response = await fetch(`${API_URL}/listNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });

    if (response.status === 201) {
      console.log("Thêm mới thành công");

      const createdListNote = await response.json();
      console.log("Dữ liệu trả về từ server:", createdListNote);
    } else {
      console.error("Lỗi khi thêm mới, mã trạng thái:", response.status);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình thêm mới:", error.message);
  }
};

export const delList = async (id) => {
  await fetch(`${API_URL}/listNote/${id}`, {
    method: "DELETE",
  });
};

export const updateListData = async (id, newName, newColor) => {
  try {
    const response = await fetch(`${API_URL}/listNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        isColor: newColor,
      }),
    });

    if (response.ok) {
      console.log("Update successful");
    } else {
      console.error("Update failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during update:", error);
  }
};
