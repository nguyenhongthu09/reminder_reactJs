import React , {memo}from "react";
import Dropdown from "../core/Dropdown";
import Icon from "../core/Icon";
import Button from "../core/Button";
import PropTypes from "prop-types";

function List({
  listNote,
  onListNoteItemClick,
  onListSelect,
  onListNoteClick,
  onListDeleteSuccess,
}) {
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
        handleButtonClick(id, action);
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
        handleButtonClick(id, action);
      },
    },
  ];

  const handleCLickNote = (list) => {
    console.log("1");
    if (onListNoteItemClick) {
      onListNoteItemClick(list);
    }
  };

  const handleChooseNameList = (list) => {
    console.log("2");
    if (onListSelect) {
      onListSelect(list);
    }
  };

  const handleButtonClick = (id, action) => {
    console.log("3");
    if (action.id === 2) {
      if (id && onListNoteClick) {
        const listnote = listNote;
        onListNoteClick(listnote);
      }
    }
    if (action.id === 1) {
      if (id && onListDeleteSuccess) {
        onListDeleteSuccess(id);
      }
    }
  };
console.log("lisst");
  return (
    <div>
      <div className="listnote" key={listNote.id} id={listNote.id}>
        <div
          className="list-note"
          id={listNote.id}
          onClick={() => handleCLickNote(listNote)}
        >
          <div
            className="item-list-none-left"
            onClick={() => handleChooseNameList(listNote)}
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
            actions={action}
            onClick={(id, action) => action.onClick(id, action)}
          />
        </div>
      </div>
    </div>
  );
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

export default memo(List);
