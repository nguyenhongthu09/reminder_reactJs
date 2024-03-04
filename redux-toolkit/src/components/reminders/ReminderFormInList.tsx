import React, { useState, ChangeEvent } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import { generateRandomStringId } from "../../utils/common";
import { IReminderType } from "../../types/reminder.type";
import Loading from "../core/Loading";
import { useNavigate } from "react-router-dom";
import { addReminder } from "../../redux-toolkit/action/actionReminder";
import { useAppDispatch, RootState } from "../../redux-toolkit/store/store";
import { useSelector } from "react-redux";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.loading);
  const handleBlur = async (): Promise<void> => {
    if (!idParam) {
      return;
    }
    if (reminderTitle.trim() === "") {
      setIsReminderForm(false);
      navigate(`/lists/${idParam}/reminders`);
      return;
    } else {
      const newReminder: IReminderType = {
        id: generateRandomStringId(),
        title: reminderTitle,
        status: false,
        idlist: idParam,
      };

      await dispatch(addReminder(newReminder));
      navigate(`/lists/${idParam}/reminders`);
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
      {isLoading && <Loading />}
      <div className="form-check item-reminders">
        <Checkbox />
        <Input autoFocus onBlur={handleBlur} onChange={handleChange} />
      </div>
    </div>
  );
};

export default ReminderFormInList;
