import React, { useState, useEffect, useContext } from "react";
import Reminder from "./atomics/Reminder";
import Button from "../core/Button";
import Loading from "../core/Loading";
import ReminderFormInList from "./ReminderFormInList";
import { IReminderType } from "../../types/reminder.type";
import { getListNote } from "../../store/redux/actions/listNote.action";
import { connect } from "react-redux";
import {
  getReminders,
  deleteReminder,
  updateReminder,
} from "../../store/redux/actions/reminder.action";

interface IRemindersProps {
  nameList: string;
  onListsBackClick?: () => void;
  getListNote: () => Promise<void>;
  getReminders: (selectedListId: string) => Promise<void>;
  reminders: IReminderType[];
  deleteReminder: (idDeleReminder: string, status: boolean) => Promise<void>;
  updateReminder: (
    idEditReminder: string,
    newData: string | boolean,
    updateType: string
  ) => Promise<void>;
  selectedListId: string;
}

const Reminders: React.FC<IRemindersProps> = ({
  nameList,
  onListsBackClick,
  getListNote,
  getReminders,
  reminders,
  deleteReminder,
  updateReminder,
  selectedListId,
}) => {
  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] =
    useState<boolean>(true);
  
  const hanldeBackList = async (): Promise<void> => {
    if (onListsBackClick) {
      setLoading(true);
      await getListNote();
      onListsBackClick();
      setLoading(false);
    }
  };

  const showReminderForm = () => {
    setIsReminderForm(true);
  };
  //DELETE REMIDNER
  const deleReminder = async (
    idDeleReminder: string,
    status: boolean
  ): Promise<void> => {
    try {
      setLoading(true);
      await deleteReminder(idDeleReminder, status);
      console.log(idDeleReminder, status, "xoa reminder");
    } catch (error) {
      console.error("Error fetching reminder:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        console.log(selectedListId, " id cua remidner");
        await getReminders(selectedListId);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:");
        console.log(error);
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
          {loading && <Loading />}
          <h1 className="title-list">{nameList}</h1>
          {hasReminderData && <div className="thong-bao">Empty list !!!</div>}
          {sortedReminders.map(
            (note) =>
              note.idlist === selectedListId && (
                <Reminder
                  key={note.id}
                  reminder={note}
                  setIsDoneButtonDisabled={setIsDoneButtonDisabled}
                  onDeleteReminder={deleReminder}
                  onUpdateReminder={updateReminder}
                />
              )
          )}
        </div>
        {isReminderForm && (
          <ReminderFormInList
            setIsDoneButtonDisabled={setIsDoneButtonDisabled}
            setIsReminderForm={setIsReminderForm}
            selectedListId={selectedListId}
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

const mapStateToProps = (state: any) => {
  return {
    reminders: state.reminderReducer.reminders,
  };
};

const mapDispathToProps = (dispatch: any) => {
  return {
    getListNote: () => dispatch(getListNote()),
    getReminders: (selectedListId: string) =>
      dispatch(getReminders(selectedListId)),
    deleteReminder: (idDeleReminder: string, status: boolean) =>
      dispatch(deleteReminder(idDeleReminder, status)),
    updateReminder: (
      idEditReminder: string,
      newData: string | boolean,
      updateType: string
    ) => dispatch(updateReminder(idEditReminder, newData, updateType)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Reminders);
