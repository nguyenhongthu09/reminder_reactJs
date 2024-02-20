import React, { useState, ChangeEvent } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import { generateRandomStringId } from "../../utils/common";
import { IReminderType } from "../../types/reminder.type";
import { addReminder } from "../../store/redux/actions/reminder.action";
import { connect } from "react-redux";
interface IReminderFormInListProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDoneButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  addReminder: (newReminder: IReminderType) => Promise<void>;
  selectedListId: string;
}

const ReminderFormInList: React.FC<IReminderFormInListProps> = ({
  setIsReminderForm,
  setIsDoneButtonDisabled,
  addReminder,
  selectedListId,
}) => {
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const handleBlur = async (): Promise<void> => {
    if (reminderTitle.trim() === "") {
      setIsReminderForm(false);
      return;
    } else {
      const newReminder: IReminderType = {
        id: generateRandomStringId(),
        title: reminderTitle,
        status: false,
        idlist: selectedListId,
      };
      await addReminder(newReminder);
      console.log(newReminder, "them moi o form");

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



const mapDispathToProps = (dispatch: any) => {
  return {
    addReminder: (newReminder: IReminderType) =>
      dispatch(addReminder(newReminder)),
  };
};

export default connect(null, mapDispathToProps)(ReminderFormInList);
