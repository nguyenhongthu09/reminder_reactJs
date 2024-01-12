import React, { Component } from "react";
import Dropdown from "../core/Dropdown";
import Button from "../core/Button";
import Input from "../core/Input";
import Icon from "../core/Icon";
import Checkbox from "../core/Checkbox";
import PropTypes from "prop-types";

class Reminder extends Component {
  constructor() {
    super();
    this.state = {
      editedNote: {
        id: null,
        value: "",
      },
      statusCheckbox: null,
      inputText: "",
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
    console.log(newValue, " vaue");
    this.setState(
      {
        editedNote: { id: noteId, value: newValue },
      },
      () => this.props.onEdit(noteId, newValue)
    );
  };

  handleStatus = (noteId, newStatus) => {
    this.setState({
      statusCheckbox: newStatus,
    });
    this.props.onUpdateStatus(noteId, newStatus);
  };

  handleButtonClick = (id, status) => {
    if (this.props.onReminderDeleSuccess) {
      this.props.onReminderDeleSuccess(id, status);
    }
  };

  handleInputChange = async (noteId, newValue) => {
    this.setState({
      editedNote: { id: noteId, value: newValue },
      inputText: newValue,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputText !== this.state.inputText) {
      const isDoneButtonDisabled = this.state.inputText.trim() === "";
      this.props.updateIsDoneButtonDisabled(isDoneButtonDisabled);
    }
  }

  render() {
    const { reminder, isDoneButtonDisabled } = this.props;

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
                onChange={(e) =>
                  this.handleStatus(reminder.id, e.target.checked)
                }
              />
              <Input
                isDoneButtonDisabled={isDoneButtonDisabled}
                className={`input_reminder ${reminder.status ? "doimau" : ""}`}
                onChange={(e) => {
                  this.handleInputChange(reminder.id, e.target.value);
                }}
                value={
                  this.state.editedNote?.id === reminder.id
                    ? this.state.editedNote.value
                    : reminder.title
                }
                onBlur={(e) => this.handleEdit(reminder.id, e.target.value)}
              />
            </div>
          </div>
          <div className="icon-detail-reminder-del">
            <Dropdown
              id={reminder.id}
              actions={this.action}
              onClick={(id) =>
                this.handleButtonClick(reminder.id, reminder.status)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

Reminder.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    idlist: PropTypes.string,
    status: PropTypes.bool,
  }),
  isDoneButtonDisabled: PropTypes.bool,
  onEdit: PropTypes.func,
  onReminderDeleSuccess: PropTypes.func,
  onUpdateStatus: PropTypes.func,
  updateIsDoneButtonDisabled: PropTypes.func,
};

export default Reminder;
