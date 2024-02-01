import React, { useState, useEffect, useRef, useContext } from "react";
import List from "../lists/List.tsx";
import Button from "../core/Button.tsx";
import Input from "../core/Input.tsx";
import Loading from "../core/Loading.tsx";
import { ListContext } from "../../context/listNote.context.tsx";
import { ReminderContext } from "../../context/reminder.context.tsx";
import { generateRandomStringId } from "../../utils/common.ts";
import { ListNote } from "../../types/listNote.type";

interface ReminderFormProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ setIsReminderForm }) => {
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<ListNote | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(ListContext);
  const contextReminder = useContext(ReminderContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    setIsAddButtonDisabled(!reminderTitle.trim() || !selectedList);
  }, [reminderTitle]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newIsAddButtonDisabled = inputValue.trim() === "" || !selectedList;
    setReminderTitle(inputValue);
    setIsAddButtonDisabled(newIsAddButtonDisabled);
  };

  const handleListSelection = (listNote: ListNote) => {
    setSelectedList(listNote);
    setIsAddButtonDisabled(!reminderTitle.trim() || !listNote.id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <form
        action=""
        id="form__add__note"
        className="form--add__notes"
        onSubmit={handleSubmit}
      >
        {loading && <Loading />}
        <div className="button-detail-list">
          <Button className="btn-back-note" onClick={handleCancelForm}>
            Cancel
          </Button>
          <Button
            className="add-reminder"
            disabled={isAddButtonDisabled}
            id="submitform-addnote"
            type="submit"
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
};

export default ReminderForm;
