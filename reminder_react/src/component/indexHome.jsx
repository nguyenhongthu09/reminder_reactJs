import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap
// import ParentComponent from './test';
import "../style/style.css";
// import AddListForm from './addListForm';
import ListNoteRender from './listNoteHome';
class HtmlComponents extends Component {

  render(){
   
  return (
    <>
      {/* <div className="loader  loader__page  loader__common "></div> */}

      <ListNoteRender></ListNoteRender>
      
      <form id="form_edit_list" action="" className="form-edit-list">
        <div className="form__edit__list">
          <button
            type="button"
            id="btn-xoa"
            className="btn btn-primary button-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            id="btnsubedit"
            className="btn btn-primary button-done"
            disabled={true}
          >
            Edit
          </button>
        </div>
        <h1>Edit List</h1>

        <div className="form_add_list_name">
          <div className="fill-icon-color fill-color-edit" id="icon-color-edit">
            <span className="fill-color">
              <svg
                width="40"
                height="40"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 11.5C5 11.2239 5.22386 11 5.5 11H14.5C14.7761 11 15 11.2239 15 11.5C15 11.7761 14.7761 12 14.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 7.5C5 7.22386 5.22386 7 5.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H5.5C5.22386 8 5 7.77614 5 7.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 3.5C5 3.22386 5.22386 3 5.5 3H14.5C14.7761 3 15 3.22386 15 3.5C15 3.77614 14.7761 4 14.5 4H5.5C5.22386 4 5 3.77614 5 3.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 4.5C2.55228 4.5 3 4.05228 3 3.5C3 2.94772 2.55228 2.5 2 2.5C1.44772 2.5 1 2.94772 1 3.5C1 4.05228 1.44772 4.5 2 4.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 8.5C2.55228 8.5 3 8.05228 3 7.5C3 6.94772 2.55228 6.5 2 6.5C1.44772 6.5 1 6.94772 1 7.5C1 8.05228 1.44772 8.5 2 8.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 12.5C2.55228 12.5 3 12.0523 3 11.5C3 10.9477 2.55228 10.5 2 10.5C1.44772 10.5 1 10.9477 1 11.5C1 12.0523 1.44772 12.5 2 12.5Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <input type="text" id="name_edit-list" placeholder="Tên Danh Sách" />
          <p id="name_error" className="error-message">
            Please enter a list name.
          </p>
        </div>
        <div
          className="color-list-icon  render-list-color-edit"
          id="color-list-add-list"
        ></div>
      </form>
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
