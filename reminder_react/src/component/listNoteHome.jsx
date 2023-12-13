import React, { Component } from "react";
import ParentComponent from "./renderListUi";
import AddListForm from "./addListForm";
import EditListForm from "./editListForm";
class ListNoteRender extends Component {
  constructor() {
    super();
    this.state = {
      showAddListForm: false,
      isEditFormVisible: false,
    };

    this.handleAddListClick = this.handleAddListClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleAddSuccess = this.handleAddSuccess.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditFormCancelClick = this.handleEditFormCancelClick.bind(this);
  }

  handleAddListClick() {
    this.setState((prevState) => ({
      showAddListForm: !prevState.showAddListForm,
    }));
  }
  handleCancelClick() {
    this.setState({
      showAddListForm: false,
    });
  }
  handleAddSuccess() {
   
      this.setState(() => ({
        showAddListForm: false,
      }));
    
  }
  handleEditClick(listId) {
    this.setState({
      isEditFormVisible: true,
      selectedListId: listId,
    });
    console.log("Edit clicked for listId:", listId);
  }
  handleEditFormCancelClick() {
    this.setState({
      isEditFormVisible: false,
    });
  }

  render() {
    const { showAddListForm  ,isEditFormVisible} = this.state;
    return (
      <>
        <div
          className="menu-list-notes"
          style={{ display: (showAddListForm  || isEditFormVisible) ? "none" : "block" }}
        >
          <div className="menu-list-note" id="renderlist-home">
            <ParentComponent  handleEditClick={this.handleEditClick}
            isEditFormVisible={isEditFormVisible}></ParentComponent>
          </div>
          <div className="button-home">
            <button
              type="button"
              className="btn btn-primary add-reminder btn__add--reminder"
            >
              New Reminder
            </button>
            <button
              type=" button"
              className="btn btn-primary add-list"
              id="add-list-new"
              onClick={this.handleAddListClick}
            >
              Add List
            </button>
          </div>
        </div>
        {isEditFormVisible && <EditListForm listId={this.state.selectedListId}
        onCancelEdit = {this.handleEditFormCancelClick}
         />}
        {!isEditFormVisible && (
          <AddListForm
            showForm={showAddListForm}
            onCancelClick={this.handleCancelClick}
            onSuccess={this.handleAddSuccess}
          />
        )}
      </>
    );
  }
}

export default ListNoteRender;
