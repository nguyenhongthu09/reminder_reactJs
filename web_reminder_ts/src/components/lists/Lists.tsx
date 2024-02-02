import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import ListForm from "./ListForm";
import Reminders from "../reminders/Reminders";
import ReminderForm from "../reminders/ReminderForm";
import Button from "../core/Button";
import Loading from "../core/Loading";
import { ListContext } from "../../context/listNote.context";
import { generateRandomStringId } from "../../utils/common";
import { ListNote } from "../../types/listNote.type";
function Lists() {
  const [isListForm, setIsListForm] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("");

  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [isReminders, setIsReminders] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<ListNote>({
    id: "",
    name: "",
    isColor: "",
  });
  const [nameList, setNameList] = useState<string>("");

  const context = useContext(ListContext);

  const setFormTypeHandler = (type: string) => {
    setIsListForm(type === "add" || type === "edit");
    setFormType(type);
  };

  const handleListNoteClick = (listNote: ListNote) => {
    setFormTypeHandler("edit");
    setListData(listNote);
  };

  const handleAddFormListClick = (source: string) => {
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

  const handleListNoteItemClick = (listNote: ListNote) => {
    setIsReminders(true);
    context.setSelectedListId(listNote.id);
    setNameList(listNote.name);
  };

  const handleBackList = () => {
    setIsReminders(false);
  };

  const handleFormAddReminder = (openForm: boolean) => {
    setIsReminderForm(openForm);
  };

  //DELETE LISTNOTE
  const deleteListNote = async (deletedListId: string) => {
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
        console.error("Error loading data:");
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
