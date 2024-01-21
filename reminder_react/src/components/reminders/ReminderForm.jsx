import React, { useState, useEffect, useRef } from "react";
import List from "../lists/List";
import { addNewReminder } from "../../fetchApi/fetchApiREminder";
import Button from "../core/Button";
import Input from "../core/Input";
import Loading from "../core/Loading";
import PropTypes from "prop-types";

function ReminderForm({
  listNote,
  onCancelFormAdd,
  onSubmitAddReminderForm,
  updateListNoteCount,
}) {
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [selectedListId, setSelectedListId] = useState(null);
  const [reminderTitle, setReminderTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameList, setNameList] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    setIsAddButtonDisabled(!reminderTitle.trim() || !selectedListId);
  }, [reminderTitle, selectedListId]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const newIsAddButtonDisabled = inputValue.trim() === "" || !selectedListId;
    setReminderTitle(inputValue);
    setIsAddButtonDisabled(newIsAddButtonDisabled);
  };

  const handleListSelection = (listNote) => {
    setNameList(listNote.name);
    setSelectedListId(listNote.id);
    setIsAddButtonDisabled(!reminderTitle.trim() || !listNote.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setLoading(true);
      await addNewReminder(newReminder);
      if (onSubmitAddReminderForm) {
        const updatedListNote = [...listNote];
        onSubmitAddReminderForm(updatedListNote);
        const selectedList = updatedListNote.find(
          (list) => list.id === selectedListId
        );
        const newTotalCount = selectedList ? selectedList.totalCount + 1 : 1;
        updateListNoteCount(selectedListId, newTotalCount);
      }
      setLoading(false);
      console.log("Đã thêm mới reminder thành công.", newReminder);
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    }
  };
console.log("re-render rmeidner");
  return (
    <>
      <form action="" id="form__add__note" className="form--add__notes">
        {loading && <Loading />}
        <div className="button-detail-list">
          <Button className="btn-back-note" onClick={onCancelFormAdd}>
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
              <span className="name-list-choose">{nameList}</span>
            </div>
          </div>
          <div className="render" id="renderlist">
            {listNote.map((list) => (
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
  onSubmitAddReminderForm: PropTypes.func,
  updateListNoteCount: PropTypes.func,
};

export default ReminderForm;
