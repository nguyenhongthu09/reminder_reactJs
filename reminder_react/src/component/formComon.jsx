import React, { Component } from "react";

import RenderColorOnUi from "./renderColorUi";
import { generateRandomStringId } from "../untils/common";
class FormCommonListNote extends Component {
  constructor() {
    super();
    this.state = {
      formType: "",
      isInputClicked: false,
      isButtonDisabled: true,
      id: generateRandomStringId(),
      name: "",
    };
  }

  setFormType = (type) => {
    this.setState({
      formType: type,
    });
  };

  handleColorSelect = (selectedColor) => {
    this.setState({
      isColor: selectedColor,
      isButtonDisabled: false,
    });
  };

  handleNameChange = (event) => {
    const inputValue = event.target.value;
    const isButtonDisabled =
      inputValue.trim() === "" || !this.state.isInputFocused;
    this.setState({
      name: inputValue,
      isButtonDisabled: isButtonDisabled,
    });
  };

  handleInputClick = () => {
    this.setState({
      isInputClicked: true,
      isButtonDisabled: false,
    });
  };
  handleInputBlur = () => {
    console.log("click");
    const isInputClicked = this.state.name.trim() === "";
    this.setState({
      isInputClicked: isInputClicked,
    });
  };

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { name, isColor } = this.state;
  //   const { formType, onSubmitSuccess } = this.props;
  //   try {
  //     if (formType === "add") {
  //       const id = generateRandomStringId();
  //       await addNewList({ name, isColor, id });
  //       if (onSubmitSuccess) {
  //         onSubmitSuccess({ name, isColor, id });
  //       }
  //     } else if (formType === "edit") {
  //       await updateListData(this.state.id, name, isColor);
  //       if (onSubmitSuccess) {
  //         onSubmitSuccess({ name, isColor, id: this.state.id });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi dữ liệu:", error.message);
  //   }
  // };

  componentDidMount() {
    const { formType, selectedListData } = this.props;
    if (formType === "edit" && selectedListData) {
      const { id, name, isColor } = selectedListData;
      this.setState({
        id: id,
        name: name,
        isColor: isColor,
      });
    }
  }

  render() {
    const { formType } = this.props;
    return (
      <form
        onSubmit={this.props.onSubmitSuccess}
        id="form_edit_list"
        action=""
        className={`form-edit-list ${formType}`}
      >
        <div className="form__edit__list">
          <button
            type="button"
            id="btn-xoa"
            className="btn btn-primary button-cancel"
            onClick={this.props.onCancelClick}
          >
            Cancel
          </button>
          {formType === "edit" ? (
            <button
              // disabled={this.state.isButtonDisabled}
              type="button"
              id="btnsubedit"
              className="btn btn-primary button-done"
              onClick={() => {
                this.props.onSubEditForm({
                  id: this.state.id,
                  name: this.state.name,
                  isColor: this.state.isColor,
                });
              }}
            >
              Done
            </button>
          ) : (
            <button
              disabled={!this.state.isInputClicked}
              type="button"
              id="btnsubedit"
              className="btn btn-primary button-done"
              onClick={() => {
                this.props.onSubmitSuccess({
                  id: this.state.id,
                  name: this.state.name,
                  isColor: this.state.isColor,
                });
              }}
            >
              Done
            </button>
          )}
        </div>
        <h1>{formType === "add" ? "Add List" : "Edit List"}</h1>

        <div className="form_add_list_name">
          <div
            className="fill-icon-color fill-color-edit"
            id="icon-color-edit"
            style={{ backgroundColor: this.state.isColor }}
          >
            <span className="fill-color">
              <svg
                width="40"
                height="40"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 11.5C5 11.2239 5.22386 11 5.5 11H14.5C14.7761 11 15 11.2239 15 11.5C15 11.7761 14.7761 12 14.5 12H5.5C5.22386 12 5 11.7761 5 11.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 7.5C5 7.22386 5.22386 7 5.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H5.5C5.22386 8 5 7.77614 5 7.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 3.5C5 3.22386 5.22386 3 5.5 3H14.5C14.7761 3 15 3.22386 15 3.5C15 3.77614 14.7761 4 14.5 4H5.5C5.22386 4 5 3.77614 5 3.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 4.5C2.55228 4.5 3 4.05228 3 3.5C3 2.94772 2.55228 2.5 2 2.5C1.44772 2.5 1 2.94772 1 3.5C1 4.05228 1.44772 4.5 2 4.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 8.5C2.55228 8.5 3 8.05228 3 7.5C3 6.94772 2.55228 6.5 2 6.5C1.44772 6.5 1 6.94772 1 7.5C1 8.05228 1.44772 8.5 2 8.5Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 12.5C2.55228 12.5 3 12.0523 3 11.5C3 10.9477 2.55228 10.5 2 10.5C1.44772 10.5 1 10.9477 1 11.5C1 12.0523 1.44772 12.5 2 12.5Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          {formType === "edit" ? (
            <input
              type="text"
              id="name_edit-list"
              placeholder="Tên Danh Sách"
              value={this.state.name}
              onChange={this.handleNameChange}
              onClick={this.handleInputClick}
              onBlur={this.handleInputBlur}
            />
          ) : (
            <input
              type="text"
              id="name_edit-list"
              placeholder="Tên Danh Sách"
              onChange={this.handleNameChange}
              onClick={this.handleInputClick}
            />
          )}
          <p id="name_error" className="error-message">
            Please enter a list name.
          </p>
        </div>
        <div
          className="color-list-icon  render-list-color-edit"
          id="color-list-add-list"
        >
          <RenderColorOnUi
            color={this.props.colorData}
            onColorClick={this.handleColorSelect}
          />
        </div>
      </form>
    );
  }
}
export default FormCommonListNote;
