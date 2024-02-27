import React, { useState, ChangeEvent } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import { generateRandomStringId } from "../../utils/common";
import { IReminderType } from "../../types/reminder.type";
import Loading from "../core/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { addReminder } from "../../redux-toolkit/action/actionReminder";
import { useAppDispatch } from "../../redux-toolkit/store/store";
interface IReminderFormInListProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDoneButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReminderFormInList: React.FC<IReminderFormInListProps> = ({
  setIsReminderForm,
  setIsDoneButtonDisabled,
}) => {
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const handleBlur = async (): Promise<void> => {
    if (!params.id) {
      console.error("ID is undefined");
      return;
    }
    if (reminderTitle.trim() === "") {
      setIsReminderForm(false);
      navigate(`/lists/${params.id}/reminders/${params.name}`);
      return;
    } else {
      const newReminder: IReminderType = {
        id: generateRandomStringId(),
        title: reminderTitle,
        status: false,
        idlist: params.id,
      };
      setLoading(true);
      await dispatch(addReminder(newReminder));
      navigate(`/lists/${params.id}/reminders/${params.name}`);
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

export default ReminderFormInList;