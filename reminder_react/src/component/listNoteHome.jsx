import React, { Component } from "react";
import ParentComponent from "./renderListUi";
import AddListForm from "./addListForm";
import ButtonGroup from "./buttonGroup";

class ListNoteRender extends Component {
  constructor() {
    super();
    this.state = {
      showAddListForm: false,
    };

    this.handleAddListClick = this.handleAddListClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleAddSuccess = this.handleAddSuccess.bind(this);
  }

  handleAddListClick() {
    console.log("mowr form add");
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
  updateListNote = (shouldUpdate) => {
    if (shouldUpdate) {
      this.setState({ isListUpdated: true });
    }
  };
  render() {
    const { showAddListForm } = this.state;
    return (
      <>
        <div
          className="menu-list-notes"
          style={{ display: showAddListForm ? "none" : "block" }}
        >
          <div className="menu-list-note" id="renderlist-home">
            <ParentComponent
              onEditClick={this.handleEditClick}
              isListUpdated={this.state.isListUpdated} 
            ></ParentComponent>
          </div>
          {/* {showButtons && ( */}
          <ButtonGroup
            onAddListClick={this.handleAddListClick}
            isButtonGroupVisible={true}
          />
          {/* )} */}
        </div>
        <AddListForm
          showForm={showAddListForm}
          updateListNote={this.updateListNote} 
          onCancelClick={this.handleCancelClick}
          onSuccess={this.handleAddSuccess}
        />
      </>
    );
  }
}

export default ListNoteRender;
