import React, { useState, useContext, ChangeEvent } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";

import { ReminderContext } from "../../context/reminder.context";
import { generateRandomStringId } from "../../utils/common";
import { ListContext } from "../../context/listNote.context";
import { ReminderType } from "../../types/reminder.type";
interface ReminderFormInListProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDoneButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReminderFormInList: React.FC<ReminderFormInListProps> = ({
  setIsReminderForm,
  setIsDoneButtonDisabled,
}) => {
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const contextReminder = useContext(ReminderContext);
  const contextList = useContext(ListContext);
  const handleBlur = async () => {
    if (reminderTitle.trim() === "") {
      setIsReminderForm(false);
      return;
    } else {
      const newReminder: ReminderType = {
        id: generateRandomStringId(),
        title: reminderTitle,
        status: false,
        idlist: contextList.selectedListId,
      };
      await contextReminder.addReminder(newReminder);

      setReminderTitle("");
      setIsReminderForm(false);
    }
    setReminderTitle("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newReminderTitle = e.target.value.trim();
    const isDoneButtonDisabled = newReminderTitle === "";
    setReminderTitle(newReminderTitle);
    setIsDoneButtonDisabled(isDoneButtonDisabled);
  };

  return (
    <div className="new-reminder">
      <div className="form-check item-reminders">
        <Checkbox />
        <Input autoFocus onBlur={handleBlur} onChange={handleChange} />
      </div>
    </div>
  );
};

export default ReminderFormInList;
