import React, { Component } from "react";
import PropTypes from "prop-types";
import notelist from "../../assets/img/svg/notelist.svg";
import deleteIcon from "../../assets/img/svg/delete.svg";
import edit from "../../assets/img/svg/edit.svg";
import dropdownIcon from "../../assets/img/svg/dropdown.svg";

class Icon extends Component {
  render() {
    const { type } = this.props;

    const selectIcon = () => {
      switch (type) {
        case "notelist":
          return <img src={notelist} alt="NoteList Icon" />;
        case "delete":
          return <img src={deleteIcon} alt="Delete Icon" />;
        case "edit":
          return <img src={edit} alt="Edit Icon" />;
        case "dropdown":
          return <img src={dropdownIcon} alt="Dropdown Icon" />;
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
