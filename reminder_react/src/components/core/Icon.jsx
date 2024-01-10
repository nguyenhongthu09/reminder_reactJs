import React, { Component } from "react";
import PropTypes from "prop-types";

class Icon extends Component {
  render() {
    const { type } = this.props;

    const selectIcon = () => {
      switch (type) {
        case "notelist":
          return <img src="svg/notelist.svg" alt="NoteList Icon" />;
        case "delete":
          return <img src="svg/delete.svg" alt="Delete Icon" />;
        case "edit":
          return <img src="svg/edit.svg" alt="Edit Icon" />;
        case "dropdown":
          return <img src="svg/dropdown.svg" alt="Dropdown Icon" />;
        default:
          return null;
      }
    };

    return <div>{selectIcon()}</div>;
  }
}

Icon.propTypes = {
  type: PropTypes.string,
};

export default Icon;
