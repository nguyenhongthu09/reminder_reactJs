import React, { Component } from "react";
import Checkbox from "../core/Checkbox";
import Input from "../core/Input";
import PropTypes from "prop-types";
class ReminderFormInList extends Component {
  constructor() {
    super();
    this.state = {
      reminderTitle: "",
      isDoneButtonDisabled: true,
    };
  }
  handleBlur = () => {
    const { reminderTitle } = this.state;
    const { onSubmitAddReminderForm } = this.props;
    if (reminderTitle.trim() === "") {
      this.props.onCancelFormAdd();
      return;
    }
    onSubmitAddReminderForm({
      reminderTitle: reminderTitle,
    });
    this.setState({
      reminderTitle: "",
      isDoneButtonDisabled: true,
    });
  };

  handleChange = (e) => {
    const reminderTitle = e.target.value.trim();
    const isDoneButtonDisabled = reminderTitle === "";
    this.setState({
      reminderTitle: reminderTitle,
      isDoneButtonDisabled: isDoneButtonDisabled,
    });
    this.props.onReminderTitleChange(reminderTitle, isDoneButtonDisabled);
  };

  render() {
    return (
      <div className="new-reminder">
        <div className="form-check  item-reminders">
          <Checkbox />
          <Input
            autoFocus
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

ReminderFormInList.propTypes = {
  onCancelFormAdd: PropTypes.func,
  onSubmitAddReminderForm: PropTypes.func,
};

export default ReminderFormInList;
