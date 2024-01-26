import React, { useState, useEffect, useCallback, useContext } from "react";
import List from "./List";
import getColor from "../../fetchApi/fetchColor";
import ListForm from "./ListForm";
import Reminders from "../reminders/Reminders";
import ReminderForm from "../reminders/ReminderForm";
import {
  addNewList,
  updateListData,
  delList,
} from "../../fetchApi/fetchApiList";
import Button from "../core/Button";
import Loading from "../core/Loading";
import { ListContext } from "../../context/ListContext";
import getAllList from "../../fetchApi/fetchApiList";
function Lists() {
  const [colors, setColors] = useState([]);
  const [listForm, setListForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
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

  // ADD LISTNOTE
  const handleAddListNote = useCallback(
    (newList) => {
      if (formType === "add") {
        newList.totalDone = 0;
        newList.totalCount = 0;
        context.addListNote(newList);
        setListForm(false);
        console.log(newList, "newlist");
      }
    },
    [formType]
  );

  //EDIT LISTNOTE
  const handleUpdateListNote = useCallback(
    (list) => {
      if (formType === "edit") {
        context.editListNote({
          id: list.id,
          name: list.name,
          isColor: list.isColor,
        });
        setListForm(false);
        console.log("Cập nhật thành công", list);
      }
    },
    [formType]
  );

  //DELETE LISTNOTE
  const handleDeleteListNote = (deletedListId) => {
    context.deleteListNote(deletedListId);
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
    setSelectedListId(listNote.id);
    setNameList(listNote.name);
  };

  const handleBackList = () => {
    setReminders(false);
  };

  const handleFormAddReminder = (openForm) => {
    setReminderForm(openForm);
  };

  // update khi them moi trong form
  const updateListNoteCount = (listId, newTotalCount) => {
    context.setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === listId ? { ...list, totalCount: newTotalCount } : list
      )
    );
  };

  //update khi them moi va xoa trong remidner
  const updateListTotalCount = (newTotalCount) => {
    context.setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId
          ? { ...list, totalCount: newTotalCount }
          : list
      )
    );
  };

  //update total co status la true
  const updateTotalDone = (newTotalDone) => {
    context.setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId ? { ...list, totalDone: newTotalDone } : list
      )
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const listData = await getAllList();
        context.setListNote(listData);
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
              onListDeleteSuccess={handleDeleteListNote}
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
          onSubmitSuccess={handleAddListNote}
          onSubEditForm={handleUpdateListNote}
        />
      )}

      {reminders && (
        <Reminders
          onListsBackClick={handleBackList}
          nameList={nameList}
          selectedListId={selectedListId}
          updateListTotalCount={updateListTotalCount}
          updateTotalDone={updateTotalDone}
          // reminders={reminders}
        />
      )}

      {reminderForm && (
        <ReminderForm
          onCancelFormAdd={() => handleFormAddReminder(false)}
          onSubmitAddReminderForm={() => handleFormAddReminder(false)}
          updateListNoteCount={updateListNoteCount}
        />
      )}
    </>
  );
}

export default Lists;
