import React, { Component } from "react";
import ParentComponent from "./renderListUi";
import AddListForm from "./addListForm";
import EditListForm from "./editListForm";
import ReminderHome from "./reminderHome";
import AddReminderForm from "./addFormReminder";
class ListNoteRender extends Component {
  constructor() {
    super();
    this.state = {
      listNote: [],
      selectedListId: null,
      showAddListForm: false,
      isEditFormVisible: false,
      showRenderReminderUi: false,
      showAddReminderForm: false,
      selectedListName: "",
    };

    this.handleAddListClick = this.handleAddListClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleAddSuccess = this.handleAddSuccess.bind(this);
    this.handleEditFormCancelClick = this.handleEditFormCancelClick.bind(this);
  }
  handleEditFormCancelClick() {
    this.setState({
      isEditFormVisible: false,
    });
  }
  handleListNoteClick = (listNote) => {
    const { id, name, isColor } = listNote;
    this.handleEditClickParent({ id, name, isColor });
  };

  handleCLickReminder = (listNote) => {
    this.setState({
      showRenderReminderUi: true,
      showAddListForm: false,
      isEditFormVisible: false,
      selectedListId: listNote.id,
      selectedListName: listNote.name,
    });
  };
  handleListsButtonClick = () => {
    this.setState({
      showRenderReminderUi: false,
    });
  };
  handleAddListClick() {
    this.setState({
      showAddListForm: true,
    });
  }
  handleCancelClick() {
    this.setState({
      showAddListForm: false,
    });
  }
  handleCancelFormAddReminder = () => {
    this.setState({ showAddReminderForm: false });
  };
  handleAddSuccess() {
    this.setState(() => ({
      showAddListForm: false,
    }));
  }
  handleEditClickParent = (listData) => {
    const { id, name, isColor } = listData;
    this.setState({
      selectedListId: id,
      isEditFormVisible: true,
      editFormData: {
        id: id,
        name: name,
        isColor: isColor,
      },
    });
  };
  handleClickFormAddReminder = () => {
    this.setState({
      showAddReminderForm: true,
    });
  };
  handleClickName = (listNote) => {
    const { id, name, isColor } = listNote;
    this.handleEditClickParent({ id, name, isColor });
    this.setState({
      selectedListName: name,
      id: id,
    });
  };

  render() {
    const {
      showAddListForm,
      isEditFormVisible,
      editFormData,
      showRenderReminderUi,
      showAddReminderForm,
      selectedListName,
    } = this.state;

    return (
      <>
        <div
          className="menu-list-notes"
          style={{
            display:
              showAddListForm ||
              isEditFormVisible ||
              showRenderReminderUi ||
              showAddReminderForm
                ? "none"
                : "block",
          }}
        >
          <div className="menu-list-note" id="renderlist-home">
            <ParentComponent
              onListNoteClick={this.handleListNoteClick}
              onEditClick={this.handleEditClick}
              onEditClickParent={this.handleEditClickParent}
              onClickReminder={this.handleCLickReminder}
            ></ParentComponent>
          </div>
          {/* {showButtons && ( */}
          <div className="button-home">
            <button
              type="button"
              className="btn btn-primary add-reminder btn__add--reminder"
              onClick={this.handleClickFormAddReminder}
              // onClickBackList={this.handleCancelFormAddReminder}
            >
              New Reminder
            </button>
            <button
              type="button"
              className="btn btn-primary add-list"
              id="add-list-new"
              onClick={this.handleAddListClick}
            >
              Add List
            </button>
          </div>
          {/* )} */}
        </div>
        <AddListForm
          showForm={showAddListForm}
          onCancelClick={this.handleCancelClick}
          onSuccess={this.handleAddSuccess}
        />
        {showAddReminderForm && (
          <AddReminderForm
            onCancelFormAdd={this.handleCancelFormAddReminder}
            defaultSelectedListName={selectedListName}
          />
        )}
        {isEditFormVisible && (
          <EditListForm
            listId={this.state.selectedListId}
            showEditForm={isEditFormVisible}
            formData={editFormData}
            onCancelEdit={this.handleEditFormCancelClick}
            onEditClickParent={() =>
              this.handleEditClickParent(this.state.selectedListId)
            }
          ></EditListForm>
        )}
        {showRenderReminderUi && (
          <ReminderHome
            onListsButtonClick={this.handleListsButtonClick}
            selectedListId={this.state.selectedListId}
            selectedListName={this.state.selectedListName}
          />
        )}
      </>
    );
  }
}

export default ListNoteRender;
