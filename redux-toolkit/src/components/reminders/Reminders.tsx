import React, { useState, useEffect, useContext } from "react";
import Reminder from "./atomics/Reminder";
import Button from "../core/Button";
import Loading from "../core/Loading";
import ReminderFormInList from "./ReminderFormInList";
import { IReminderType } from "../../types/reminder.type";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ListContext } from "../../store/context/listNote.context";
import { RootState, useAppDispatch } from "../../redux-toolkit/store/store";
import {
  getReminders,
  deleteReminder,
  updateReminder,
} from "../../redux-toolkit/action/actionReminder";
import { useSelector } from "react-redux";
interface IRemindersProps {
  onListsBackClick?: () => void;
}

const Reminders: React.FC<IRemindersProps> = ({ onListsBackClick }) => {
  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] =
    useState<boolean>(true);
  const navigate = useNavigate();
  const context = useContext(ListContext);
  const params = useParams();
  const { name, id } = useParams<{ name: string; id: string }>();
  const dispatch = useAppDispatch();
  const reminders = useSelector(
    (state: RootState) => state.reminders.reminders
  );
  const hanldeBackList = () => {
    if (onListsBackClick) {
      setLoading(true);
      navigate("/");
      onListsBackClick();
      setLoading(false);
    }
  };

  const showReminderForm = () => {
    setIsReminderForm(true);
    navigate("reminderFormAddInList");
  };
  //DELETE REMIDNER
  const deleReminder = async (idDeleReminder: string): Promise<void> => {
    try {
      setLoading(true);
      await dispatch(deleteReminder(idDeleReminder));
      navigate(`/lists/${params.id}/reminders/${params.name}`);
      console.log(idDeleReminder, "xoa reminder");
    } catch (error) {
      console.error("Error fetching reminder:");
    } finally {
      setLoading(false);
    }
  };

  const editReminder = async (
    noteId: string,
    newValue: string | boolean,
    updateType: string
  ): Promise<void> => {
    try {
      setLoading(true);
      await dispatch(
        updateReminder({
          idEditReminder: noteId,
          newData: newValue,
          updateType: updateType,
        })
      );

      navigate(`/lists/${params.id}/reminders/${params.name}`);
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
        if (name) context.setNameList(name);
        if (id) await dispatch(getReminders(id));
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
          <h1 className="title-list">{name}</h1>
          {hasReminderData && <div className="thong-bao">Empty list !!!</div>}
          {sortedReminders.map(
            (note) =>
              note.idlist === id && (
                <Link key={note.id} to={`reminder/${note.id}`}>
                  <Reminder
                    reminder={note}
                    setIsDoneButtonDisabled={setIsDoneButtonDisabled}
                    onDeleteReminder={deleReminder}
                    onUpdateReminder={editReminder}
                  />
                </Link>
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
