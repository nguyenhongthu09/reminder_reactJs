import React, { Component } from "react";
import Dropdown from "../core/Dropdown";
import Icon from "../core/Icon";
import Button from "../core/Button";
class RenderListOnUi extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleCLickNote = (list) => {
    if (this.props.onListNoteItemClick) {
      this.props.onListNoteItemClick(list);
    }
  };

  handleChooseNameList = (list) => {
    if (this.props.onListSelect) {
      this.props.onListSelect(list.name, list.id);
    }
  };
  handleButtonClick = (id, action) => {
    const selectedList = this.props.listNote.find((list) => list.id === id);
    if (action.id === 2) {
      if (id && this.props.onListNoteClick) {
        this.props.onListNoteClick(selectedList);
      }
    }
    if (action.id === 1) {
      if (id && this.props.onListDeleteSuccess) {
        this.props.onListDeleteSuccess(id);
      }
    }
  };

  render() {
    const { listNote } = this.props;
    const action = [
      {
        id: 1,
        key: "delete",
        icon: (
          <Button className="dropdown-item">
            <Icon type="delete"></Icon>
          </Button>
        ),
        onClick: (id, action) => {
          this.handleButtonClick(id, action);
        },
      },
      {
        id: 2,
        key: "edit",
        icon: (
          <Button className="dropdown-item">
            <Icon type="edit"></Icon>
          </Button>
        ),
        onClick: (id, action) => {
          this.handleButtonClick(id, action);
        },
      },
    ];
    return (
      <div>
        {listNote.map((list) => (
          <div className="listnote" key={list.id} id={list.id}>
            <div
              className="list-note"
              id={list.id}
              onClick={() => this.handleCLickNote(list)}
            >
              <div
                className="item-list-none-left"
                onClick={() => this.handleChooseNameList(list)}
              >
                <div
                  className="icon-list-note"
                  style={{ backgroundColor: list.isColor }}
                >
                  <span className="icon-list">
                    <Icon type="notelist"></Icon>
                  </span>
                </div>
                <span className="name-list">{list.name}</span>
              </div>
              <div className="item-list-none-right">
                <span
                  className="number-items-notes"
                  id={`total-done-${list.id}`}
                >
                  {list.totalDone}
                </span>
                <span
                  className="number-items-note"
                  id={`total-count-${list.id}`}
                >
                  /{list.totalCount}
                </span>
              </div>
            </div>
            <div className="icon-home-list-del">
              <Dropdown
                id={list.id}
                actions={action}
                onClick={(id, action) => action.onClick(id, action)}
              ></Dropdown>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default RenderListOnUi;
