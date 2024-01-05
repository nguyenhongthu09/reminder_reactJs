import React, { Component } from "react";
import RenderListOnUi from "../lists/List";
import { addNewReminder } from "../../fetchApi/fetchApiREminder";
import Button from "../core/Button";
import Input from "../core/Input";
import LoadingIcon from "../core/Loading";
class AddReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListName: "",
      isAddButtonDisabled: true,
      selectedListId: null,
      reminderTitle: "",
      loading: false,
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
      this.setState({ loading: true });
      await addNewReminder(newReminder);
      if (this.props.onSubmitAddReminderForm) {
        const updatedListNote = [...this.props.listNote];
        this.props.onSubmitAddReminderForm(updatedListNote);
        const selectedList = updatedListNote.find(
          (list) => list.id === selectedListId
        );
        const newTotalCount = selectedList ? selectedList.totalCount + 1 : 1;
        this.props.updateListNoteCount(selectedListId, newTotalCount);
      }
      this.setState({ loading: false });
      console.log("Đã thêm mới reminder thành công.", newReminder);
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    }
  };

  render() {
    const { listNote } = this.props;
    const {loading} = this.state;

    return (
      <>
        <form action="" id="form__add__note" className="form--add__notes">
          {loading && <LoadingIcon />}
          <div className="button-detail-list">
            <Button
              className="btn-back-note"
              onClick={this.props.onCancelFormAdd}
            >
              Cancel
            </Button>
            <Button
              className="add-reminder"
              disabled={this.state.isAddButtonDisabled}
              id="submitform-addnote"
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          </div>

          <h1>New reminder</h1>
          <Input
            id="add-note-name"
            className="input_add_note_name"
            placeholder="Add name reminder"
            onFocus={this.handleInputFocus}
            onChange={this.handleInputChange}
          ></Input>

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
              <RenderListOnUi
                listNote={listNote}
                onListSelect={this.handleListSelection}
              ></RenderListOnUi>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default AddReminderForm;
