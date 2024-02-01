import React, { Component } from "react";

interface IconProps {
  type: string;
}

class Icon extends Component<IconProps> {
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

export default Icon;
