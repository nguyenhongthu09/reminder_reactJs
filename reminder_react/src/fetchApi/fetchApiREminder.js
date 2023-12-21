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