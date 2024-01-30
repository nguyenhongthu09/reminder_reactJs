import React, { useState, useEffect, useCallback, useContext } from "react";
import List from "./List";
import ListForm from "./ListForm";
import Reminders from "../reminders/ReminderContext";
import ReminderForm from "../reminders/ReminderForm";
import Button from "../core/Button";
import Loading from "../core/Loading";
import { ListContext } from "../../context/ListContext";
import { generateRandomStringId } from "../../utils/common";
function Lists() {
  const [isListForm, setIsListForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [isReminderForm, setIsReminderForm] = useState(false);
  const [isReminders, setIsReminders] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState({
    id: null,
    name: "",
    isColor: "",
  });
  const [nameList, setNameList] = useState("");
  const context = useContext(ListContext);
  const setFormTypeHandler = (type) => {
    setIsListForm(type === "add" || type === "edit");
    setFormType(type);
  };

  const handleListNoteClick = (listNote) => {
    console.log(listNote, " lisstnote");
    setFormTypeHandler("edit");
    setListData(listNote);
  };

  const handleAddFormListClick = (source) => {
    console.log(source, " add form");
    setFormTypeHandler("add");
    if (source === "button") {
      setIsListForm(true);
      setListData({
        id: generateRandomStringId(),
        name: "",
        isColor: "",
      });
    }
  };

  const handleListNoteItemClick = (listNote) => {
    setIsReminders(true);
    context.setSelectedListId(listNote.id);
    setNameList(listNote.name);
  };

  const handleBackList = () => {
    setIsReminders(false);
  };

  const handleFormAddReminder = (openForm) => {
    setIsReminderForm(openForm);
  };

  //DELETE LISTNOTE
  const deleteListNote = async (deletedListId) => {
    setIsLoading(true);
    await context.deleteListNote(deletedListId);
    setIsLoading(false);
    console.log(deletedListId, "id cua listnot via xoa");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await context.getListNote();
        context.getColors();
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="menu-list-notes">
        {isLoading && <Loading />}
        <div className="menu-list-note" id="renderlist-home">
          <h1>My List</h1>
          {context.listNote.map((list) => (
            <List
              key={list.id}
              onListNoteClick={handleListNoteClick}
              listNote={list}
              onListNoteItemClick={handleListNoteItemClick}
              onListDeleteSuccess={deleteListNote}
            />
          ))}
        </div>
        <div className="button-home">
          <Button
            className="add-reminder btn__add--reminder"
            onClick={() => handleFormAddReminder(true)}
          >
            New Reminder
          </Button>

          <Button
            className="add-list"
            id="add-list-new"
            onClick={() => {
              handleAddFormListClick("button");
            }}
          >
            Add List
          </Button>
        </div>
      </div>

      {isListForm && (
        <ListForm
          formType={formType}
          listData={listData}
          setIsListForm={setIsListForm}
          setListData={setListData}
        />
      )}

      {isReminders && (
        <Reminders onListsBackClick={handleBackList} nameList={nameList} />
      )}

      {isReminderForm && <ReminderForm setIsReminderForm={setIsReminderForm} />}
    </>
  );
}

export default Lists;
