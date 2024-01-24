import React, { useState, useEffect, useCallback } from "react";
import List from "./List";
import getAllList from "../../fetchApi/fetchApiList";
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

function Lists() {
  const [listNote, setListNote] = useState([]);
  const [colors, setColors] = useState([]);
  const [listForm, setListForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [reminderForm, setReminderForm] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState(null);
  const [nameList, setNameList] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const setFormTypeHandler = (type) => {
    setListForm(type === "add" || type === "edit");
    setFormType(type);
  };

  //GET LISTNOTE
  const getListNote = async () => {
    try {
      const listData = await getAllList();

      setListNote(listData);
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
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
  const addListServiceForm = useCallback(
    async (newList) => {
      try {
        if (formType === "add") {
          newList.totalDone = 0;
          newList.totalCount = 0;
          await addNewList(newList);
          setListForm(false);
          setListNote((prevListNote) => [...prevListNote, newList]);
          setAddNew(true);
        }
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error.message);
      }
    },
    [setListNote, formType]
  );

  //EDIT LISTNOTE
  const editListServiceForm = useCallback(
    async (list) => {
      try {
        if (formType === "edit") {
          const updatedListNote = listNote.map((listNote) =>
            listNote.id === list.id
              ? {
                  ...listNote,
                  name: list.name,
                  isColor: list.isColor,
                }
              : listNote
          );
          const updatedList = updatedListNote.find(
            (listNote) => listNote.id === list.id
          );

          setListForm(false);
          setListNote(updatedListNote);
          console.log("Cập nhật thành công", updatedList);
          const currentTotalDone = updatedList.totalDone;
          const currentTotalCount = updatedList.totalCount;
          await updateListData(
            list.id,
            list.name,
            list.isColor,
            currentTotalDone,
            currentTotalCount
          );
        }
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error.message);
      }
    },
    [formType, listNote]
  );

  //DELETE LISTNOTE
  const deleteListNoteService = useCallback(async (deletedListId) => {
    try {
      await delList(deletedListId);
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }

    setListNote((prevListNote) =>
      prevListNote.filter((list) => list.id !== deletedListId)
    );
  }, []);

  const handleListNoteClick = useCallback((listNote) => {
    setFormTypeHandler("edit");
    setListData(listNote);
  }, []);

  const handleAddFormListClick = (source) => {
    setFormTypeHandler("add");
    if (source === "button") {
      setListForm(true);
    }
  };

  const handleCancelClick = useCallback(() => {
    setListForm(false);
  }, []);

  const handleListNoteItemClick = useCallback((listNote) => {
    setReminders(true);
    setSelectedListId(listNote.id);
    setNameList(listNote.name);
  }, []);

  const handleBackList = () => {
    setReminders(false);
  };

  const handleFormAddReminder = (openForm) => {
    setReminderForm(openForm);
  };

  // update khi them moi trong form
  const updateListNoteCount = (listId, newTotalCount) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === listId ? { ...list, totalCount: newTotalCount } : list
      )
    );
  };

  //update khi them moi va xoa trong remidner
  const updateListTotalCount = (newTotalCount) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId
          ? { ...list, totalCount: newTotalCount }
          : list
      )
    );
  };

  //update total co status la true
  const updateTotalDone = (newTotalDone) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId ? { ...list, totalDone: newTotalDone } : list
      )
    );
  };

  useEffect(() => {
    console.log("Component did mount use");
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([getListNote(), getColors()]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  
    if (addNew && listNote.length > 0) {
      setShowSuccessAlert(true);
    setTimeout(() => {
        setShowSuccessAlert(false);
        setAddNew(false);
      }, 2000);
    }
  }, [addNew, listNote]);

  return (
    <>
      <div
        className="menu-list-notes"
        // style={{
        //   display: listForm || reminders || reminderForm ? "none" : "block",
        // }}
      >
        {showSuccessAlert && (
          <div className="success-alert">
            <p>ListNote added successfully!</p>
          </div>
        )}
        {loading && <Loading />}
        <div className="menu-list-note" id="renderlist-home">
          <h1>My List</h1>
          {listNote &&
            listNote.map((list) => (
              <List
                key={list.id}
                onListNoteClick={handleListNoteClick}
                onListDeleteSuccess={deleteListNoteService}
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
          onSubmitSuccess={addListServiceForm}
          onSubEditForm={editListServiceForm}
          setListForm={setListForm}
        />
        // <ComponentClass
        // formType={formType}
        //   listData={listData}
        // />
      )}

      {reminders && (
        <Reminders
          onListsBackClick={handleBackList}
          nameList={nameList}
          selectedListId={selectedListId}
          updateListTotalCount={updateListTotalCount}
          updateTotalDone={updateTotalDone}
          reminders={reminders}
        />
      )}

      {reminderForm && (
        <ReminderForm
          onCancelFormAdd={() => handleFormAddReminder(false)}
          onSubmitAddReminderForm={() => handleFormAddReminder(false)}
          listNote={listNote}
          updateListNoteCount={updateListNoteCount}
        />
      )}
    </>
  );
}

export default Lists;
