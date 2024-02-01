import { ReminderType } from "./reminder.type";
interface ReminderContextType {
  reminders: ReminderType[];
  getAllReminders: () => Promise<void>;
  deleteReminder: (idDeleReminder: string, status: boolean) => Promise<void>;
  addReminder: (newReminder: ReminderType) => Promise<void>;
  updateReminder: (
    idEditReminder: string,
    newData: string | boolean,
    updateType: string
  ) => Promise<void>;
}

export type { ReminderContextType };
