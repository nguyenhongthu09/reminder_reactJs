import { useState } from "react";
import ReminderForm from "../../components/reminders/ReminderForm";

export default function ReminderFormAdd() {
  const [, setIsReminderForm] = useState<boolean>(false);
  return (
    <div>
      <ReminderForm setIsReminderForm={setIsReminderForm} />
    </div>
  );
}
