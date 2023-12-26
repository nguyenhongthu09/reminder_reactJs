import React, { Component } from "react";
import ParentComponent from "./renderListUi";
class AddReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListName: props.defaultSelectedListName || "",
      isAddButtonDisabled: true,
    };
  };

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    const isAddButtonDisabled = inputValue.trim() === ""; // Kiểm tra xem ô input có rỗng hay không
    this.setState({
      isAddButtonDisabled: isAddButtonDisabled,
    });
  };

  handleListSelection = (selectedListName) => {
    console.log(selectedListName, "name");
    this.setState({
      selectedListName: selectedListName,
     
    });
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
