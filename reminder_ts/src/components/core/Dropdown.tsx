import React, { Component } from "react";
import Icon from "./Icon.tsx";
import Button from "./Button.tsx";

interface Action {
  id: number;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  actions?: Action[];
  id?: string;
  // onActionClick?: (actionId: number) => void;
}

class Dropdown extends Component<DropdownProps> {
  // handleActionClick = (actionId: number) => {
  //   const { onActionClick } = this.props;
  //   if (onActionClick && typeof onActionClick === "function") {
  //     onActionClick(actionId);
  //   }
  // };

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
              <li
                key={action.id}
                // id={action.id.toString()}
                onClick={action.onClick}
              >
                {action.icon}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
