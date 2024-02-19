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
interface IListProps {
  listNote: IListNote[];
  getListNote: () => Promise<void>;
  getColors: () => Promise<void>;
  deleteListNote: (listId: string) => Promise<void>;
}

const Lists: React.FC<IListProps> = ({
  listNote,
  getListNote,
  getColors,
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
  const [nameList, setNameList] = useState<string>("");
  const context = useContext(ListContext);
  const setFormTypeHandler = (type: string) => {
    setIsListForm(type === "add" || type === "edit");
    setFormType(type);
  };

  const handleListNoteClick = (listNote: IListNote) => {
    setFormTypeHandler("edit");
    setListData(listNote);
  };

  const handleAddFormListClick = (source: string) => {
    setFormTypeHandler("add");
    if (source === "button") {
      setIsListForm(true);
      setListData({
        id: generateRandomStringId(),
        name: "",
        isColor: "",
      });
    }
  };

  const handleListNoteItemClick = (listNote: IListNote) => {
    setIsReminders(true);
    context.setSelectedListId(listNote.id);
    setNameList(listNote.name);
  };

  const handleBackList = () => {
    setIsReminders(false);
  };

  const handleFormAddReminder = (openForm: boolean) => {
    setIsReminderForm(openForm);
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
        await getColors();
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
              onListNoteClick={handleListNoteClick}
              listNote={list}
              onListNoteItemClick={handleListNoteItemClick}
              onListDeleteSuccess={deleListNote}
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

      {isReminders && (
        <Reminders onListsBackClick={handleBackList} nameList={nameList} />
      )}

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
