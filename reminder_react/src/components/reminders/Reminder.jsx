import React, { Component } from "react";
import Dropdown from "../core/Dropdown";
import Button from "../core/Button";
import Input from "../core/Input";
import Icon from "../core/Icon";
import { updateReminderStatus } from "../../fetchApi/fetchApiREminder";
import Loading from "../core/Loading";
import Checkbox from "../core/Checkbox";
class Reminder extends Component {
  constructor() {
    super();
    this.state = {
      editedNote: {
        id: null,
        value: "",
      },
      checkboxStatus: {},
      loading: false,
    };
    this.action = [
      {
        id: 1,
        key: "delete",
        icon: (
          <Button className="dropdown-item">
            <Icon type="delete"></Icon>
          </Button>
        ),
        onClick: (id, status) => {
          this.handleButtonClick(id, status);
        },
      },
    ];
  }

  handleEdit = (noteId, newValue) => {
    this.setState(
      {
        editedNote: { id: noteId, value: newValue },
      },
      () => this.props.onEdit && this.props.onEdit(noteId, newValue)
    );
  };

  handleButtonClick = (id, status) => {
    console.log(id, status, "log gia tri cua remidner");
    if (this.props.onReminderDeleSuccess) {
      this.props.onReminderDeleSuccess(id, status);
    }
  };

  handleInputChange = async (noteId, newValue) => {
    this.setState({
      editedNote: { id: noteId, value: newValue },
    });
  };

  handleInputStatus = async (noteId) => {
    try {
      this.setState({ loading: true });
      const newStatus = !this.state.checkboxStatus[noteId];
      await updateReminderStatus(noteId, newStatus);

      const updatedReminders = [...this.props.reminders];
      const indexToUpdate = updatedReminders.findIndex(
        (note) => note.id === noteId
      );

      const updatedReminder = {
        ...updatedReminders[indexToUpdate],
        status: newStatus,
      };
      updatedReminders[indexToUpdate] = updatedReminder;

      updatedReminders.sort((a, b) => {
        if (a.status && !b.status) {
          return 1;
        } else if (!a.status && b.status) {
          return -1;
        } else {
          return 0;
        }
      });

      const totalDone = updatedReminders.filter(
        (reminder) => reminder.status
      ).length;
      this.setState(
        (prevState) => ({
          checkboxStatus: {
            ...prevState.checkboxStatus,
            [noteId]: newStatus,
          },
        }),
        () => {
          this.props.onUpdateReminders(updatedReminders, totalDone);
        }
      );
      this.setState({ loading: false });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error.message);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.reminders !== this.props.reminders) {
      const checkboxStatus = {};
      this.props.reminders.forEach((note) => {
        checkboxStatus[note.id] = note.status;
      });
      this.setState({ checkboxStatus });
    }
  }

  render() {
    const { selectedListId, reminders } = this.props;
    const { loading } = this.state;

    const sortedReminders = [...reminders].sort((a, b) =>
      a.status && !b.status ? 1 : !a.status && b.status ? -1 : 0
    );
    const hasReminderData = sortedReminders.length === 0;

    return (
      <>
        {loading && <Loading />}
        <h1 className="title-list">{this.props.nameList}</h1>
        {hasReminderData && <div className="thong-bao">Empty list !!!</div>}
        {sortedReminders.map((note) => (
          <div key={note.id} id={note.id}>
            {note.idlist === selectedListId && (
              <div
                className="reminder__detail"
                id={note.id}
                data-listnote-id={note.idlist}
              >
                <div className="items-list-reminder">
                  <div className="form-check item-reminder">
                    <Checkbox
                      id={`id-input-${note.id}`}
                      checked={this.state.checkboxStatus[note.id]}
                      onChange={(e) =>
                        this.handleInputStatus(note.id, e.target.checked)
                      }
                    />
                    <Input
                      className={`input_reminder doimau ${
                        this.state.checkboxStatus[note.id] ? "checked" : ""
                      }`}
                      onChange={(e) =>
                        this.handleInputChange(note.id, e.target.value)
                      }
                      value={
                        this.state.editedNote?.id === note.id
                          ? this.state.editedNote.value
                          : note.title
                      }
                      onBlur={(e) => this.handleEdit(note.id, e.target.value)}
                    />
                  </div>
                </div>
                <div className="icon-detail-reminder-del">
                  <Dropdown
                    id={note.id}
                    actions={this.action}
                    onClick={(id) =>
                      this.handleButtonClick(note.id, note.status)
                    }
                  ></Dropdown>
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
}

export default Reminder;
