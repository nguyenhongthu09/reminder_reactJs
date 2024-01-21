import React, { useState, useEffect, useCallback, memo } from "react";
import Reminder from "./Reminder";
import {
  delREminder,
  getReminder,
  addNewReminder,
  updateReminderData,
} from "../../fetchApi/fetchApiREminder";
import Button from "../core/Button";
import getAllList from "../../fetchApi/fetchApiList";
import Loading from "../core/Loading";
import PropTypes from "prop-types";
import ReminderFormInList from "./ReminderFormInList";

function Reminders({
  selectedListId,
  nameList,
  onListsBackClick,
  updateListTotalCount,
  updateTotalDone,
}) {
  const [reminders, setReminders] = useState([]);
  const [reminderForm, setReminderForm] = useState(false);
  const [reminderTitle, setReminderTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);

  // GET REMINDERS
  const getReminders = async (selectedListId) => {
    try {
      const reminderData = await getReminder(selectedListId);
      setReminders(reminderData);
    } catch (error) {
      console.error("Error fetching reminder:", error.message);
    }
  };

  // ADD REMINDER
  const addReminderService = async () => {
    const newReminder = {
      title: reminderTitle,
      status: false,
      idlist: selectedListId,
    };

    try {
      setLoading(true);
      const response = await addNewReminder(newReminder);
      const newTotalCount = reminders.length + 1;
      updateListTotalCount(newTotalCount);

      const addedReminder = response ? response : null;
      if (addedReminder) {
        setReminders((prevReminders) => [...prevReminders, addedReminder]);
        setReminderTitle("");
        setIsDoneButtonDisabled(true);
        setReminderForm(false);
      }
    } catch (error) {
      console.error("Lỗi khi thêm mới reminder:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReminderTitleChange = (reminderTitle, isDoneButtonDisabled) => {
    setReminderTitle(reminderTitle);
    setIsDoneButtonDisabled(isDoneButtonDisabled);
  };

  const handleCloseReminderForm = () => {
    setReminderForm(false);
  };

  // DELETE REMINDER
  const deleteReminderService = async (deleReminderId, status) => {
    try {
      setLoading(true);
      await delREminder(deleReminderId);
      const newTotalCount = reminders.length - 1;
      if (status) {
        updateListTotalCount(newTotalCount);
        const newTotalDone = reminders.filter(
          (reminder) => reminder.id !== deleReminderId && reminder.status
        ).length;
        updateTotalDone(newTotalDone);
      } else {
        updateListTotalCount(newTotalCount);
      }
    } catch (error) {
      console.error("Error fetching reminder:", error.message);
    } finally {
      setLoading(false);
    }

    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== deleReminderId)
    );
  };

  // EDIT REMIDNER
  const editReminder = async (editedNoteId, newData, updateType) => {
    try {
      setLoading(true);
      let updatedReminder;

      if (updateType === "title") {
        updatedReminder = await updateReminderData(editedNoteId, {
          title: newData,
        });
      } else if (updateType === "status") {
        updatedReminder = await updateReminderData(editedNoteId, {
          status: newData,
        });

        if (updatedReminder) {
          const updatedReminders = reminders.map((reminder) =>
            reminder.id === updatedReminder.id ? updatedReminder : reminder
          );

          const newTotalDone = updatedReminders.filter(
            (reminder) => reminder.status
          ).length;

          updateTotalDone(newTotalDone);

          setReminders(updatedReminders);
          setIsDoneButtonDisabled(true);
        }
      } else {
        console.error("Loại cập nhật không hợp lệ");
        return;
      }

      console.log(updatedReminder, " Cập nhật thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật nhắc nhở:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const hanldeBackList = async () => {
    if (onListsBackClick) {
      setLoading(true);
      await getAllList();
      onListsBackClick();
      setLoading(false);
    }
  };

  const showReminderForm = () => {
    setReminderForm(true);
  };
  const isDoneButtonDisabledHandler = (isDoneButtonDisabled) => {
    setIsDoneButtonDisabled(isDoneButtonDisabled);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getReminders(selectedListId);
      setLoading(false);
    };

    fetchData();
  }, [selectedListId]);

  const hasReminderData = reminders.length === 0;
  const sortedReminders = reminders.slice().sort((a, b) => {
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
                  onReminderDeleSuccess={deleteReminderService}
                  onEditReminder={editReminder}
                  isDoneButtonDisabled={isDoneButtonDisabledHandler}
                />
              )
          )}
        </div>
        {reminderForm && (
          <ReminderFormInList
            onBlur={addReminderService}
            onCancelFormAdd={handleCloseReminderForm}
            onReminderTitleChange={handleReminderTitleChange}
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
