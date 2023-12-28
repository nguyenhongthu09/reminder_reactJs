import React, { Component } from "react";
import "../style/style.css";
import Dropdown from "../core/Dropdown";
import Icon from "../core/Icon";
class RenderListOnUi extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleListNoteClick = (list) => {
    if (this.props.onListNoteClick) {
      this.props.onListNoteClick(list);
    }
  };

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
  handleButtonClick = (listId, action) => {
    console.log(
      `Button with ID ${listId} and action ID ${action.id} is clicked`
    );
    if (action.id === 2) {
      const list = this.props.listNote.find((list) => list.id === listId);
      if (list && this.props.onListNoteClick) {
        this.props.onListNoteClick(list);
      }
    }
    if (action.id === 1) {
      const list = this.props.listNote.find((list) => list.id === listId);
      if (list && this.props.onListDeleteSuccess) {
        this.props.onListDeleteSuccess(list.id);
      }
    }
  };

  render() {
    const { listNote } = this.props;
    const actionsToShow = [
      {
        id: 1,
        key: "delete",
        icon: "M6.5 1H9.5C9.77614 1 10 1.22386 10 1.5V2.5H6V1.5C6 1.22386 6.22386 1 6.5 1ZM11 2.5V1.5C11 0.671573 10.3284 0 9.5 0H6.5C5.67157 0 5 0.671573 5 1.5V2.5H2.50566C2.50226 2.49997 2.49885 2.49997 2.49544 2.5H1.5C1.22386 2.5 1 2.72386 1 3C1 3.27614 1.22386 3.5 1.5 3.5H2.0384L2.89116 14.1595C2.97431 15.1989 3.84207 16 4.88479 16H11.1152C12.1579 16 13.0257 15.1989 13.1088 14.1595L13.9616 3.5H14.5C14.7761 3.5 15 3.27614 15 3C15 2.72386 14.7761 2.5 14.5 2.5H13.5046C13.5011 2.49997 13.4977 2.49997 13.4943 2.5H11ZM12.9584 3.5L12.112 14.0797C12.0704 14.5994 11.6366 15 11.1152 15H4.88479C4.36343 15 3.92955 14.5994 3.88798 14.0797L3.0416 3.5H12.9584ZM5.47064 4.50086C5.74631 4.48465 5.98292 4.69497 5.99914 4.97064L6.49914 13.4706C6.51535 13.7463 6.30503 13.9829 6.02936 13.9991C5.7537 14.0154 5.51708 13.805 5.50086 13.5294L5.00086 5.02936C4.98465 4.7537 5.19497 4.51708 5.47064 4.50086ZM10.5294 4.50086C10.805 4.51708 11.0154 4.7537 10.9991 5.02936L10.4991 13.5294C10.4829 13.805 10.2463 14.0154 9.97064 13.9991C9.69497 13.9829 9.48465 13.7463 9.50086 13.4706L10.0009 4.97064C10.0171 4.69497 10.2537 4.48465 10.5294 4.50086ZM8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V13.5C8.5 13.7761 8.27614 14 8 14C7.72386 14 7.5 13.7761 7.5 13.5V5C7.5 4.72386 7.72386 4.5 8 4.5Z",
        onClick: (listId, action) => this.handleButtonClick(listId, action),
      },
      {
        id: 2,
        key: "edit",
        icon: "M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.4992 14.064L10.2186 9.36844C10.1593 9.15091 9.96168 9 9.7362 9H6.2638C6.03832 9 5.84074 9.15091 5.78141 9.36844L4.50081 14.064C5.53023 14.6593 6.72533 15 8 15C9.27467 15 10.4698 14.6593 11.4992 14.064ZM12.3728 13.4665C13.9744 12.1837 15 10.2116 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 10.2116 2.02565 12.1837 3.62724 13.4665L4.81665 9.10532C4.98244 8.49743 5.50812 8.06295 6.1261 8.00629L7.28163 4.15451C7.49543 3.44186 8.50457 3.44186 8.71837 4.15451L9.8739 8.00629C10.4919 8.06295 11.0176 8.49743 11.1833 9.10532L12.3728 13.4665Z",
        onClick: (listId, action) => this.handleButtonClick(listId, action),
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
                    <Icon></Icon>
                  </span>
                </div>
                <span className="name-list">{list.name}</span>
              </div>
              <div className="item-list-none-right">
                <span
                  className="number-items-notes"
                  id={`total-done-${list.id}`}
                >
                  0
                </span>
                <span
                  className="number-items-note"
                  id={`total-count-${list.id}`}
                >
                  /0
                </span>
              </div>
            </div>
            <div className="icon-home-list-del">
              <Dropdown
                listId={list.id}
                actions={actionsToShow}
                onClick={this.handleButtonClick}
              ></Dropdown>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default RenderListOnUi;
