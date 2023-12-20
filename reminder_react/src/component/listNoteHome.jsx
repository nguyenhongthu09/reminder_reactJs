import React, { Component } from "react";
import ParentComponent from "./renderListUi";
import AddListForm from "./addListForm";
import EditListForm from "./editListForm";

class ListNoteRender extends Component {
  constructor() {
    super();
    this.state = {
      listNote: [],
      selectedListId: null,
      showAddListForm: false,
      isEditFormVisible: false,
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
    this.handleEditClickParent({id,  name, isColor });
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
  handleAddSuccess() {
    this.setState(() => ({
      showAddListForm: false,
    }));
  }
  handleEditClickParent = (listData) => {
    console.log("ID from ParentComponent:", listData);
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
 
  render() {
    const { showAddListForm , isEditFormVisible,editFormData } = this.state;
   
    return (
      <>
        <div
          className="menu-list-notes"
          style={{ display: showAddListForm || isEditFormVisible ? "none" : "block" }}
        >
          <div className="menu-list-note" id="renderlist-home">
            <ParentComponent
             onListNoteClick={this.handleListNoteClick}
              onEditClick={this.handleEditClick}
              onEditClickParent={this.handleEditClickParent}
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
        {
          isEditFormVisible && (
            <EditListForm
            listId={this.state.selectedListId} 
            showEditForm = {isEditFormVisible}
            formData={editFormData}
            onCancelEdit= {this.handleEditFormCancelClick}
            onEditClickParent={() => this.handleEditClickParent(this.state.selectedListId)}
            ></EditListForm>
          )
        }
     
      </>
    );
  }
}

export default ListNoteRender;
