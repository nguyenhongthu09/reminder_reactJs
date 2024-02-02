import React, { memo } from "react";
import Dropdown from "../core/Dropdown";
import Icon from "../core/Icon";
import Button from "../core/Button";
import { IListNote } from "../../types/listNote.type";
import { IAction } from "../../types/action.type";
interface IListProps {
  listNote: IListNote;
  onListNoteItemClick?: (list: IListNote) => void;
  onListSelect?: (list: IListNote) => void;
  onListNoteClick?: (list: IListNote) => void;
  onListDeleteSuccess?: (id: string) => void;
}

const List: React.FC<IListProps> = ({
  listNote,
  onListNoteItemClick,
  onListNoteClick,
  onListDeleteSuccess,
  onListSelect,
}) => {
  const handleCLickNote = (): void => {
    onListNoteItemClick && onListNoteItemClick(listNote);
  };

  const handleChooseNameList = (): void => {
    onListSelect && onListSelect(listNote);
  };

  const actions: IAction[] = [
    {
      id: 1,
      key: "delete",
      icon: (
        <Button className="dropdown-item">
          <Icon type="delete"></Icon>
        </Button>
      ),
      onClick: () => handleButtonClick(1),
    },
    {
      id: 2,
      key: "edit",
      icon: (
        <Button className="dropdown-item">
          <Icon type="edit"></Icon>
        </Button>
      ),
      onClick: () => handleButtonClick(2),
    },
  ];

  const handleButtonClick = (actionId: number): void => {
    if (actionId === 2) {
      onListNoteClick && onListNoteClick(listNote);
    } else if (actionId === 1) {
      onListDeleteSuccess && onListDeleteSuccess(listNote.id);
    }
  };

  return (
    <div>
      <div className="listnote" key={listNote.id} id={listNote.id}>
        <div className="list-note" id={listNote.id} onClick={handleCLickNote}>
          <div className="item-list-none-left" onClick={handleChooseNameList}>
            <div
              className="icon-list-note"
              style={{ backgroundColor: listNote.isColor }}
            >
              <span className="icon-list">
                <Icon type="notelist" />
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
          <Dropdown id={listNote.id} actions={actions} />
        </div>
      </div>
    </div>
  );
};

export default memo(List);
