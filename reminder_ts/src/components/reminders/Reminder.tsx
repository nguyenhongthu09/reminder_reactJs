import React, { useState } from "react";
import Dropdown from "../core/Dropdown.tsx";
import Button from "../core/Button.tsx";
import Input from "../core/Input.tsx";
import Icon from "../core/Icon.tsx";
import Checkbox from "../core/Checkbox.tsx";
import { ReminderType } from "../../types/reminder.type.ts";

interface ReminderProps {
  reminder: ReminderType;
  setIsDoneButtonDisabled: (disabled: boolean) => void;
  onDeleteReminder: (id: string, status: boolean) => void;
  onUpdateReminder: (
    noteId: string,
    newValue: string | boolean,
    updateType: string
  ) => void;
}

const Reminder: React.FC<ReminderProps> = ({
  reminder,
  setIsDoneButtonDisabled,
  onDeleteReminder,
  onUpdateReminder,
}) => {
  const [editedNote, setEditedNote] = useState<ReminderType>({
    id: "",
    title: "",
    status: false,
    idlist: "",
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
      onClick: () => {
        handleButtonClick(reminder.id, reminder.status);
      },
    },
  ];

  const handleEditValue = (noteId: string, newValue: string) => {
    setEditedNote({ ...reminder, title: newValue });
    setIsDoneButtonDisabled(true);
    console.log("updateType in handleEditValue:", "title");
    onUpdateReminder(noteId, newValue, "title");
  };

  const handleStatus = (noteId: string, newStatus: boolean) => {
    setEditedNote({ ...reminder, status: newStatus });
    onUpdateReminder(noteId, newStatus, "status");
  };

  const handleButtonClick = (id: string, status: boolean) => {
    console.log(id, " xoa thanh cong");
    onDeleteReminder(id, status);
  };

  const handleInputChange = async (noteId: string, newValue: string) => {
    const isDoneButtonDisabled = newValue.trim() === "";
    setEditedNote({ ...reminder, title: newValue });
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
                editedNote.id === reminder.id
                  ? editedNote.title
                  : reminder.title
              }
              onBlur={(e) => handleEditValue(reminder.id, e.target.value)}
            />
          </div>
        </div>
        <div className="icon-detail-reminder-del">
          <Dropdown id={reminder.id} actions={action} />
        </div>
      </div>
    </div>
  );
};

export default Reminder;