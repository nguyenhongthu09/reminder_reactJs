import {
  ADD_REMINDER,
  GET_REMINDERS,
  DELETE_REMINDER,
  EDIT_REMINDER,
} from "../../../types/actionTypesReminder.type";
import {
  getReminder,
  addNewReminder,
  delREminder,
  updateReminderData,
} from "../../../fetchApi/fetchApiREminder";
import { Dispatch } from "redux";
import { IReminderType } from "../../../types/reminder.type";
import { updateListTotalCount } from "./listNote.action";

const getReminders = (selectedListId: string) => async (dispatch: Dispatch) => {
  try {
    if (selectedListId) {
      const reminderData: IReminderType[] = await getReminder(selectedListId);
      dispatch({ type: GET_REMINDERS, payload: reminderData });
      console.log(reminderData, "remidner");
    }
  } catch (error) {
    console.error("Error fetching reminder data:", error);
  }
};
const addReminder =
  (newReminder: IReminderType) => async (dispatch: Dispatch) => {
    try {
      const newNote = {
        id: newReminder.id,
        title: newReminder.title,
        status: false,
        idlist: newReminder.idlist,
      };
      const createdReminder = await addNewReminder(newNote);
      dispatch({ type: ADD_REMINDER, payload: createdReminder });
      dispatch(updateListTotalCount(newReminder.idlist));
      console.log(newReminder, "them moi thanh cong");
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:");
    }
  };

const deleteReminder =
  (idDeleReminder: string) => async (dispatch: Dispatch) => {
    try {
      await delREminder(idDeleReminder);
      dispatch({ type: DELETE_REMINDER, payload: { id: idDeleReminder } });
      console.log(idDeleReminder, " xoa remin action");
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

const updateReminder =
  (idEditReminder: string, newData: string | boolean, updateType: string) =>
  async (dispatch: Dispatch) => {
    try {
      let updatedReminder: IReminderType;

      if (updateType === "title") {
        updatedReminder = await updateReminderData(idEditReminder, {
          title: newData as string,
        });
      } else if (updateType === "status") {
        updatedReminder = await updateReminderData(idEditReminder, {
          status: newData as boolean,
        });
      } else {
        console.error("Invalid update type");
        return;
      }

      dispatch({ type: EDIT_REMINDER, payload: updatedReminder });
      console.log(idEditReminder, newData, updateType, "edit action");
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

export { getReminders, addReminder, deleteReminder, updateReminder };
