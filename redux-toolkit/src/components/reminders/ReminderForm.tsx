import React, { useState, useEffect, useRef } from "react";
import List from "../lists/atomics/List";
import Button from "../core/Button";
import Input from "../core/Input";
import Loading from "../core/Loading";
import { generateRandomStringId } from "../../utils/common";
import { IListNote } from "../../types/listNote.type";
import { IReminderType } from "../../types/reminder.type";
import { useNavigate } from "react-router-dom";
import { getListNote } from "../../redux-toolkit/action/actionListNote";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux-toolkit/store/store";
import { addReminder } from "../../redux-toolkit/action/actionReminder";
interface IReminderFormProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReminderForm: React.FC<IReminderFormProps> = ({ setIsReminderForm }) => {
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const [selectedList, setSelectedList] = useState<IListNote | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const listNote = useSelector((state: RootState) => state.listNote.listNote);
  const isLoading = useSelector((state: RootState) => state.loading.loading);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    setIsAddButtonDisabled(!reminderTitle.trim() || !selectedList);
  }, [reminderTitle, selectedList]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newIsAddButtonDisabled = inputValue.trim() === "" || !selectedList;
    setReminderTitle(inputValue);
    setIsAddButtonDisabled(newIsAddButtonDisabled);
  };

  const handleListSelection = (listNote: IListNote) => {
    setSelectedList(listNote);
    setIsAddButtonDisabled(!reminderTitle.trim() || !listNote.id);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!reminderTitle || !selectedList) {
      alert("Vui lòng chọn listNote tương ứng");
      return;
    }

    const newReminder: IReminderType = {
      id: generateRandomStringId(),
      title: reminderTitle,
      status: false,
      idlist: selectedList.id,
    };

    try {
      await dispatch(addReminder(newReminder));
      setIsReminderForm(false);
      navigate("/");
      console.log("Đã thêm mới reminder thành công.", newReminder);
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:");
    }
  };

  const handleCancelForm = () => {
    setIsReminderForm(false);
    navigate("/");
  };
  useEffect(() => {
    dispatch(getListNote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        action=""
        id="form__add__note"
        className="form--add__notes"
        onSubmit={handleSubmit}
      >
        {isLoading && <Loading />}
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
};

export default ReminderForm;
