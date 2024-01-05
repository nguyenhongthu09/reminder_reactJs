import React, { Component } from "react";
import RenderListOnUi from "./List";
import getAllList from "../../fetchApi/fetchApiList";
import getColor from "../../fetchApi/fetchColor";
import ListForm from "./ListForm";
import RemindersList from "../reminders/Reminders";
import AddReminderForm from "../reminders/ReminderForm";
import {
  addNewList,
  updateListData,
  delList,
} from "../../fetchApi/fetchApiList";
import Button from "../core/Button";
import LoadingIcon from "../core/Loading";

class ListPage extends Component {
  constructor() {
    super();
    this.state = {
      listNote: [],
      colors: [],
      showFormCommonListNote: false,
      formType: "",
      selectedListName: "",
      selectedListId: null,
      showAddReminderForm: false,
      showReminderHome: false,
      loading: false,
    };

    this.handleAddListClick = this.handleAddFormListClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.setFormType = this.setFormType.bind(this);
    this.handleCancelFormAdd = this.handleCancelFormAddReminder.bind(this);
  }
  setFormType(formType) {
    this.setState({
      showFormCommonListNote: formType === "add" || formType === "edit",
      formType: formType,
    });
  }

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
        colorData: colorData.map((colors) => colors.color),
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
          showFormCommonListNote: false,
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
      const { formType, selectedListId } = this.state;
      if (formType === "edit" && selectedListId) {
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

        this.setState(
          { showFormCommonListNote: false, listNote: updatedListNote },
          () => {
            console.log("Cập nhật thành công");
          }
        );
        const currentTotalDone = updatedList.totalDone;
        const currentTotalCount = updatedList.totalCount;

        await updateListData(
          selectedListId,
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
      console.log("xoa thanh cong", deletedListId);
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
    this.setState((prevState) => ({
      listNote: prevState.listNote.filter((list) => list.id !== deletedListId),
    }));
  };

  handleListNoteClick = (list) => {
    this.setFormType("edit");

    const { id, name, isColor } = list;
    this.setState({
      selectedListData: {
        id,
        name,
        isColor,
      },
      selectedListId: id,
      showFormCommonListNote: true,
    });
  };

  handleAddFormListClick(source) {
    this.setFormType("add");

    if (source === "button") {
      this.setState({
        showFormCommonListNote: true,
      });
    }
  }

  handleCancelClick = () => {
    this.setState({
      showFormCommonListNote: false,
    });
  };

  handleListNoteItemClick = (listNote) => {
    const { id, name } = listNote;
    this.setState({
      showReminderHome: true,
      selectedListName: name,
      selectedListId: id,
    });
  };

  hanldeBackList = () => {
    this.setState({
      showReminderHome: false,
    });
  };

  hanldeOpenFormAddReminder = () => {
    this.setState({
      showAddReminderForm: true,
    });
  };

  handleCancelFormAddReminder = () => {
    this.setState({
      showAddReminderForm: false,
    });
  };

  handleSubFormAddReminder = () => {
    this.setState({
      showAddReminderForm: false,
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
      showFormCommonListNote,
      showReminderHome,
      selectedListName,
      selectedListId,
      showAddReminderForm,
      loading,
    } = this.state;

    return (
      <>
        <div
          className="menu-list-notes"
          style={{
            display:
              showFormCommonListNote || showReminderHome || showAddReminderForm
                ? "none"
                : "block",
          }}
        >
          {loading && <LoadingIcon />}
          <div className="menu-list-note" id="renderlist-home">
            <h1>My List</h1>
            <RenderListOnUi
              onListNoteClick={this.handleListNoteClick}
              onListDeleteSuccess={this.deleteListNoteService}
              listNote={this.state.listNote}
              onListNoteItemClick={this.handleListNoteItemClick}
            ></RenderListOnUi>
          </div>
          <div className="button-home">
            <Button
              className="add-reminder btn__add--reminder"
              onClick={this.hanldeOpenFormAddReminder}
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

        {showFormCommonListNote && (
          <ListForm
            onCancelClick={this.handleCancelClick}
            formType={this.state.formType}
            selectedListData={this.state.selectedListData}
            colorData={this.state.colorData}
            onSubmitSuccess={this.addListServiceForm}
            onSubEditForm={this.editListServiceForm}
          />
        )}

        {showReminderHome && (
          <RemindersList
            onListsBackClick={this.hanldeBackList}
            selectedListName={selectedListName}
            selectedListId={selectedListId}
            updateListTotalCount={this.updateListTotalCount}
            updateTotalDone={this.updateTotalDone}
          />
        )}

        {showAddReminderForm && (
          <AddReminderForm
            onCancelFormAdd={this.handleCancelFormAddReminder}
            onSubmitAddReminderForm={this.handleSubFormAddReminder}
            listNote={this.state.listNote}
            updateListNoteCount={this.updateListNoteCount}
          />
        )}
      </>
    );
  }
}

export default ListPage;
