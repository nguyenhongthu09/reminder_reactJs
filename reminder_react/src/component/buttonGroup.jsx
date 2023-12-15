import React, { Component } from "react";

class ButtonGroup extends Component {
  render() {
    const { onAddListClick, isButtonGroupVisible } = this.props;
      console.log(isButtonGroupVisible, " thu xem");
    if (!isButtonGroupVisible) {
      console.log("truong hop an button");
      return null;
    }

    return (
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
          onClick={onAddListClick}
        >
          Add List
        </button>
      </div>
    );
  }
}

export default ButtonGroup;
