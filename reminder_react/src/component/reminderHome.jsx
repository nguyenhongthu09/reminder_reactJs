import React, { Component } from "react";
import "../style/style.css";
import RenderReminderUi from "./renderReminderUi";
class ReminderHome extends Component {
  constructor() {
    super();
    this.state = {
      reminder: [],
    };
  }
  handleListsButtonClick = () => {
    if (this.props.onListsButtonClick) {
      this.props.onListsButtonClick();
    }
  };

  render() {
    return (
      <div>
        <div className="detail-list-note">
          {/* <div>
            <div className="loader  loader__reminder  loader-hidden  loader__common  "></div>
          </div> */}

          <div className="note">
            <RenderReminderUi
              selectedListId={this.props.selectedListId}
              selectedListName={this.props.selectedListName}
            ></RenderReminderUi>
          </div>
          <div className="new-reminder">
            <div className="form-check  item-reminders">
              <input className="form-check-input " type="checkbox" />
              <input
                type="text"
                className="form-check-name input-new-reminder"
                placeholder="Add Note"
                autoFocus
              ></input>
            </div>
          </div>
          <div className="button-detail-list">
            <button
              type="button"
              className="btn btn-primary btn-back-list"
              onClick={this.handleListsButtonClick}
            >
              Lists
            </button>
            <button
              type="button"
              className="btn btn-primary add-reminder"
              id="btnsubmit-note"
              disabled
            >
              Add
            </button>
          </div>
          <button className="btn btn-primary add__reminders" id="btnNewNote">
            New Reminder
          </button>
        </div>
      </div>
    );
  }
}

export default ReminderHome;
