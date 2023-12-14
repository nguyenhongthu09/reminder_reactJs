import React, { Component } from "react";
import ParentComponent from "./renderListUi";
import AddListForm from "./addListForm";


class ListNoteRender extends Component {
  constructor() {
    super();
    this.state = {
      showAddListForm: false,
      showButtons: true,
    };

    this.handleAddListClick = this.handleAddListClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleAddSuccess = this.handleAddSuccess.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  handleEditClick() {
    this.setState({
      showButtons: false, 
    });
  }
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
  handleShowButtons(value) {
    this.setState({
      showButtons: value,
    }, () => {
      this.handleShowButtons();
      console.log("ok hien thi");
    });
  }

  render() {
    const { showAddListForm ,showButtons} = this.state;
    return (
      <>
        <div
          className="menu-list-notes"
          style={{ display: showAddListForm ? "none" : "block" }}
        >
          <div className="menu-list-note" id="renderlist-home">
            <ParentComponent onEditClick={this.handleEditClick}
           onShowButtons={showButtons}
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
      </>
    );
  }
}

export default ListNoteRender;
