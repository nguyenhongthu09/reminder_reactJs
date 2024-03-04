import React, { useState, useEffect } from "react";
import List from "./atomics/List";
import Button from "../core/Button";
import Loading from "../core/Loading";
import { IListNote } from "../../types/listNote.type";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux-toolkit/store/store";
import {
  getListNote,
  deleteListNote,
} from "../../redux-toolkit/action/actionListNote";

const Lists: React.FC = () => {
  const [, setFormType] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const listNote = useSelector((state: RootState) => state.listNote.listNote);
  const isLoading = useSelector((state: RootState) => state.loading.loading);

  const setFormTypeHandler = (type: string) => {
    setFormType(type);
  };

  const handleListNoteEditClick = async (listNote: IListNote) => {
    setFormTypeHandler("edit");
    navigate(`/lists/editlist/${listNote.id}`);
  };

  const handleAddFormListClick = (source: string) => {
    setFormTypeHandler("add");
    if (source === "button") {
      navigate("/lists/addList");
    }
  };

  const handleReminderOpenClick = (listNote: IListNote) => {
    navigate(`/lists/${listNote.id}/reminders`);
  };

  const handleFormAddReminder = () => {
    navigate("/formAddReminder");
  };

  const deleListNote = async (listId: string): Promise<void> => {
    await dispatch(deleteListNote(listId));
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(getListNote());
      } catch (error) {
        console.error("Error loading data:");
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="menu-list-notes">
      {isLoading && <Loading />}
      <div className="menu-list-note" id="renderlist-home">
        <h1>My List</h1>
        {listNote.map((list: IListNote) => (
          <List
            key={list.id}
            onListDataFormEdit={handleListNoteEditClick}
            listNote={list}
            onOpenReminderClickListNote={handleReminderOpenClick}
            onDeleteListNote={deleListNote}
          />
        ))}
      </div>
      <div className="button-home">
        <Button
          className="add-reminder btn__add--reminder"
          onClick={() => handleFormAddReminder()}
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
  );
};

export default Lists;
