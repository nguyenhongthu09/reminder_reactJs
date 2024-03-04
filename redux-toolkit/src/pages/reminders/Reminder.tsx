import React, { useState } from "react";
import Reminder from "../../components/reminders/atomics/Reminder";
import { RootState } from "../../redux-toolkit/store/store";
import { useSelector } from "react-redux";

export default function ReminderDetail() {
  const [, setIsDoneButtonDisabled] = useState<boolean>(true);
  const reminders = useSelector(
    (state: RootState) => state.reminders.reminders
  );
  const deleReminder = () => {};
  const editReminder = () => {};
  return (
    <div>
      <Reminder
        setIsDoneButtonDisabled={setIsDoneButtonDisabled}
        reminder={reminders[0]}
        onDeleteReminder={deleReminder}
        onUpdateReminder={editReminder}
      />
    </div>
  );
}
