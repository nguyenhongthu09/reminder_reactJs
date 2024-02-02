import React, { Component } from "react";
import Icon from "./Icon";
import Button from "./Button";

interface Action {
  id: number;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  actions?: Action[];
  id?: string;
}

class Dropdown extends Component<DropdownProps> {
  render() {
    const { actions = [], id } = this.props;
    return (
      <div className="dropdown" id={id}>
        <Button
          className="btnDropdown"
          toggleForId={`dropdownMenuButton ${id}`}
        >
          <span className="icon-next">
            <Icon type="dropdown" />
          </span>
        </Button>
        <ul
          id="drop_css"
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton${id}`}
        >
          {Array.isArray(actions) &&
            actions.map((action) => (
              <li key={action.id} onClick={action.onClick}>
                {action.icon}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
