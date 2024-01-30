import React, { useState, useEffect, memo, useContext } from "react";
import Reminder from "./Reminder";
import Button from "../core/Button";
import getAllList from "../../fetchApi/fetchApiList";
import Loading from "../core/Loading";
import PropTypes from "prop-types";
import ReminderFormInList from "./ReminderFormInList";
import { ReminderContext } from "../../context/ReminderContext";
import { ListContext } from "../../context/ListContext";

function Reminders({ nameList, onListsBackClick }) {
  const [isReminderForm, setIsReminderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
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
  const deleteReminder = async (id, status) => {
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

  const hasReminderData = contextReminder.reminders.length === 0;
  const sortedReminders = contextReminder.reminders.slice().sort((a, b) => {
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
}

Reminders.propTypes = {
  selectedListId: PropTypes.string,
  nameList: PropTypes.string,
  onListsBackClick: PropTypes.func,
  updateListTotalCount: PropTypes.func,
  updateTotalDone: PropTypes.func,
};

export default memo(Reminders);
