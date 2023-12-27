import React, { Component } from "react";
import RenderListOnUi from "./RenderListUi";
import getAllList from "../fetchApi/fetchApiList";
import getColor from "../fetchApi/fetchColor";
import FormCommonListNote from "./FormComon";
import ReminderHome from "./ReminderHome";
import AddReminderForm from "./AddFormReminder";
import { addNewList, updateListData, delList } from "../fetchApi/fetchApiList";

class ListNoteHomePage extends Component {
  constructor() {
    super();
    this.state = {
      listNote: [],
      color: [],
      showFormCommonListNote: false,
      formType: "",
      selectedListName: "",
      selectedListId: null,
      showAddReminderForm: false,
      showReminderHome: false,
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
        await addNewList(newList);
        this.setState(
          (prevState) => ({
            showFormCommonListNote: false,
            listNote: [...prevState.listNote, newList],
          }),
          () => {
            console.log("Thêm mới thành công");
          }
        );
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
                ...list,
                name: list.name,
                isColor: list.isColor,
              }
            : listNote
        );

        this.setState(
          { showFormCommonListNote: false, listNote: updatedListNote },
          () => {
            console.log("Cập nhật thành công");
          }
        );
        await updateListData(selectedListId, list.name, list.isColor);
        console.log(selectedListId, list.name, list.isColor, "edit list");
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

  handleListNoteClick = (listNote) => {
    this.setFormType("edit");

    const { id, name, isColor } = listNote;
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

  componentDidMount = async () => {
    this.getListNote();
    this.getColors();
  };

  render() {
    const {
      showFormCommonListNote,
      showReminderHome,
      selectedListName,
      selectedListId,
      showAddReminderForm,
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
            <button
              type="button"
              className="btn btn-primary add-reminder btn__add--reminder"
              onClick={this.hanldeOpenFormAddReminder}
            >
              New Reminder
            </button>
            <button
              type="button"
              className="btn btn-primary add-list"
              id="add-list-new"
              onClick={() => this.handleAddFormListClick("button")}
            >
              Add List
            </button>
          </div>
          {/* )} */}
        </div>

        {showFormCommonListNote && (
          <FormCommonListNote
            // setFormType={this.setFormType}
            onCancelClick={this.handleCancelClick}
            formType={this.state.formType}
            selectedListData={this.state.selectedListData}
            colorData={this.state.colorData}
            onSubmitSuccess={this.addListServiceForm}
            onSubEditForm={this.editListServiceForm}
          />
        )}

        {showReminderHome && (
          <ReminderHome
            onListsButtonClick={this.hanldeBackList}
            selectedListName={selectedListName}
            selectedListId={selectedListId}
          />
        )}

        {showAddReminderForm && (
          <AddReminderForm
            onCancelFormAdd={this.handleCancelFormAddReminder}
            onSubmitAddReminderForm={this.handleSubFormAddReminder}
            listNote={this.state.listNote}
          />
        )}
      </>
    );
  }
}

export default ListNoteHomePage;
