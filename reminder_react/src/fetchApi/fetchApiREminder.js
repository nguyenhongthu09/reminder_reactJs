
import apiClient from "../config/axios";
export const getReminder = async (listId) => {
  try {
    const response = await apiClient.get(`/reminder?idlist=${listId}`);

    if (response.status === 200) {
      const reminderData = response.data;
      return reminderData;
    }
  } catch (error) {
    console.error("Error fetching reminders:", error.message);
    return null;
  }
};

export const addNewReminder = async (reminder) => {
  try {
    const response = await apiClient.post("/reminder", reminder);

    if (response.status === 201) {
      const createdReminderData = response.data;
      return createdReminderData;
    } else {
      console.error("Error adding new reminder, status code:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error during adding new reminder:", error.message);
    return null;
  }
};

export const delREminder = async (id) => {
  await apiClient.delete(`/reminder/${id}`);
};

export const updateReminderData = async (id, data) => {
  try {
    const response = await apiClient.patch(`/reminder/${id}`, data);

    if (response.status === 200) {
      const updatedReminder = response.data;
      console.log(updatedReminder, "update reminder successful");
      return updatedReminder;
    }
  } catch (error) {
    console.error("Error updating reminder:", error.message);
    return null;
  }
};

export const getReminderTotal = async (listId) => {
  try {
    const response = await apiClient.get(`/reminder?idlist=${listId}`, {
      params: {
        _page: 1,
        _limit: 1,
      },
    });

    if (response.status === 200) {
      const reminderData = response.data;
      const totalCount = response.headers["x-total-count"];
      return { reminderData, totalCount };
    }
  } catch (error) {
    console.error("Error fetching reminder total:", error.message);
    return null;
  }
};

export const getReminderDone = async (listId) => {
  try {
    const response = await apiClient.get(
      `/reminder?idlist=${listId}&status=true`,
      {
        params: {
          _page: 1,
          _limit: 1,
        },
      }
    );

    if (response.status === 200) {
      const reminderDataDone = response.data;
      const totalDone = response.headers["x-total-count"];
      return { reminderDataDone, totalDone };
    }
  } catch (error) {
    console.error("Error fetching done reminder:", error.message);
    return null;
  }
};
