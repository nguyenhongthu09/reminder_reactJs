import React, { Component } from "react";
import List from "./List";
import getAllList from "../../fetchApi/fetchApiList";
import getColor from "../../fetchApi/fetchColor";
import ListForm from "./ListForm";
import Reminders from "../reminders/Reminders";
import ReminderForm from "../reminders/ReminderForm";
import {
  addNewList,
  updateListData,
  delList,
} from "../../fetchApi/fetchApiList";
import Button from "../core/Button";
import Loading from "../core/Loading";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNote: [],
      colors: [],
      listForm: false,
      formType: "",
      selectedListId: null,
      reminderForm: false,
      reminders: false,
      loading: false,
      listData: null,
      nameList: "",
      showSuccessAlert: false,
      addNew: false, 
    };
  }

  setFormTypeHandler = (type) => {
    this.setState({
      listForm: type === "add" || type === "edit",
      formType: type,
    });
  };

  // GET LISTNOTE
  getListNote = async () => {
    try {
      const listData = await getAllList();
      this.setState({ listNote: listData });
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
  };

  // GET COLOR
  getColors = async () => {
    try {
      const colorData = await getColor();
      this.setState({ colors: colorData.map((colors) => colors.color) });
    } catch (error) {
      console.error("Error fetching colorData:", error.message);
    }
  };

  // ADD LISTNOTE
  addListServiceForm = async (newList) => {
    try {
      if (this.state.formType === "add") {
        newList.totalDone = 0;
        newList.totalCount = 0;
        await addNewList(newList);
        this.setState((prevState) => ({
          listForm: false,
          listNote: [...prevState.listNote, newList],
          addNew: true,
        }));
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };

  // EDIT LISTNOTE
  editListServiceForm = async (list) => {
    try {
      if (this.state.formType === "edit") {
        const updatedListNote = this.state.listNote.map((listNote) =>
          listNote.id === list.id
            ? {
                ...listNote,
                name: list.name,
                isColor: list.isColor,
              }
            : listNote
        );
        const updatedList = updatedListNote.find(
          (listNote) => listNote.id === list.id
        );

        this.setState({
          listForm: false,
          listNote: updatedListNote,
        });

        const currentTotalDone = updatedList.totalDone;
        const currentTotalCount = updatedList.totalCount;
        await updateListData(
          list.id,
          list.name,
          list.isColor,
          currentTotalDone,
          currentTotalCount
        );
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };

  // DELETE LISTNOTE
  deleteListNoteService = async (deletedListId) => {
    try {
      await delList(deletedListId);
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }

    this.setState((prevState) => ({
      listNote: prevState.listNote.filter((list) => list.id !== deletedListId),
    }));
  };

  handleListNoteClick = (listNote) => {
    this.setFormTypeHandler("edit");
    this.setState({ listData: listNote });
  };

  handleAddFormListClick = (source) => {
    this.setFormTypeHandler("add");
    if (source === "button") {
      this.setState({ listForm: true });
    }
  };

  handleCancelClick = () => {
    this.setState({ listForm: false });
  };

  handleListNoteItemClick = (listNote) => {
    this.setState({
      reminders: true,
      selectedListId: listNote.id,
      nameList: listNote.name,
    });
  };

  handleBackList = () => {
    this.setState({ reminders: false });
  };

  handleFormAddReminder = (openForm) => {
    this.setState({ reminderForm: openForm });
  };

  // update khi them moi trong form
  updateListNoteCount = (listId, newTotalCount) => {
    this.setState((prevState) => ({
      listNote: prevState.listNote.map((list) =>
        list.id === listId ? { ...list, totalCount: newTotalCount } : list
      ),
    }));
  };

  // update khi them moi va xoa trong remidner
  updateListTotalCount = (newTotalCount) => {
    this.setState((prevState) => ({
      listNote: prevState.listNote.map((list) =>
        list.id === prevState.selectedListId
          ? { ...list, totalCount: newTotalCount }
          : list
      ),
    }));
  };

  // update total co status la true
  updateTotalDone = (newTotalDone) => {
    this.setState((prevState) => ({
      listNote: prevState.listNote.map((list) =>
        list.id === prevState.selectedListId
          ? { ...list, totalDone: newTotalDone }
          : list
      ),
    }));
  };

  componentDidMount() {
    console.log("Component did mount use");
    const fetchData = async () => {
      try {
        this.setState({ loading: true });
        await Promise.all([this.getListNote(), this.getColors()]);
        this.setState({ loading: false });
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };
    fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.addNew && this.state.listNote.length > prevState.listNote.length) {
      this.setState({ showSuccessAlert: true , addNew:false});
      setTimeout(() => {
        this.setState({ showSuccessAlert: false });
      }, 2000);
    } 
  }
  








  
  render() {
    const {
      showSuccessAlert,
      loading,
      listNote,
      listForm,
      reminders,
      reminderForm,
      nameList,
      selectedListId,
      colors,
      listData,
    } = this.state;

    return (
      <>
        <div className="menu-list-notes">
          {showSuccessAlert && (
            <div className="success-alert">
              <p>ListNote added successfully!</p>
            </div>
          )}
          {loading && <Loading />}
          <div className="menu-list-note" id="renderlist-home">
            <h1>My List</h1>
            {listNote &&
              listNote.map((list) => (
                <List
                  key={list.id}
                  onListNoteClick={this.handleListNoteClick}
                  onListDeleteSuccess={this.deleteListNoteService}
                  listNote={list}
                  onListNoteItemClick={this.handleListNoteItemClick}
                />
              ))}
          </div>
          <div className="button-home">
            <Button
              className="add-reminder btn__add--reminder"
              onClick={() => this.handleFormAddReminder(true)}
            >
              New Reminder
            </Button>

            <Button
              className="add-list"
              id="add-list-new"
              onClick={() => {
                this.handleAddFormListClick("button");
              }}
            >
              Add List
            </Button>
          </div>
        </div>

        {listForm && (
          <ListForm
            onCancelClick={this.handleCancelClick}
            formType={this.state.formType}
            listData={listData}
            colors={colors}
            onSubmitSuccess={this.addListServiceForm}
            onSubEditForm={this.editListServiceForm}
            setListForm={(value) => this.setState({ listForm: value })}
          />
        )}

        {reminders && (
          <Reminders
            onListsBackClick={this.handleBackList}
            nameList={nameList}
            selectedListId={selectedListId}
            updateListTotalCount={this.updateListTotalCount}
            updateTotalDone={this.updateTotalDone}
            reminders={reminders}
          />
        )}

        {reminderForm && (
          <ReminderForm
            onCancelFormAdd={() => this.handleFormAddReminder(false)}
            onSubmitAddReminderForm={() => this.handleFormAddReminder(false)}
            listNote={listNote}
            updateListNoteCount={this.updateListNoteCount}
          />
        )}
      </>
    );
  }
}

export default Lists;
