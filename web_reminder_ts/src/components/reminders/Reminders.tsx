import React, { useState, useEffect, memo, useContext } from "react";
import Reminder from "./atomics/Reminder";
import Button from "../core/Button";
import getAllList from "../../fetchApi/fetchApiList";
import Loading from "../core/Loading";
import ReminderFormInList from "./ReminderFormInList";
import { ReminderContext } from "../../context/reminder.context";
import { ListContext } from "../../context/listNote.context";
import { IReminderType } from "../../types/reminder.type";

interface IRemindersProps {
  nameList: string;
  onListsBackClick?: () => void;
}

const Reminders: React.FC<IRemindersProps> = ({
  nameList,
  onListsBackClick,
}) => {
  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] =
    useState<boolean>(true);
  const contextReminder = useContext(ReminderContext);
  const contextList = useContext(ListContext);

  const hanldeBackList = async (): Promise<void> => {
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
  const deleteReminder = async (id: string, status: boolean): Promise<void> => {
    try {
      setLoading(true);
      contextReminder.deleteReminder(id, status);
    } catch (error) {
      console.error("Error fetching reminder:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    contextReminder.getAllReminders().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasReminderData: boolean = contextReminder.reminders.length === 0;
  const sortedReminders: IReminderType[] = contextReminder.reminders
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
