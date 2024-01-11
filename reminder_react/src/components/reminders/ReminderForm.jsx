import React, { Component } from "react";
import List from "../lists/List";
import { addNewReminder } from "../../fetchApi/fetchApiREminder";
import Button from "../core/Button";
import Input from "../core/Input";
import Loading from "../core/Loading";
import PropTypes from "prop-types";
class ReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddButtonDisabled: true,
      selectedListId: null,
      reminderTitle: "",
      loading: false,
    };
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    const isAddButtonDisabled =
      inputValue.trim() === "" || !this.state.selectedListId;
    this.setState({
      isAddButtonDisabled: isAddButtonDisabled,
      reminderTitle: inputValue,
    });
  };

  handleListSelection = (listNote) => {
    this.setState({
      nameList: listNote.name,
      selectedListId: listNote.id,
      isAddButtonDisabled: !this.state.reminderTitle.trim() || !listNote.id,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { reminderTitle, selectedListId } = this.state;
    if (!reminderTitle || !selectedListId) {
      alert("Vui lòng chọn listNote tương ứng");
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
    const { loading, nameList, isAddButtonDisabled } = this.state;

    return (
      <>
        <form action="" id="form__add__note" className="form--add__notes">
          {loading && <Loading />}
          <div className="button-detail-list">
            <Button
              className="btn-back-note"
              onClick={this.props.onCancelFormAdd}
            >
              Cancel
            </Button>
            <Button
              className="add-reminder"
              disabled={isAddButtonDisabled}
              id="submitform-addnote"
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          </div>

          <h1>New reminder</h1>
          <Input
            id="add-note-name"
            className="form-check-name"
            onFocus={this.handleInputFocus}
            onChange={this.handleInputChange}
          />

          <div className="map-list">
            <div className="title-list-name-choose">
              <div className="tieude">
                <span>Choose list</span>
              </div>
              <div>
                <span className="name-list-choose">{nameList}</span>
              </div>
            </div>
            <div className="render" id="renderlist">
              {listNote.map((list) => (
                <List
                  key={list.id}
                  listNote={list}
                  onListSelect={this.handleListSelection}
                />
              ))}
            </div>
          </div>
        </form>
      </>
    );
  }
}

ReminderForm.propTypes = {
  listNote: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      isColor: PropTypes.string,
      totalCount: PropTypes.number,
      totalDone: PropTypes.number,
    })
  ),
  onCancelFormAdd: PropTypes.func,
  onSubmitAddReminderForm: PropTypes.func,
  updateListNoteCount: PropTypes.func,
};

export default ReminderForm;
