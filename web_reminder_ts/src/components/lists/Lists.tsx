import React, { useState, useEffect, useContext } from "react";
import List from "./atomics/List";
import ListForm from "./ListForm";
import Reminders from "../reminders/Reminders";
import ReminderForm from "../reminders/ReminderForm";
import Button from "../core/Button";
import Loading from "../core/Loading";
import { generateRandomStringId } from "../../utils/common";
import { IListNote } from "../../types/listNote.type";
import {
  getListNote,
  deleteListNote,
  getColors,
} from "../../store/redux/actions/listNote.action";
import { connect } from "react-redux";
import { ListContext } from "../../store/context/listNote.context";
import { useNavigate } from "react-router-dom";

interface IListProps {
  listNote: IListNote[];
  getListNote: () => Promise<void>;
  deleteListNote: (listId: string) => Promise<void>;
}

const Lists: React.FC<IListProps> = ({
  listNote,
  getListNote,
  deleteListNote,
}) => {
  const [isListForm, setIsListForm] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("");
  const [isReminderForm, setIsReminderForm] = useState<boolean>(false);
  const [isReminders, setIsReminders] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<IListNote>({
    id: "",
    name: "",
    isColor: "",
  });
  const navigate = useNavigate();

  const context = useContext(ListContext);
  const setFormTypeHandler = (type: string) => {
    setIsListForm(type === "add" || type === "edit");
    setFormType(type);
  };

  const handleListNoteEditClick = (listNote: IListNote) => {
    setFormTypeHandler("edit");
    setListData(listNote);
    navigate(`/lists/editlist/${listNote.id}`, {
      state: { listData: listNote },
    });
  };

  const handleAddFormListClick = (source: string) => {
    setFormTypeHandler("add");
    if (source === "button") {
      setIsListForm(true);
      navigate("/lists/addList", {
        state: {
          listData: { id: generateRandomStringId(), name: "", isColor: "" },
        },
      });
    }
  };

  const handleReminderOpenClick = (listNote: IListNote) => {
    setIsReminders(true);
    context.setSelectedListId(listNote.id);
    context.setNameList(listNote.name);
    navigate(`/lists/${listNote.id}/reminders/${listNote.name}`);
  };

  const handleBackList = () => {
    setIsReminders(false);
  };

  const handleFormAddReminder = (openForm: boolean) => {
    setIsReminderForm(openForm);
    navigate("/formAddReminder");
  };

  //DELETE LISTNOTE
  const deleListNote = async (listId: string): Promise<void> => {
    setIsLoading(true);
    console.log(listId, " id");
    await deleteListNote(listId);
    setIsLoading(false);
    console.log(listId, "id cua listnot via xoa");
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        await getListNote();
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:");
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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

      {isListForm && (
        <ListForm
          formType={formType}
          listData={listData}
          setIsListForm={setIsListForm}
          setListData={setListData}
        />
      )}

      {isReminders && <Reminders onListsBackClick={handleBackList} />}

      {isReminderForm && <ReminderForm setIsReminderForm={setIsReminderForm} />}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    listNote: state.listReducer.listNote,
  };
};

const mapDispathToProps = (dispatch: any) => {
  return {
    getListNote: () => dispatch(getListNote()),
    getColors: () => dispatch(getColors()),
    deleteListNote: (listId: string) => dispatch(deleteListNote(listId)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Lists);
