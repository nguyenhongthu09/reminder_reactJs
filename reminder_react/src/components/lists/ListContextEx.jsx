import React, { useState, useEffect, useCallback, useContext } from "react";
import List from "./List";
import getColor from "../../fetchApi/fetchColor";
import ListForm from "./ListForm";
import Reminders from "../reminders/ReminderContext";
import ReminderForm from "../reminders/ReminderForm";
import Button from "../core/Button";
import Loading from "../core/Loading";
import { ListContext } from "../../context/ListContext";

function Lists() {
  const [colors, setColors] = useState([]);
  const [listForm, setListForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [reminderForm, setReminderForm] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [loading] = useState(false);
  const [listData, setListData] = useState(null);
  const [nameList, setNameList] = useState("");
  const context = useContext(ListContext);
  const setFormTypeHandler = (type) => {
    setListForm(type === "add" || type === "edit");
    setFormType(type);
  };

  //GET COLOR
  const getColors = async () => {
    try {
      const colorData = await getColor();

      setColors(colorData.map((colors) => colors.color));
    } catch (error) {
      console.error("Error fetching colorData:", error.message);
    }
  };

  const handleListNoteClick = (listNote) => {
    setFormTypeHandler("edit");
    setListData(listNote);
  };

  const handleAddFormListClick = (source) => {
    setFormTypeHandler("add");
    if (source === "button") {
      setListForm(true);
    }
  };

  const handleCancelClick = useCallback(() => {
    setListForm(false);
  }, []);

  const handleListNoteItemClick = (listNote) => {
    setReminders(true);
    context.setSelectedListId(listNote.id);
    setNameList(listNote.name);
  };

  const handleBackList = () => {
    setReminders(false);
  };

  const handleFormAddReminder = (openForm) => {
    setReminderForm(openForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        context.getListNote();
        await getColors();
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="menu-list-notes">
        {loading && <Loading />}
        <div className="menu-list-note" id="renderlist-home">
          <h1>My List</h1>
          {context.listNote.map((list) => (
            <List
              key={list.id}
              onListNoteClick={handleListNoteClick}
              listNote={list}
              onListNoteItemClick={handleListNoteItemClick}
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

      {listForm && (
        <ListForm
          onCancelClick={handleCancelClick}
          formType={formType}
          listData={listData}
          colors={colors}
          setListForm={setListForm}
        />
      )}

      {reminders && (
        <Reminders onListsBackClick={handleBackList} nameList={nameList} />
      )}

      {reminderForm && (
        <ReminderForm
          onCancelFormAdd={() => handleFormAddReminder(false)}
          onSubmitAddReminderForm={() => handleFormAddReminder(false)}
          setReminderForm={setReminderForm}
        />
      )}
    </>
  );
}

export default Lists;
