import React, { Component } from "react";
import ParentComponent from "./RenderListUi";
import { addNewReminder } from "../fetchApi/fetchApiREminder";
class AddReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListName: "",
      isAddButtonDisabled: true,
      selectedListId: null,
      reminderTitle: "",
    };
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    const isAddButtonDisabled = inputValue.trim() === "";
    this.setState({
      isAddButtonDisabled: isAddButtonDisabled,
      reminderTitle: inputValue,
    });
  };

  handleListSelection = (selectedListName, selectedListId) => {
    this.setState({
      selectedListName: selectedListName,
      selectedListId: selectedListId,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { reminderTitle, selectedListId } = this.state;
    if (!reminderTitle || !selectedListId) {
      console.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newReminder = {
      title: reminderTitle,
      status: false,
      idlist: selectedListId,
    };

    try {
      await addNewReminder(newReminder);
      if (this.props.onSubmitAddReminderForm) {
        this.props.onSubmitAddReminderForm();
      }
      console.log("Đã thêm mới reminder thành công.", newReminder);
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    }
    console.log("ok");
  };

  render() {
    const { listNote } = this.props;

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
              disabled={this.state.isAddButtonDisabled}
              id="submitform-addnote"
              onClick={this.handleSubmit}
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
            onFocus={this.handleInputFocus}
            onChange={this.handleInputChange}
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
              <ParentComponent
                listNote={listNote}
                onListSelect={this.handleListSelection}
              ></ParentComponent>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default AddReminderForm;
