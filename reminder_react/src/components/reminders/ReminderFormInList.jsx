import React, { useState, useContext } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import PropTypes from "prop-types";
import { ReminderContext } from "../../context/ReminderContext";
import { generateRandomStringId } from "../../utils/common";
import { ListContext } from "../../context/ListContext";

function ReminderFormInList({ setIsReminderForm, setIsDoneButtonDisabled }) {
  const [reminderTitle, setReminderTitle] = useState("");
  const contextReminder = useContext(ReminderContext);
  const contextList = useContext(ListContext);
  const handleBlur = async () => {
    if (reminderTitle.trim() === "") {
      setIsReminderForm(false);
      return;
    } else {
      const newReminder = {
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

  const handleChange = (e) => {
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
}

ReminderFormInList.propTypes = {
  onCancelFormAdd: PropTypes.func,
  onBlur: PropTypes.func,
  onReminderTitleChange: PropTypes.func,
};

export default ReminderFormInList;
