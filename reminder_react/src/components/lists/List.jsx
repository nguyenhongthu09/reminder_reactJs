import React, { Component } from "react";
import Dropdown from "../core/Dropdown";
import Icon from "../core/Icon";
import Button from "../core/Button";
import PropTypes from "prop-types";
class List extends Component {
  constructor() {
    super();
    this.action = [
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
  }

  handleCLickNote = (list) => {
    if (this.props.onListNoteItemClick) {
      this.props.onListNoteItemClick(list);
    }
  };

  handleChooseNameList = (list) => {
    if (this.props.onListSelect) {
      this.props.onListSelect(list);
    }
  };
  handleButtonClick = (id, action) => {
    if (action.id === 2) {
      if (id && this.props.onListNoteClick) {
        const listnote = this.props.listNote;
        this.props.onListNoteClick(listnote);
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

    return (
      <div>
        <div className="listnote" key={listNote.id} id={listNote.id}>
          <div
            className="list-note"
            id={listNote.id}
            onClick={() => this.handleCLickNote(listNote)}
          >
            <div
              className="item-list-none-left"
              onClick={() => this.handleChooseNameList(listNote)}
            >
              <div
                className="icon-list-note"
                style={{ backgroundColor: listNote.isColor }}
              >
                <span className="icon-list">
                  <Icon type="notelist"></Icon>
                </span>
              </div>
              <span className="name-list">{listNote.name}</span>
            </div>
            <div className="item-list-none-right">
              <span
                className="number-items-notes"
                id={`total-done-${listNote.id}`}
              >
                {listNote.totalDone}
              </span>
              <span
                className="number-items-note"
                id={`total-count-${listNote.id}`}
              >
                /{listNote.totalCount}
              </span>
            </div>
          </div>
          <div className="icon-home-list-del">
            <Dropdown
              id={listNote.id}
              actions={this.action}
              onClick={(id, action) => action.onClick(id, action)}
            />
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  listNote: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    isColor: PropTypes.any,
    totalDone: PropTypes.number,
    totalCount: PropTypes.number,
  }),
  onListNoteItemClick: PropTypes.func,
  onListSelect: PropTypes.func,
  onListNoteClick: PropTypes.func,
  onListDeleteSuccess: PropTypes.func,
};

export default List;
