import React, { Component } from "react";
import Icon from "./Icon";
import Button from "./Button";
import PropTypes from "prop-types";
class Dropdown extends Component {
  handleActionClick = (id, action) => {
    const { onClick } = this.props;
    if (onClick && typeof onClick === "function") {
      onClick(id, action);
    }
  };

  render() {
    const { actions, id } = this.props;
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
                id={action.id}
                onClick={() => this.handleActionClick(id, action)}
              >
                {action.icon}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      icon: PropTypes.node,
    })
  ),
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default Dropdown;
