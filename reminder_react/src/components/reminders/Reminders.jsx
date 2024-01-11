import React, { Component } from "react";
import Reminder from "./Reminder";
import {
  delREminder,
  getReminder,
  addNewReminder,
  updateReminderData,
} from "../../fetchApi/fetchApiREminder";
import Button from "../core/Button";
import getAllList from "../../fetchApi/fetchApiList";
import Loading from "../core/Loading";

import PropTypes from "prop-types";
import ReminderFormInList from "./ReminderFormInList";
class Reminders extends Component {
  constructor() {
    super();
    this.state = {
      reminders: [],
      reminderForm: false,
      reminderTitle: "",
      actionType: null,
      loading: false,
      isDoneButtonDisabled: true,
    };
  }

  // GET REMINDERS
  getReminders = async () => {
    try {
      const reminderData = await getReminder(this.props.selectedListId);
      console.log(this.props.selectedListId, "id");
      console.log(reminderData, " remidner");
      this.setState({
        reminders: reminderData,
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
          isDoneButtonDisabled: true,
          reminderForm: false,
        }));
      }
      this.setState({ loading: false });
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    } finally {
      this.setState({ actionType: null });
    }
  };

  handleReminderTitleChange = (reminderTitle, isDoneButtonDisabled) => {
    this.setState({ reminderTitle, isDoneButtonDisabled });
  };

  handleCloseReminderForm = () => {
    this.setState({
      reminderForm: false,
    });
  };

  // DELETE REMINDER
  deleteReminderService = async (deleReminderId, status) => {
    try {
      this.setState({ loading: true });
      await delREminder(deleReminderId);
      const { reminders } = this.state;
      const newTotalCount = this.state.reminders.length - 1;
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
    this.setState((prevState) => ({
      reminders: prevState.reminders.filter(
        (reminder) => reminder.id !== deleReminderId
      ),
    }));
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
          isDoneButtonDisabled: true,
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

  showReminderForm = () => {
    this.setState({
      reminderForm: true,
    });
  };

  handleUpdateReminder = (updatedReminders, totalDone) => {
    this.setState({ reminders: updatedReminders });
    this.props.updateTotalDone(totalDone);
  };

  updateIsDoneButtonDisabled = (isDoneButtonDisabled) => {
    this.setState({ isDoneButtonDisabled });
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    await this.getReminders();
    this.setState({ loading: false });
  };

  render() {
    const { loading, reminders, reminderForm } = this.state;
    const { nameList, selectedListId } = this.props;
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
                disabled={this.state.isDoneButtonDisabled}
                onClick={this.handleClickDone}
              >
                Done
              </Button>
            </div>
            {loading && <Loading />}
            <h1 className="title-list">{nameList}</h1>
            <Reminder
              selectedListId={selectedListId}
              reminders={reminders}
              onReminderDeleSuccess={this.deleteReminderService}
              onEdit={this.editReminder}
              onUpdateReminder={this.handleUpdateReminder}
              isDoneButtonDisabled={this.state.isDoneButtonDisabled}
              updateIsDoneButtonDisabled={this.updateIsDoneButtonDisabled}
            />
          </div>
          {reminderForm && (
            <ReminderFormInList
              onSubmitAddReminderForm={this.addReminderService}
              onCancelFormAdd={this.handleCloseReminderForm}
              onReminderTitleChange={this.handleReminderTitleChange}
            />
          )}

          <Button
            className="add__reminders"
            id="btnNewNote"
            onClick={this.showReminderForm}
          >
            New Reminder
          </Button>
        </div>
      </div>
    );
  }
}

Reminders.propTypes = {
  selectedListId: PropTypes.string,
  nameList: PropTypes.string,
  onListsBackClick: PropTypes.func,
  updateListTotalCount: PropTypes.func,
  updateTotalDone: PropTypes.func,
};

export default Reminders;
