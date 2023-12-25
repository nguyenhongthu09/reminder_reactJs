import React, { Component } from "react";
import ParentComponent from "./renderListUi";
import getAllList from "../fetchApi/fetchApiList";
import getColor from "../fetchApi/fetchColor";
import FormCommonListNote from "./formComon";

class ListNoteRender extends Component {
  constructor() {
    super();
    this.state = {
      listNote: [],
      color: [],
      showFormCommonListNote: false,
      formType: "",
    };

    this.handleAddListClick = this.handleAddListClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.setFormType = this.setFormType.bind(this);
    this.handleFormSubmitSuccess = this.handleFormSubmitSuccess.bind(this);
  }
  setFormType(formType) {
    this.setState({
      showFormCommonListNote: formType === "add" || formType === "edit",
      formType: formType,
    });
  }

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

  handleFormSubmitSuccess = async (updatedListData) => {
    this.setState({
      showFormCommonListNote: false,
    });

    const { formType } = this.state;
    if (formType === "add") {
      this.setState(
        (prevState) => ({
          listNote: [...prevState.listNote, updatedListData],
          colorData: [...prevState.colorData, updatedListData.isColor],
        }),
        () => {
          console.log("Thêm mới thành công");
        }
      );
    } else if (formType === "edit") {
      const updatedListNote = this.state.listNote.map((list) =>
        list.id === updatedListData.id
          ? {
              ...list,
              name: updatedListData.name,
              isColor: updatedListData.isColor,
            }
          : list
      );

      this.setState(
        {
          listNote: updatedListNote,
        },
        () => {
          console.log("Cập nhật thành công");
        }
      );
    }
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
      showFormCommonListNote: true,
    });
  };

  handleAddListClick(source) {
    this.setFormType("add");

    if (source === "button" || source === "dropdown") {
      this.setState({
        showFormCommonListNote: true,
      });
    }
  }
  handleCancelClick() {
    this.setState({
      showFormCommonListNote: false,
    });
  }
  handleListDeleteSuccess = async (deletedListId) => {
    this.setState((prevState) => ({
      listNote: prevState.listNote.filter((list) => list.id !== deletedListId),
    }));
  };

  componentDidMount = async () => {
    this.getListNote();
    this.getColors();
  };

  render() {
    const { showFormCommonListNote } = this.state;

    return (
      <>
        <div
          className="menu-list-notes"
          style={{
            display: showFormCommonListNote ? "none" : "block",
          }}
        >
          <div className="menu-list-note" id="renderlist-home">
            <ParentComponent
              onListNoteClick={this.handleListNoteClick}
              onListDeleteSuccess={this.handleListDeleteSuccess}
              listNote={this.state.listNote}
            ></ParentComponent>
          </div>

          {/* {showButtons && ( */}
          <div className="button-home">
            <button
              type="button"
              className="btn btn-primary add-reminder btn__add--reminder"
            >
              New Reminder
            </button>
            <button
              type="button"
              className="btn btn-primary add-list"
              id="add-list-new"
              onClick={() => this.handleAddListClick("button")}
            >
              Add List
            </button>
          </div>
          {/* )} */}
        </div>

        {showFormCommonListNote && (
          <FormCommonListNote
            setFormType={this.setFormType}
            onCancelClick={this.handleCancelClick}
            formType={this.state.formType}
            selectedListData={this.state.selectedListData}
            colorData={this.state.colorData}
            onSubmitSuccess={this.handleFormSubmitSuccess}
          />
        )}
      </>
    );
  }
}

export default ListNoteRender;
