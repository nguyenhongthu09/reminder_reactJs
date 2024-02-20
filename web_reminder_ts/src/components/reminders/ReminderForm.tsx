import React, { useState, useEffect, useRef, useContext } from "react";
import List from "../lists/atomics/List";
import Button from "../core/Button";
import Input from "../core/Input";
import Loading from "../core/Loading";
import { ReminderContext } from "../../context/reminder.context";
import { generateRandomStringId } from "../../utils/common";
import { IListNote } from "../../types/listNote.type";
import { connect } from "react-redux";
import { addReminder } from "../../store/redux/actions/reminder.action";
import { IReminderType } from "../../types/reminder.type";
interface IReminderFormProps {
  setIsReminderForm: React.Dispatch<React.SetStateAction<boolean>>;
  listNote: IListNote[];
  addReminder: (newReminder: IReminderType) => Promise<void>;
}

const ReminderForm: React.FC<IReminderFormProps> = ({
  setIsReminderForm,
  listNote,
  addReminder,
}) => {
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);
  const [reminderTitle, setReminderTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<IListNote | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setLoading(true);
      await addReminder(newReminder);
      setIsReminderForm(false);
      setLoading(false);
      console.log("Đã thêm mới reminder thành công.", newReminder);
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:");
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

const mapStateToProps = (state: any) => {
  return {
    listNote: state.listReducer.listNote,
  };
};

const mapDispathToProps = (dispatch: any) => {
  return {
    addReminder: (newReminder: IReminderType) =>
      dispatch(addReminder(newReminder)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(ReminderForm);
