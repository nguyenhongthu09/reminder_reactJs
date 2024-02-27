import { useState } from "react";
import ReminderFormInList from "../../components/reminders/ReminderFormInList";

export default function ReminderFormAddInList() {
  const [, setIsDoneButtonDisabled] = useState<boolean>(true);
  const [, setIsReminderForm] = useState<boolean>(false);
  return (
    <ReminderFormInList
      setIsDoneButtonDisabled={setIsDoneButtonDisabled}
      setIsReminderForm={setIsReminderForm}
    />
  );
}
