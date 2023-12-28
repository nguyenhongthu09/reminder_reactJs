import React, { Component } from "react";
import "../style/style.css";
import RenderReminderUi from "./RenderReminderUi";
import {
  delREminder,
  getReminder,
  addNewReminder,
  updateReminderData,
} from "../fetchApi/fetchApiREminder";
import Button from "../core/Button";
class ReminderHome extends Component {
  constructor() {
    super();
    this.state = {
      reminders: [],
      hasReminderData: false,
      showNewReminderForm: false,
      reminderTitle: "",
      isAdding: false,
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
    const { reminderTitle, isAdding, editedNote } = this.state;
    if (!isAdding) {
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
    const { isAdding } = this.state;
    if (!isAdding) {
      this.handleSubmitAddReminder();
    }
  };

  // DELETE REMINDER
  deleteReminderService = async (deleReminderId) => {
    try {
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
    // Gọi hàm cập nhật dữ liệu từ API
    try {
      const updatedReminder = await updateReminderData(editedNoteId, newValue);
      console.log(updatedReminder, " update thanh cong reminder UI");
      // Cập nhật trạng thái của component
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
                type="button"
                className="btn btn-primary btn-back-list"
                onClick={this.handleListsButtonClick}
              >
                Back List
              </Button>
              <Button
                type="button"
                className="btn btn-primary add-reminder"
                id="btnsubmit-note"
                // disabled
                onClick={this.handleSubmitAddReminder}
              >
                Done
              </Button>
            </div>
            <RenderReminderUi
              selectedListId={this.props.selectedListId}
              selectedListName={this.props.selectedListName}
              onReminderDeleSuccess={this.deleteReminderService}
              reminders={this.state.reminders}
              hasReminderData={this.state.hasReminderData}
              onEdit={this.handleEdit}
            ></RenderReminderUi>
          </div>
          {/* <div className="new-reminder">
            <div className="form-check  item-reminders">
              <input className="form-check-input " type="checkbox" />
              <input
                type="text"
                className="form-check-name input-new-reminder"
                placeholder="Add Note"
                autoFocus
              ></input>
            </div>
          </div> */}
          {this.state.showNewReminderForm && (
            <div className="new-reminder">
              <div className="form-check  item-reminders">
                <input className="form-check-input " type="checkbox" />
                <input
                  type="text"
                  className="form-check-name input-new-reminder"
                  placeholder="Add Note"
                  autoFocus
                  onBlur={this.handleBlur}
                  onChange={(e) =>
                    this.setState({ reminderTitle: e.target.value })
                  }
                ></input>
              </div>
            </div>
          )}

          <Button
            type="button"
            className="btn btn-primary add__reminders"
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

export default ReminderHome;
