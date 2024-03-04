import React, { useState, useEffect, useContext } from "react";
import Reminder from "./atomics/Reminder";
import Button from "../core/Button";
import Loading from "../core/Loading";
import ReminderFormInList from "./ReminderFormInList";
import { IReminderType } from "../../types/reminder.type";
import { useNavigate } from "react-router-dom";
import { ListContext } from "../../store/context/listNote.context";
import { RootState, useAppDispatch } from "../../redux-toolkit/store/store";
import {
  getReminders,
  deleteReminder,
  updateReminder,
} from "../../redux-toolkit/action/actionReminder";
import { useSelector } from "react-redux";
import { getDetailList } from "../../redux-toolkit/action/actionListNote";
import { IListNote } from "../../types/listNote.type";
import { unwrapResult } from "@reduxjs/toolkit";

interface RemindersProps {
  idParam?: string;
}
const Reminders: React.FC<RemindersProps> = ({ idParam }) => {
  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] =
    useState<boolean>(true);
  const navigate = useNavigate();
  const context = useContext(ListContext);
  const dispatch = useAppDispatch();
  const reminders = useSelector(
    (state: RootState) => state.reminders.reminders
  );
  const isLoading = useSelector((state: RootState) => state.loading.loading);
  const hanldeBackList = () => {
    navigate("/");
  };

  const showReminderForm = () => {
    setIsReminderForm(true);
  };

  const deleReminder = async (idDeleReminder: string): Promise<void> => {
    try {
      await dispatch(deleteReminder(idDeleReminder));
    } catch (error) {
      console.error("Error fetching reminder:");
    }
  };

  const editReminder = async (
    noteId: string,
    newValue: string | boolean,
    updateType: string
  ): Promise<void> => {
    try {
      await dispatch(
        updateReminder({
          idEditReminder: noteId,
          newData: newValue,
          updateType: updateType,
        })
      );
    } catch (error) {
      console.error("Error fetching reminder:");
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (idParam) {
        await dispatch(getReminders(idParam));
        const listNote: IListNote = { id: idParam, name: "", isColor: "" };
        dispatch(getDetailList(listNote))
          .then((data: any) => {
            const list = unwrapResult(data);
            context.setNameList(list.name);
          })
          .catch((error: any) => {
            console.error("Error:", error);
          });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hasReminderData: boolean = reminders.length === 0;
  const sortedReminders: IReminderType[] = reminders.slice().sort((a, b) => {
    return a.status === b.status ? 0 : a.status ? 1 : -1;
  });

  return (
    <div>
      <div className="detail-list-note">
        <div className="note">
          <div className="button-detail-list">
            <Button className="btn-back-list" onClick={hanldeBackList}>
              Back List
            </Button>
            <Button
              className="add-reminder"
              id="btnsubmit-note"
              disabled={isDoneButtonDisabled}
            >
              Done
            </Button>
          </div>
          {isLoading && <Loading />}
          <h1 className="title-list">{context.nameList}</h1>
          {hasReminderData && <div className="thong-bao">Empty list !!!</div>}
          {sortedReminders.map(
            (note) =>
              note.idlist === idParam && (
                <Reminder
                  key={note.id}
                  reminder={note}
                  setIsDoneButtonDisabled={setIsDoneButtonDisabled}
                  onDeleteReminder={deleReminder}
                  onUpdateReminder={editReminder}
                />
              )
          )}

          <Button
            className="add__reminders"
            id="btnNewNote"
            onClick={showReminderForm}
          >
            New Reminder
          </Button>

          {isReminderForm && (
            <ReminderFormInList
              setIsDoneButtonDisabled={setIsDoneButtonDisabled}
              setIsReminderForm={setIsReminderForm}
              idParam={idParam}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
