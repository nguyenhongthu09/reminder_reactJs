import React, { useState, useEffect, memo, useContext } from "react";
import Reminder from "./Reminder.tsx";
import Button from "../core/Button.tsx";
import getAllList from "../../fetchApi/fetchApiList.ts";
import Loading from "../core/Loading.tsx";
import ReminderFormInList from "./ReminderFormInList.tsx";
import { ReminderContext } from "../../context/reminder.context.tsx";
import { ListContext } from "../../context/listNote.context.tsx";
import { ReminderType } from "../../types/reminder.type.ts";

interface RemindersProps {
  nameList: string;
  onListsBackClick?: () => void;
}

const Reminders: React.FC<RemindersProps> = ({
  nameList,
  onListsBackClick,
}) => {
  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] =
    useState<boolean>(true);
  const contextReminder = useContext(ReminderContext);
  const contextList = useContext(ListContext);

  const hanldeBackList = async () => {
    if (onListsBackClick) {
      setLoading(true);
      await getAllList();
      onListsBackClick();
      setLoading(false);
    }
  };

  const showReminderForm = () => {
    setIsReminderForm(true);
  };
  //DELETE REMIDNER
  const deleteReminder = async (id: string, status: boolean) => {
    try {
      setLoading(true);
      contextReminder.deleteReminder(id, status);
    } catch (error) {
      console.error("Error fetching reminder:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      contextReminder.getAllReminders();
      setLoading(false);
    };

    fetchData();
  }, []);

  const hasReminderData: boolean = contextReminder.reminders.length === 0;
  const sortedReminders: ReminderType[] = contextReminder.reminders
    .slice()
    .sort((a, b) => {
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
          {loading && <Loading />}
          <h1 className="title-list">{nameList}</h1>
          {hasReminderData && <div className="thong-bao">Empty list !!!</div>}
          {sortedReminders.map(
            (note) =>
              note.idlist === contextList.selectedListId && (
                <Reminder
                  key={note.id}
                  reminder={note}
                  setIsDoneButtonDisabled={setIsDoneButtonDisabled}
                  onDeleteReminder={deleteReminder}
                  onUpdateReminder={contextReminder.updateReminder}
                />
              )
          )}
        </div>
        {isReminderForm && (
          <ReminderFormInList
            setIsDoneButtonDisabled={setIsDoneButtonDisabled}
            setIsReminderForm={setIsReminderForm}
          />
        )}

        <Button
          className="add__reminders"
          id="btnNewNote"
          onClick={showReminderForm}
        >
          New Reminder
        </Button>
      </div>
    </div>
  );
};

export default memo(Reminders);
