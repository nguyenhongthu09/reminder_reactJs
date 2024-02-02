import apiClient from "../config/axios";
import { ReminderType } from "../types/reminder.type";
export const getReminder = async (listId: string) => {
  try {
    const response = await apiClient.get(`/reminder?idlist=${listId}`);

    if (response.status === 200) {
      const reminderData = response.data;
      return reminderData;
    }
  } catch (error) {
    console.error("Error fetching reminders:");
    return null;
  }
};

export const addNewReminder = async (reminder: ReminderType) => {
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
    console.error("Error during adding new reminder:");
    return null;
  }
};

export const delREminder = async (id: string) => {
  await apiClient.delete(`/reminder/${id}`);
};

export const updateReminderData = async (id: string, data: any) => {
  try {
    const response = await apiClient.patch(`/reminder/${id}`, data);

    if (response.status === 200) {
      const updatedReminder = response.data;
      console.log(updatedReminder, "update reminder successful");
      return updatedReminder;
    }
  } catch (error) {
    console.error("Error updating reminder:");
    return null;
  }
};

export const getReminderTotal = async (
  listId: string
): Promise<{ reminderData: any; totalCount: number }> => {
  try {
    const response = await apiClient.get(`/reminder?idlist=${listId}`, {
      params: {
        _page: 1,
        _limit: 1,
      },
    });

    if (response.status === 200) {
      const reminderData = response.data;
      const totalCount = parseInt(response.headers["x-total-count"], 10); 
      return { reminderData, totalCount };
    } else {
      throw new Error("Failed to fetch reminder data");
    }
  } catch (error) {
    console.error("Error fetching reminder total:");
    return { reminderData: null, totalCount: 0 };
  }
};

export const getReminderDone = async (listId: string): Promise<{ reminderDataDone: any; totalDone: number }> => {
  try {
    const response = await apiClient.get(`/reminder?idlist=${listId}&status=true`, {
      params: {
        _page: 1,
        _limit: 1,
      },
    });

    if (response.status === 200) {
      const reminderDataDone = response.data;
      const totalDone = parseInt(response.headers["x-total-count"], 10); 
      return { reminderDataDone, totalDone };
    } else {
      throw new Error("Failed to fetch reminder data");
    }
  } catch (error) {
    console.error("Error fetching reminder total:");
    return { reminderDataDone: null, totalDone: 0 };
  }
};
