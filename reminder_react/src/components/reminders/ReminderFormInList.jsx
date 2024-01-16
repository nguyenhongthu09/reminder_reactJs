import React, { useState } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import PropTypes from "prop-types";

function ReminderFormInList({
  onCancelFormAdd,
  onBlur,
  onReminderTitleChange,
}) {
  const [reminderTitle, setReminderTitle] = useState("");
  const handleBlur = () => {
    if (reminderTitle.trim() === "") {
      onCancelFormAdd();
      return;
    }
    onBlur({
      reminderTitle: reminderTitle,
    });

    setReminderTitle("");
  };

  const handleChange = (e) => {
    const newReminderTitle = e.target.value.trim();
    const isDoneButtonDisabled = newReminderTitle === "";
    setReminderTitle(newReminderTitle);
    onReminderTitleChange(newReminderTitle, isDoneButtonDisabled);
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
