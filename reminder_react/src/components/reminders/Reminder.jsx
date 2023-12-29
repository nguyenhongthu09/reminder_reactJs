import React, { Component } from "react";
import Dropdown from "../core/Dropdown";
import Button from "../core/Button";
import Input from "../core/Input";
import Icon from "../core/Icon";
class RenderReminder extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleEdit = (noteId, newValue) => {
    this.setState({
      editedNote: {
        id: noteId,
        value: newValue,
      },
    });
  };

  handleButtonClick = (id, action) => {
    console.log(id, action.id, "log gia tri cua remidner");
    if (action.id === 1) {
      if (id && this.props.onReminderDeleSuccess) {
        this.props.onReminderDeleSuccess(id);
      }
    }
  };

  handleInputChange = (noteId, newValue) => {
    // Xử lý sự kiện khi giá trị của trường input thay đổi
    // Có thể thực hiện các bước xử lý khác tùy thuộc vào nhu cầu của bạn
    // Ví dụ: this.setState({ editedValue: newValue });
  };
  

  render() {
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
    ];

    const { selectedListId, reminders, hasReminderData } = this.props;

    return (
      <>
        <h1 className="title-list">{this.props.selectedListName}</h1>
        {!hasReminderData && <div className="thong-bao">Empty list !!!</div>}
        {reminders.map((note) => (
          <div key={note.id} id={note.id}>
            {note.idlist === selectedListId && (
              <div
                className="reminder__detail"
                id={note.id}
                data-listnote-id={note.idlist}
              >
                <div className="items-list-reminder">
                  <div className="form-check item-reminder">
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id={`id-input-${note.id}`}
                      defaultChecked={note?.status}
                    />
                    <Input
                      className={`form-check-name doimau ${
                        note.status ? "checked" : ""
                      }`}
                      onChange={(e) => this.handleInputChange(note.id, e.target.value)}
                      // data-reminder-id={note.id}
                      value={note.title}
                      placeholder="Add Note"
                      onBlur={(e) => this.handleEdit(note.id, e.target.value)}
                    />
                  </div>
                </div>
                <div className="icon-detail-reminder-del">
                  <Dropdown
                    id={note.id}
                    actions={action}
                    onClick={(id, action) => action.onClick(id, action)}
                  ></Dropdown>
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
}

export default RenderReminder;
