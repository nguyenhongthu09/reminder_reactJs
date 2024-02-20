import {
  GET_REMINDERS,
  ADD_REMINDER,
  EDIT_REMINDER,
  DELETE_REMINDER,
} from "../../../types/actionTypesReminder.type";
import { IReminderType } from "../../../types/reminder.type";

const initialState: IInitialState = {
  reminders: [],
};
interface IInitialState {
  reminders: IReminderType[];
}

const reminderReducer = (
  state: IInitialState = initialState,
  action: { type: string; payload: any }
) => {
  console.log(state, action, "action reminder");
  const { type, payload } = action;
  switch (type) {
    case GET_REMINDERS:
      return { ...state, reminders: payload };
    case ADD_REMINDER:
      return { ...state, reminders: [...state.reminders, payload] };
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter(
          (note: IReminderType) => note.id !== payload.id
        ),
      };
    case EDIT_REMINDER:
      return {
        ...state,
        reminders: state.reminders.map((note) =>
          note.id === payload.id ? payload : note
        ),
      };

    default:
      return state;
  }
};

export default reminderReducer;
