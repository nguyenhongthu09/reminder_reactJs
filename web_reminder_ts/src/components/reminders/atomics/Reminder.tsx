import React, { useState } from "react";
import Dropdown from "../../core/Dropdown";
import Button from "../../core/Button";
import Input from "../../core/Input";
import Icon from "../../core/Icon";
import Checkbox from "../../core/Checkbox";
import { IReminderType } from "../../../types/reminder.type";
import { IAction } from "../../../types/action.type";
import Loading from "../../core/Loading";
import { useNavigate, useParams } from "react-router-dom";
interface IReminderProps {
  reminder: IReminderType;
  setIsDoneButtonDisabled: (disabled: boolean) => void;
  onDeleteReminder: (id: string, status: boolean) => void;
  onUpdateReminder: (
    noteId: string,
    newValue: string | boolean,
    updateType: string
  ) => void;
}

const Reminder: React.FC<IReminderProps> = ({
  reminder,
  setIsDoneButtonDisabled,
  onDeleteReminder,
  onUpdateReminder,
}) => {
  const [editedNote, setEditedNote] = useState<IReminderType>({
    id: "",
    title: "",
    status: false,
    idlist: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();
  const action: IAction[] = [
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

  const handleEditValue = async (noteId: string, newValue: string) => {
    setEditedNote({ ...reminder, title: newValue });
    setIsDoneButtonDisabled(true);
    setLoading(true);
    await onUpdateReminder(noteId, newValue, "title");
    navigate(`/lists/${params.id}/reminders/${params.name}`);
    setLoading(false);
  };

  const handleStatus = async (noteId: string, newStatus: boolean) => {
    setEditedNote({ ...reminder, status: newStatus });
    setLoading(true);
    await onUpdateReminder(noteId, newStatus, "status");
    navigate(`/lists/${params.id}/reminders/${params.name}`);
    setLoading(false);
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
        {loading && <Loading />}
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
