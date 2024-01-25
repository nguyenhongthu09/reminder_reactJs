import React, { useEffect, useState, useCallback } from "react";
import { useListsContext } from "../../store";
import {
  getListNote,
  createListNote,
  updateListNote,
  deleteListNote,
} from "../../actions/listNote.action";
import List from "./List";
import Button from "../core/Button";
import ListForm from "./ListForm";
import getColor from "../../fetchApi/fetchColor";
import Reminders from "../reminders/Reminders";
import ReminderForm from "../reminders/ReminderForm";
import Loading from "../core/Loading";
function ContextListEx() {
  const { state, dispatch } = useListsContext();
  const { listNote } = state;
  const [listForm, setListForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [listData, setListData] = useState(null);
  const [colors, setColors] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [reminderForm, setReminderForm] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameList, setNameList] = useState("");
  const setFormTypeHandler = (type) => {
    setListForm(type === "add" || type === "edit");
    setFormType(type);
  };
  const getColors = async () => {
    try {
      const colorData = await getColor();

      setColors(colorData.map((colors) => colors.color));
    } catch (error) {
      console.error("Error fetching colorData:", error.message);
    }
  };

  // ADD LISTNOTE
  const addListServiceForm = async (newList) => {
    try {
      if (formType === "add") {
        newList.totalDone = 0;
        newList.totalCount = 0;
        await createListNote(newList, dispatch);
        const updatedListNote = [...listNote, newList];

        dispatch({ type: "GET_LIST_NOTE", payload: updatedListNote });
        console.log(newList, " log thu new list co chua");
        setListForm(false);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };

  //EDIT LISTNOTE

  const editListServiceForm = async (list) => {
    try {
      if (formType === "edit") {
        const updatedList = {
          id: list.id,
          name: list.name,
          isColor: list.isColor,
        };
        await updateListNote(list.id, updatedList, dispatch);
        const updatedListNote = listNote.map((item) =>
          item.id === list.id ? { ...item, ...updatedList } : item
        );
        dispatch({ type: "GET_LIST_NOTE", payload: updatedListNote });
        setListForm(false);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };

  // DELETE LISTNOTE
  const deleteListNoteService = async (deletedListId) => {
    try {
      await deleteListNote(deletedListId, dispatch);
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
  };
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
  const handleBackList = () => {
    setReminders(false);
  };
  const handleFormAddReminder = (openForm) => {
    setReminderForm(openForm);
  };
  const handleListNoteItemClick = useCallback((listNote) => {
    setReminders(true);
    setSelectedListId(listNote.id);
    setNameList(listNote.name);
  }, []);
  const updateListNoteCount = (listId, newTotalCount) => {
    const updatedListNote = listNote.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          totalCount: newTotalCount,
        };
      }
      return list;
    });
    dispatch({ type: "GET_LIST_NOTE", payload: updatedListNote });
  };

  //update khi them moi va xoa trong remidner
  const updateListTotalCount = (newTotalCount) => {
    const updatedListNote = listNote.map((list) => {
      if (list.id === selectedListId) {
        return {
          ...list,
          totalCount: newTotalCount,
        };
      }
      return list;
    });
    dispatch({ type: "GET_LIST_NOTE", payload: updatedListNote });
  };

  //update total co status la true
  const updateTotalDone = (newTotalDone) => {
    const updatedListNote = listNote.map((list) => {
      if (list.id === selectedListId) {
        return {
          ...list,
          totalDone: newTotalDone,
        };
      }
      return list;
    });
    dispatch({ type: "GET_LIST_NOTE", payload: updatedListNote });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getListNote()(dispatch);
        await getColors();
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log(listNote, " lisstNOte");
  return (
    <>
      <div className="menu-list-notes">
        {loading && <Loading />}
        <div className="menu-list-note" id="renderlist-home">
          <h1>My List</h1>
          {listNote.map((list) => (
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
        />
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

export default ContextListEx;
