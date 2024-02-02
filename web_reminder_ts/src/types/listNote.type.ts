import { ReminderType } from "./reminder.type";
interface ListNote {
  name: string;
  isColor: string;
  id: string;
  reminders?: ReminderType[];
  totalCount?: number;
  totalDone?: number;
  remindersDone?: ReminderType[];
}

export type { ListNote };
