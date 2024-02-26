import React, { useState, useEffect } from "react";
import Reminder from "./atomics/Reminder";
import Button from "../core/Button";
import Loading from "../core/Loading";
import ReminderFormInList from "./ReminderFormInList";
import { IReminderType } from "../../types/reminder.type";
import { connect } from "react-redux";
import {
  getReminders,
  deleteReminder,
  updateReminder,
} from "../../store/redux/actions/reminder.action";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
interface IRemindersProps {
  onListsBackClick?: () => void;
  getReminders: (selectedListId: string) => Promise<void>;
  reminders: IReminderType[];
  deleteReminder: (idDeleReminder: string) => Promise<void>;
  updateReminder: (
    idEditReminder: string,
    newData: string | boolean,
    updateType: string
  ) => Promise<void>;
}

const Reminders: React.FC<IRemindersProps> = ({
  onListsBackClick,
  getReminders,
  reminders,
  deleteReminder,
  updateReminder,
}) => {
  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] =
    useState<boolean>(true);
  const navigate = useNavigate();
  const params = useParams();
  const [, setNameList] = useState<string>("");
  const { name, id } = useParams<{ name: string; id: string }>();
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
      await deleteReminder(idDeleReminder);
      navigate(`/lists/${params.id}/reminders/${params.name}`);
      console.log(idDeleReminder, "xoa reminder");
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
        if (name) setNameList(name);
        if (id) await getReminders(id);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:");
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getReminders, id, setNameList, name]);
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
                    onUpdateReminder={updateReminder}
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

const mapStateToProps = (state: any) => {
  return {
    reminders: state.reminderReducer.reminders,
    nameList: state.listReducer.nameList,
  };
};

const mapDispathToProps = (dispatch: any) => {
  return {
    getReminders: (selectedListId: string) =>
      dispatch(getReminders(selectedListId)),
    deleteReminder: (idDeleReminder: string) =>
      dispatch(deleteReminder(idDeleReminder)),
    updateReminder: (
      idEditReminder: string,
      newData: string | boolean,
      updateType: string
    ) => dispatch(updateReminder(idEditReminder, newData, updateType)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Reminders);
