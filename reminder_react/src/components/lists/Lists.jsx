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
  constructor() {
    super();
    this.state = {
      listNote: [],
      colors: [],
      listForm: false,
      formType: "",
      selectedListId: null,
      reminderForm: false,
      reminders: false,
      loading: false,
    };
  }

  setFormType = (formType) => {
    this.setState({
      listForm: formType === "add" || formType === "edit",
      formType: formType,
    });
  };

  //GET LISTNOTE
  getListNote = async () => {
    try {
      const listData = await getAllList();
      this.setState((prevState) => ({
        listNote: listData,
      }));
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
  };

  //GET COLOR
  getColors = async () => {
    try {
      const colorData = await getColor();
      this.setState({
        colors: colorData.map((colors) => colors.color),
      });
    } catch (error) {
      console.error("Error fetching colorData:", error.message);
    }
  };

  // ADD LISTNOTE
  addListServiceForm = async (newList) => {
    try {
      const { formType } = this.state;
      if (formType === "add") {
        newList.totalDone = 0;
        newList.totalCount = 0;
        await addNewList(newList);
        this.setState((prevState) => ({
          listForm: false,
          listNote: [...prevState.listNote, newList],
        }));
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };

  //EDIT LISTNOTE
  editListServiceForm = async (list) => {
    try {
      const { formType } = this.state;
      if (formType === "edit") {
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

        this.setState({ listForm: false, listNote: updatedListNote }, () => {});
        console.log("Cập nhật thành công", updatedList);
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

  //DELETE LISTNOTE
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
    this.setFormType("edit");
    this.setState({
      listData: listNote,
      listForm: true,
    });
  };

  handleAddFormListClick = (source) => {
    this.setFormType("add");
    if (source === "button") {
      this.setState({
        listForm: true,
      });
    }
  };

  handleCancelClick = () => {
    this.setState({
      listForm: false,
    });
  };

  handleListNoteItemClick = (listNote) => {
    console.log(listNote, "log thu ne");
    this.setState({
      reminders: true,
      selectedListId: listNote.id,
      nameList: listNote.name,
    });
  };

  hanldeBackList = () => {
    this.setState({
      reminders: false,
    });
  };

  handleFormAddReminder = (openForm) => {
    this.setState({
      reminderForm: openForm,
    });
  };

  // update khi them moi trong form
  updateListNoteCount = (listId, newTotalCount) => {
    this.setState((prevState) => {
      const updatedListNote = prevState.listNote.map((list) =>
        list.id === listId ? { ...list, totalCount: newTotalCount } : list
      );
      return { listNote: updatedListNote };
    });
  };

  //update khi them moi va xoa trong remidner
  updateListTotalCount = (newTotalCount) => {
    const { selectedListId } = this.state;
    this.setState((prevState) => {
      const updatedListNote = prevState.listNote.map((list) =>
        list.id === selectedListId
          ? { ...list, totalCount: newTotalCount }
          : list
      );
      return { listNote: updatedListNote };
    });
  };

  //update total co status la true
  updateTotalDone = (newTotalDone) => {
    const { selectedListId } = this.state;

    this.setState((prevState) => {
      const updatedListNote = prevState.listNote.map((list) =>
        list.id === selectedListId ? { ...list, totalDone: newTotalDone } : list
      );

      return { listNote: updatedListNote };
    });
  };

  componentDidMount = async () => {
    try {
      this.setState({ loading: true });
      await Promise.all([this.getListNote(), this.getColors()]);
      this.setState({ loading: false });
    } catch (error) {
      console.error("Error loading data:", error.message);
    }
  };

  render() {
    const {
      listForm,
      reminders,
      reminderForm,
      loading,
      colors,
      listData,
      listNote,
      formType,
      selectedListId,
      nameList,
    } = this.state;

    return (
      <>
        <div
          className="menu-list-notes"
          style={{
            display: listForm || reminders || reminderForm ? "none" : "block",
          }}
        >
          {loading && <Loading />}
          <div className="menu-list-note" id="renderlist-home">
            <h1>My List</h1>
            <List
              onListNoteClick={this.handleListNoteClick}
              onListDeleteSuccess={this.deleteListNoteService}
              listNotes={listNote}
              onListNoteItemClick={this.handleListNoteItemClick}
            ></List>
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
              onClick={() => this.handleAddFormListClick("button")}
            >
              Add List
            </Button>
          </div>
          {/* )} */}
        </div>

        {listForm && (
          <ListForm
            onCancelClick={this.handleCancelClick}
            formType={formType}
            listData={listData}
            colors={colors}
            onSubmitSuccess={this.addListServiceForm}
            onSubEditForm={this.editListServiceForm}
          />
        )}

        {reminders && (
          <Reminders
            onListsBackClick={this.hanldeBackList}
            nameList={nameList}
            selectedListId={selectedListId}
            updateListTotalCount={this.updateListTotalCount}
            updateTotalDone={this.updateTotalDone}
            reminders={this.state.reminders}
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
