import { API_URL } from "../constants/apiURL";

export const getReminder = async (listId) => {
    const response = await fetch(`${API_URL}/reminder?idlist=${listId}`, {
      method: "GET",
    });
  
    if (response.status === 200) {
      const reminderData = await response.json();
      // console.log(reminderData, "danh sach reminder");
      return reminderData;
    }
  };

  export const addNewReminder = async (reminder) => {
    try {
    const response = await fetch(`${API_URL}/reminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reminder),
    });
  
    if (response.status === 201) {
      const createdReminderData = await response.json();
      return createdReminderData;
    }
    else {
      console.error("Lỗi khi thêm mới, mã trạng thái:", response.status);
      return null;
    }}
    catch (error) {
      console.error("Lỗi trong quá trình thêm mới:", error.message);
      return null;
    }
  };

  export const delREminder = async (id) => {
    await fetch(`${API_URL}/reminder/${id}`, {
      method: "DELETE",
    });
  };

  export const updateReminderData = async (id, newName) => {
    const response = await fetch(`${API_URL}/reminder/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newName }),
    });
  
    if (response.ok) {
      const updatedReminder = await response.json();
        console.log(updatedReminder, "update reminder thanh cong");
        return updatedReminder;
    }
  };
    