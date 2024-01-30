import React, { useState } from "react";
import Dropdown from "../core/Dropdown";
import Button from "../core/Button";
import Input from "../core/Input";
import Icon from "../core/Icon";
import Checkbox from "../core/Checkbox";
import PropTypes from "prop-types";

function Reminder({
  reminder,
  setIsDoneButtonDisabled,
  onDeleteReminder,
  onUpdateReminder,
}) {
  const [editedNote, setEditedNote] = useState({
    id: null,
    value: "",
    statusCheckbox: null,
  });

  const action = [
    {
      id: 1,
      key: "delete",
      icon: (
        <Button className="dropdown-item">
          <Icon type="delete"></Icon>
        </Button>
      ),
      onClick: (id, status) => {
        handleButtonClick(id, status);
      },
    },
  ];

  const handleEditValue = (noteId, newValue) => {
    setEditedNote({ id: noteId, value: newValue, statusCheckbox: null });
    setIsDoneButtonDisabled(true);
    console.log("updateType in handleEditValue:", "title");
    onUpdateReminder(noteId, newValue, "title");
  };

  const handleStatus = (noteId, newStatus) => {
    setEditedNote({ id: noteId, statusCheckbox: newStatus });
    onUpdateReminder(noteId, newStatus, "status");
  };

  const handleButtonClick = (id, status) => {
    console.log(id, " xoa thanh cong");
    onDeleteReminder(id, status);
  };

  const handleInputChange = async (noteId, newValue) => {
    const isDoneButtonDisabled = newValue.trim() === "";
    setEditedNote({ id: noteId, value: newValue, statusCheckbox: null });
    setIsDoneButtonDisabled(isDoneButtonDisabled);
  };

  return (
    <div key={reminder.id} id={reminder.id}>
      <div
        className="reminder__detail"
        id={reminder.id}
        data-listnote-id={reminder.idlist}
      >
        <div className="items-list-reminder">
          <div className="form-check item-reminder">
            <Checkbox
              id={reminder.id}
              checked={reminder.status}
              onChange={(e) => handleStatus(reminder.id, e.target.checked)}
            />
            <Input
              className={`input_reminder ${reminder.status ? "doimau" : ""}`}
              onChange={(e) => handleInputChange(reminder.id, e.target.value)}
              value={
                editedNote?.id === reminder.id
                  ? editedNote.value
                  : reminder.title
              }
              onBlur={(e) => handleEditValue(reminder.id, e.target.value)}
            />
          </div>
        </div>
        <div className="icon-detail-reminder-del">
          <Dropdown
            id={reminder.id}
            actions={action}
            onClick={() => handleButtonClick(reminder.id, reminder.status)}
          />
        </div>
      </div>
    </div>
  );
}

Reminder.propTypes = {
  reminder: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    idlist: PropTypes.string,
    status: PropTypes.bool,
  }),
  onEditReminder: PropTypes.func,
  onReminderDeleSuccess: PropTypes.func,
  isDoneButtonDisabled: PropTypes.func,
};

export default Reminder;
