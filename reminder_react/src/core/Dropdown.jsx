import React, { Component } from "react";

class Dropdown extends Component {
  render() {
    const { actions, listId, onClick } = this.props;
    return (
      <div className="dropdown" id={listId}>
        <button
          className="btn "
          type="button"
          id={`dropdownMenuButton${listId}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="icon-next">
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http:www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.64645 1.64645C4.84171 1.45118 5.15829 1.45118 5.35355 1.64645L11.3536 7.64645C11.5488 7.84171 11.5488 8.15829 11.3536 8.35355L5.35355 14.3536C5.15829 14.5488 4.84171 14.5488 4.64645 14.3536C4.45118 14.1583 4.45118 13.8417 4.64645 13.6464L10.2929 8L4.64645 2.35355C4.45118 2.15829 4.45118 1.84171 4.64645 1.64645Z"
                fill="black"
              />
            </svg>
          </span>
        </button>
        <ul
        id="drop_css"
          className="dropdown-menu" 
          aria-labelledby={`dropdownMenuButton${listId}`}
        >
          {actions.map((action) => (
            <li key={action.id} id={action.id}>
              <button
                className={`dropdown-item ${action.key}`}
                // href="#"
                type="button"
                onClick={() => onClick(listId, action)}
              >
                <span className={`${action.key}-icon`}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={action.icon} fill="black" />
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
