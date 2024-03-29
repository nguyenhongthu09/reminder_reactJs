import React, { useState, ChangeEvent } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import { generateRandomStringId } from "../../utils/common";
import { IReminderType } from "../../types/reminder.type";
import { addReminder } from "../../redux-toolkit/action/actionReminder";
import { useAppDispatch } from "../../redux-toolkit/store/store";
interface IReminderFormInListProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDoneButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  idParam?: string;
}

const ReminderFormInList: React.FC<IReminderFormInListProps> = ({
  setIsReminderForm,
  setIsDoneButtonDisabled,
  idParam,
}) => {
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleBlur = async (): Promise<void> => {
    if (!idParam) {
      return;
    }
    if (reminderTitle.trim() === "") {
      setIsReminderForm(false);
      return;
    } else {
      const newReminder: IReminderType = {
        id: generateRandomStringId(),
        title: reminderTitle,
        status: false,
        idlist: idParam,
      };

      await dispatch(addReminder(newReminder));
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
