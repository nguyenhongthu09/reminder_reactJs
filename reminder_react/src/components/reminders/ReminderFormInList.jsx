import React, { useState, useContext } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import PropTypes from "prop-types";
import { ReminderContext } from "../../context/ReminderContext";
import { generateRandomStringId } from "../../untils/common";
import { ListContext } from "../../context/ListContext";

function ReminderFormInList({
  onCancelFormAdd,
  setReminderForm,
  setIsDoneButtonDisabled,
}) {
  const [reminderTitle, setReminderTitle] = useState("");
  const contextReminder = useContext(ReminderContext);
  const contextList = useContext(ListContext);
  const handleBlur = async () => {
    if (reminderTitle.trim() === "") {
      onCancelFormAdd();
      return;
    } else {
      const newReminder = {
        id: generateRandomStringId(),
        title: reminderTitle,
        status: false,
        idlist: contextList.selectedListId,
      };
      await contextReminder.addReminder(newReminder);
      const newTotalCount = contextReminder.reminder.length + 1;
      contextList.updateListTotalCount(newTotalCount);
      setReminderTitle("");
      setReminderForm(false);
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
