import React, { Component } from "react";
import { getReminder } from "../fetchApi/fetchApiREminder";
import "../style/style.css";

class RenderReminderUi extends Component {
    constructor() {
        super();
        this.state = {
            reminder:[],
        }
    }

    getReminder = async () => {
        try {
            const reminderData = await getReminder();
            this.setState({
              reminder: reminderData,
           
            });
          } catch (error) {
            console.error("Error fetching reminder:", error.message);
          }
    }
    componentDidMount = () => {
        console.log("render reminder");
        this.getReminder();
      };
    render() {
        const {reminder} = this.state;

        return (
            <div>
                <h1>thu ne</h1>
                <div className="detail-list-note">
          <div>
            <div className="loader  loader__reminder  loader-hidden  loader__common  "></div>
          </div>
          <div className="thong-bao">Empty list !!!</div>
          <div className="note">
            <div className="tieu-de"></div>
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
            <button type="button" className="btn btn-primary btn-back-list">
              Lists
            </button>
            <button
              type="button"
              className="btn btn-primary add-reminder"
              id="btnsubmit-note"
            >
              Add
            </button>
          </div>
          <button className="btn btn-primary add__reminders" id="btnNewNote">
            New Reminder
          </button>
        </div>
            </div>
        )
    }
    
}

export default RenderReminderUi;