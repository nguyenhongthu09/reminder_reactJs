import React, { Component } from "react";
import ParentComponent from "./renderListUi";
class AddReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListName: props.defaultSelectedListName || "",
    };
  }

  handleClickName = (list) => {
    console.log(list, " name list");
    this.setState({
      selectedListName: list.name,
    });
  };

  render() {
    return (
      <>
        <form action="" id="form__add__note" className="form--add__notes">
          <div className="button-detail-list">
            <button
              type="button"
              className="btn btn-primary btn-back-note"
              onClick={this.props.onCancelFormAdd}
            >
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
                <span className="name-list-choose">
                  {this.state.selectedListName}
                </span>
              </div>
            </div>
            <div className="render" id="renderlist">
            
            {this.props.listNote.map((list) => (
              <div key={list.id}>{list.name}</div>
            ))}
            {/* {this.props.listNote.map((list) => (
    // Hiển thị danh sách listNote tại đây
          <div key={list.id}>{list.name}</div>
          ))} */}
              {/* <ParentComponent
                onClickName={this.handleClickName}
                listNote={this.props.listNote}
              ></ParentComponent> */}
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default AddReminderForm;
