import React, { Component } from "react";
import RenderReminder from "./Reminder";
import {
  delREminder,
  getReminder,
  addNewReminder,
  updateReminderData,
} from "../../fetchApi/fetchApiREminder";
import Button from "../core/Button";
import Input from "../core/Input";
class RemindersList extends Component {
  constructor() {
    super();
    this.state = {
      reminders: [],
      hasReminderData: false,
      showNewReminderForm: false,
      reminderTitle: "",
      shouldAddReminderOnBlur: false,
      isAddingFromButtonClick: false,
      isAddingFromBlur: false,
      editedValue: "",
    };
  }

  // GET REMINDERS
  getReminders = async () => {
    try {
      const reminderData = await getReminder(this.props.selectedListId);
      const hasReminderData = reminderData.length > 0;
      this.setState({
        reminders: reminderData,
        hasReminderData: hasReminderData,
      });
    } catch (error) {
      console.error("Error fetching reminder:", error.message);
    }
  };

  // ADD REMINDER
  handleSubmitAddReminder = async () => {
    const { selectedListId } = this.props;
    const { reminderTitle, shouldAddReminderOnBlur } = this.state;
    if (shouldAddReminderOnBlur || this.state.isAddingFromButtonClick) {
      this.setState({ isAdding: true });
      const newReminder = {
        title: reminderTitle,
        status: false,
        idlist: selectedListId,
      };

      try {
        const response = await addNewReminder(newReminder);
        console.log(response, " them moi thanh cong");
        const addedReminder = response ? response : null;
        if (addedReminder) {
          this.setState((prevState) => ({
            reminders: [...prevState.reminders, addedReminder],
            reminderTitle: "",
            showNewReminderForm: false,
            idReminder: addedReminder.id,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi thêm mới reminder:", error.message);
      } finally {
        this.setState({ isAdding: false });
      }
    }
  };

  handleBlur = () => {
    const { isAddingFromButtonClick } = this.state;
    if (!isAddingFromButtonClick) {
      this.setState(
        { shouldAddReminderOnBlur: true, isAddingFromBlur: true },
        () => {
          this.handleSubmitAddReminder();
          this.setState({ shouldAddReminder: false, reminderTitle: "" });
        }
      );
    }
  };

  handleClickDone = () => {
    this.setState({ isAddingFromButtonClick: true }, () => {
      this.handleSubmitAddReminder();
      this.setState({ isAddingFromButtonClick: false });
    });
  };

  // DELETE REMINDER
  deleteReminderService = async (deleReminderId) => {
    try {
      console.log(deleReminderId, "id reminder");
      await delREminder(deleReminderId);
    } catch (error) {
      console.error("Error fetching reminder:", error.message);
    }
    this.setState((prevState) => ({
      reminders: prevState.reminders.filter(
        (reminder) => reminder.id !== deleReminderId
      ),
    }));
  };

  handleEdit = async (editedNoteId, newValue) => {
    try {
      const updatedReminder = await updateReminderData(editedNoteId, newValue);
      console.log(updatedReminder, " update thanh cong reminder UI");

      if (updatedReminder) {
        this.setState((prevState) => ({
          reminders: prevState.reminders.map((reminder) =>
            reminder.id === updatedReminder.id ? updatedReminder : reminder
          ),
        }));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật reminder:", error.message);
    }
  };

  handleListsButtonClick = () => {
    if (this.props.onListsButtonClick) {
      this.props.onListsButtonClick();
    }
  };

  showNewReminderForm = () => {
    this.setState({
      showNewReminderForm: true,
    });
  };

  componentDidMount = () => {
    this.getReminders();
  };

  render() {
    return (
      <div>
        <div className="detail-list-note">
          {/* <div>
            <div className="loader  loader__reminder  loader-hidden  loader__common  "></div>
          </div> */}

          <div className="note">
            <div className="button-detail-list">
              <Button
                className="btn-back-list"
                onClick={this.handleListsButtonClick}
              >
                Back List
              </Button>
              <Button
                className="add-reminder"
                id="btnsubmit-note"
                // disabled
                onClick={this.handleClickDone}
              >
                Done
              </Button>
            </div>
            <RenderReminder
              selectedListId={this.props.selectedListId}
              selectedListName={this.props.selectedListName}
              onReminderDeleSuccess={this.deleteReminderService}
              reminders={this.state.reminders}
              hasReminderData={this.state.hasReminderData}
              onEdit={this.handleEdit}
            />
          </div>
          {this.state.showNewReminderForm && (
            <div className="new-reminder">
              <div className="form-check  item-reminders">
                <Input className="form-check-input " type="checkbox"></Input>
                <Input
                  className="form-check-name input-new-reminder"
                  placeholder="Add Note"
                  autoFocus
                  onBlur={this.handleBlur}
                  onChange={(e) =>
                    this.setState({ reminderTitle: e.target.value })
                  }
                ></Input>
              </div>
            </div>
          )}

          <Button
            className="add__reminders"
            id="btnNewNote"
            onClick={this.showNewReminderForm}
          >
            New Reminder
          </Button>
        </div>
      </div>
    );
  }
}

export default RemindersList;
