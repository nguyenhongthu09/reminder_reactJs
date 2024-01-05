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
import getAllList from "../../fetchApi/fetchApiList";
import LoadingIcon from "../core/Loading";
class RemindersList extends Component {
  constructor() {
    super();
    this.state = {
      reminders: [],
      hasReminderData: false,
      showNewReminderForm: false,
      reminderTitle: "",
      editedValue: "",
      actionType: null,
      editingNoteId: null,
      loading: false,
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
  addReminderService = async () => {
    const { selectedListId } = this.props;
    const { reminderTitle } = this.state;

    const newReminder = {
      title: reminderTitle,
      status: false,
      idlist: selectedListId,
    };

    try {
      this.setState({ loading: true });
      const response = await addNewReminder(newReminder);
      console.log(response, " them moi thanh cong");
      const newTotalCount = this.state.reminders.length + 1;
      this.props.updateListTotalCount(newTotalCount);
      const addedReminder = response ? response : null;
      if (addedReminder) {
        this.setState((prevState) => ({
          reminders: [...prevState.reminders, addedReminder],
          reminderTitle: "",
          idReminder: addedReminder.id,
        }));
      }
      this.setState({ loading: false });
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    } finally {
      this.setState({ actionType: null });
    }
  };

  handleBlur = () => {
    this.setState(
      { actionType: "blur", showNewReminderForm: false, hasReminderData: true },
      () => {
        this.addReminderService();
      }
    );
  };

  handleClickDone = () => {
    this.setState({
      actionType: "click",
      showNewReminderForm: false,
      hasReminderData: true,
    });
  };

  // DELETE REMINDER
  deleteReminderService = async (deleReminderId, status) => {
    try {
      this.setState({ loading: true });
      await delREminder(deleReminderId);
      const { reminders } = this.state;
      const newTotalCount = this.state.reminders.length - 1;
      console.log(status, "status");
      if (status) {
        this.props.updateListTotalCount(newTotalCount);
        const newTotalDone = reminders.filter(
          (reminder) => reminder.id !== deleReminderId && reminder.status
        ).length;
        this.props.updateTotalDone(newTotalDone);
      } else {
        this.props.updateListTotalCount(newTotalCount);
      }
      this.setState({ loading: false });
    } catch (error) {
      console.error("Error fetching reminder:", error.message);
    }
    this.setState(
      (prevState) => ({
        reminders: prevState.reminders.filter(
          (reminder) => reminder.id !== deleReminderId
        ),
      }),
      () => {
        const hasReminderData = this.state.reminders.length !== 0;
        this.setState({ hasReminderData });
      }
    );
  };

  //EDIT REMIDNER
  editReminder = async (editedNoteId, newValue) => {
    try {
      this.setState({ loading: true });
      const updatedReminder = await updateReminderData(editedNoteId, newValue);
      console.log(updatedReminder, " update thanh cong reminder UI");

      if (updatedReminder) {
        this.setState((prevState) => ({
          reminders: prevState.reminders.map((reminder) =>
            reminder.id === updatedReminder.id ? updatedReminder : reminder
          ),
        }));
      }
      this.setState({ loading: false });
    } catch (error) {
      console.error("Lỗi khi cập nhật reminder:", error.message);
    }
  };

  hanldeBackList = async () => {
    if (this.props.onListsBackClick) {
      this.setState({ loading: true });
      await getAllList();
      this.props.onListsBackClick();
      this.setState({ loading: false });
    }
  };

  showNewReminderForm = () => {
    this.setState({
      showNewReminderForm: true,
    });
  };

  handleUpdateReminders = (updatedReminders, totalDone) => {
    this.setState({ reminders: updatedReminders });
    this.props.updateTotalDone(totalDone);
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    await this.getReminders();
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <div className="detail-list-note">
          <div className="note">
            <div className="button-detail-list">
              <Button className="btn-back-list" onClick={this.hanldeBackList}>
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
            {loading && <LoadingIcon />}
            <RenderReminder
              selectedListId={this.props.selectedListId}
              selectedListName={this.props.selectedListName}
              onReminderDeleSuccess={this.deleteReminderService}
              reminders={this.state.reminders}
              hasReminderData={this.state.hasReminderData}
              onEdit={this.editReminder}
              onUpdateReminders={this.handleUpdateReminders}
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
