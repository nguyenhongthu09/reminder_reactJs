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
    } else {
      console.error("Lỗi khi thêm mới, mã trạng thái:", response.status);
      return null;
    }
  } catch (error) {
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

export const updateReminderStatus = async (id, newStatus) => {
  const response = await fetch(`${API_URL}/reminder/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  });

  if (response.ok) {
    const updateStatus = await response.json();
    console.log(updateStatus, "update reminder thanh cong");
    return updateStatus;
  } else {
    throw new Error("Cập nhật trạng thái thất bại");
  }
};

export const getReminderTotal = async (listId) => {
  const url = new URL(`${API_URL}/reminder?idlist=${listId}`);
  let page = parseInt(url.searchParams.get("_page"));
  if (!Number.isInteger(page) || page <= 0) {
    page = 1;
  }
  const limit = 1;

  url.searchParams.append("_page", page);
  url.searchParams.append("_limit", limit);
  const response = await fetch(url, {
    method: "GET",
  });

  if (response.status === 200) {
    const reminderData = await response.json();
    const totalCount = response.headers.get("X-Total-Count");
    return { reminderData, totalCount };
  }
};

export const getReminderDone = async (listId) => {
  const url = new URL(`${API_URL}/reminder?idlist=${listId}&status=true`);
  let page = parseInt(url.searchParams.get("_page"));
  if (!Number.isInteger(page) || page <= 0) {
    page = 1;
  }
  const limit = 1;

  url.searchParams.append("_page", page);
  url.searchParams.append("_limit", limit);
  const response = await fetch(url, {
    method: "GET",
  });

  if (response.status === 200) {
    const reminderDataDone = await response.json();
    const totalDone = response.headers.get("X-Total-Count");
    return { reminderDataDone, totalDone };
  }
};
