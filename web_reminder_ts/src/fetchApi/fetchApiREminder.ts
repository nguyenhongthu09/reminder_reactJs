import apiClient from "../config/axios";
import { IReminderType } from "../types/reminder.type";

export const getReminder = async (listId: string): Promise<IReminderType[]> => {
  const response = await apiClient.get(`/reminder?idlist=${listId}`);

  if (response.status !== 200) {
    throw new Error(`Error fetching reminders: Status code ${response.status}`);
  }

  const reminderData: IReminderType[] = response.data;
  return reminderData;
};



export const addNewReminder = async (
  reminder: IReminderType
): Promise<IReminderType> => {
  try {
    const response = await apiClient.post("/reminder", reminder);

    if (response.status === 201) {
      const createdReminderData = response.data;
      return createdReminderData;
    } else {
      console.error("Error adding new reminder, status code:", response.status);
      throw new Error(
        `Error adding new reminder, status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error during adding new reminder:", error);
    throw error;
  }
};

export const delREminder = async (id: string): Promise<void> => {
  await apiClient.delete(`/reminder/${id}`);
};

export const updateReminderData = async (
  id: string,
  newData: Partial<IReminderType>
): Promise<IReminderType | undefined> => {
  try {
    const response = await apiClient.patch(`/reminder/${id}`, newData);

    if (response.status === 200) {
      const updatedReminder = response.data;
      console.log(updatedReminder, "update reminder successful");
      return updatedReminder;
    }
  } catch (error) {
    console.error("Error updating reminder:", error);
  }
};

export const getReminderTotal = async (
  listId: string
): Promise<{ totalCount: number }> => {
  try {
    const response = await apiClient.get(`/reminder?idlist=${listId}`, {
      params: {
        _page: 1,
        _limit: 1,
      },
    });

    if (response.status === 200) {
      const totalCount = parseInt(response.headers["x-total-count"], 10);
      return { totalCount };
    } else {
      throw new Error("Failed to fetch reminder data");
    }
  } catch (error) {
    console.error("Error fetching reminder total:");
    return { totalCount: 0 };
  }
};

export const getReminderDone = async (
  listId: string
): Promise<{ totalDone: number }> => {
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
      const totalDone = parseInt(response.headers["x-total-count"], 10);
      return { totalDone };
    } else {
      throw new Error("Failed to fetch reminder data");
    }
  } catch (error) {
    console.error("Error fetching reminder total:");
    return { totalDone: 0 };
  }
};
