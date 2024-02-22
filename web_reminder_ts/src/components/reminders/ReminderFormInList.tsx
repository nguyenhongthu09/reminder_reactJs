import React, { useState, ChangeEvent, useContext } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import { generateRandomStringId } from "../../utils/common";
import { IReminderType } from "../../types/reminder.type";
import { addReminder } from "../../store/redux/actions/reminder.action";
import { connect } from "react-redux";
import { ListContext } from "../../store/context/listNote.context";
import Loading from "../core/Loading";
interface IReminderFormInListProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDoneButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  addReminder: (newReminder: IReminderType) => Promise<void>;
}

const ReminderFormInList: React.FC<IReminderFormInListProps> = ({
  setIsReminderForm,
  setIsDoneButtonDisabled,
  addReminder,
}) => {
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(ListContext);
  const handleBlur = async (): Promise<void> => {
    if (reminderTitle.trim() === "") {
      setIsReminderForm(false);
      return;
    } else {
      const newReminder: IReminderType = {
        id: generateRandomStringId(),
        title: reminderTitle,
        status: false,
        idlist: context.selectedListId,
      };
      setLoading(true);
      await addReminder(newReminder);
      console.log(newReminder, "them moi o form");
      setLoading(false);
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
       {loading && <Loading />}
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
