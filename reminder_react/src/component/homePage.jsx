import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";
import ListNoteRender from "./listNoteHome";

class HtmlComponents extends Component {
  render() {
    return (
      <>
        {/* <div className="loader  loader__page  loader__common "></div> */}

        <ListNoteRender></ListNoteRender>

        {/* <div className="detail-list-note">
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
        </div> */}
        <form action="" id="form__add__note" className="form--add__notes">
          <div className="button-detail-list">
            <button type="button" className="btn btn-primary btn-back-note">
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary add-reminder"
              disabled={true}
              id="submitform-addnote"
            >
              Add
            </button>
          </div>

          <h1>New reminder</h1>
          <input
            type="text"
            id="add-note-name"
            className="input_add_note_name"
            placeholder="Add name reminder"
          />

          <div className="map-list">
            <div className="title-list-name-choose">
              <div className="tieude">
                <span>Choose list</span>
              </div>
              <div>
                {" "}
                <span className="name-list-choose"></span>
              </div>
            </div>
            <div className="render" id="renderlist"></div>
          </div>
        </form>
      </>
    );
  }
}
export default HtmlComponents;
