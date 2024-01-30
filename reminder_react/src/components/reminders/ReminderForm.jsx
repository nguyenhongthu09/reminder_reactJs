import React, { useState, useEffect, useRef, useContext } from "react";
import List from "../lists/List";
import Button from "../core/Button";
import Input from "../core/Input";
import Loading from "../core/Loading";
import PropTypes from "prop-types";
import { ListContext } from "../../context/ListContext";
import { ReminderContext } from "../../context/ReminderContext";
import { generateRandomStringId } from "../../utils/common";
function ReminderForm({ setIsReminderForm }) {
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [reminderTitle, setReminderTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const inputRef = useRef(null);
  const context = useContext(ListContext);
  const contextReminder = useContext(ReminderContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    setIsAddButtonDisabled(!reminderTitle.trim() || !selectedList);
  }, [reminderTitle]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const newIsAddButtonDisabled = inputValue.trim() === "" || !selectedList;
    setReminderTitle(inputValue);
    setIsAddButtonDisabled(newIsAddButtonDisabled);
  };

  const handleListSelection = (listNote) => {
    setSelectedList(listNote);
    setIsAddButtonDisabled(!reminderTitle.trim() || !listNote.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reminderTitle || !selectedList) {
      alert("Vui lòng chọn listNote tương ứng");
      return;
    }

    const newReminder = {
      id: generateRandomStringId(),
      title: reminderTitle,
      status: false,
      idlist: selectedList.id,
    };

    try {
      setLoading(true);
      contextReminder.addReminder(newReminder);
      setIsReminderForm(false);
      console.log(newReminder, "newreminder form");
      const updatedTotalCount = selectedList.totalCount + 1;
      context.updateListNoteCount(selectedList.id, updatedTotalCount);
      setLoading(false);
      console.log("Đã thêm mới reminder thành công.", newReminder);
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    }
  };

  const handleCancelForm = () => {
    setIsReminderForm(false);
  };

  return (
    <>
      <form action="" id="form__add__note" className="form--add__notes">
        {loading && <Loading />}
        <div className="button-detail-list">
          <Button className="btn-back-note" onClick={handleCancelForm}>
            Cancel
          </Button>
          <Button
            className="add-reminder"
            disabled={isAddButtonDisabled}
            id="submitform-addnote"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>

        <h1>New reminder</h1>
        <Input
          ref={inputRef}
          id="add-note-name"
          className="form-check-name"
          onChange={handleInputChange}
        />

        <div className="map-list">
          <div className="title-list-name-choose">
            <div className="tieude">
              <span>Choose list</span>
            </div>
            <div>
              <span className="name-list-choose">
                {selectedList ? selectedList.name : "No list selected"}
              </span>
            </div>
          </div>
          <div className="render" id="renderlist">
            {context.listNote.map((list) => (
              <List
                key={list.id}
                listNote={list}
                onListSelect={handleListSelection}
              />
            ))}
          </div>
        </div>
      </form>
    </>
  );
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
  updateListNoteCount: PropTypes.func,
};

export default ReminderForm;
