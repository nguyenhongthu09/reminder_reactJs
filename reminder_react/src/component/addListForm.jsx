import React, { Component } from "react";
import "../style/style.css";
import RenderColorOnUi from "./renderColorUi";
import { addNewList } from "../fetchApi/fetchApiList";
import ListNoteRender from "./listNoteHome";

class AddListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: "",
      form: {
        name: "",
      },
      isFormSubmitted: false,
    };
  }
  handleColorClick = (selectedColor) => {
    console.log(selectedColor, "selce");
    this.setState({ selectedColor });
  };

  handleChange = (e) => {
    const data = { ...this.state.form };
    data[e.target.name] = e.target.value;
    this.setState({ form: data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = this.state.form;
    const { selectedColor } = this.state;
    try {
      await addNewList({ name, isColor: selectedColor });
      this.setState({ isFormSubmitted: true });
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };

  render() {
    const { selectedColor, isFormSubmitted } = this.state;

    if (isFormSubmitted) {
      return <ListNoteRender></ListNoteRender>;
    }

    return (
      <form
        onSubmit={this.handleSubmit}
        id="form_add_list"
        action=""
        className={`form-add-list ${
          this.props.showForm ? "visible" : "hidden"
        }`}
      >
        <div className="form__add__list">
          <button
            type="button"
            id="btn-cancel"
            className="btn btn-primary button-cancel"
            onClick={this.props.onCancelClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            id="btnSubmit"
            className="btn btn-primary button-done"
          >
            Done
          </button>
        </div>
        <h1>New List</h1>
        <div className="form_add_list_name">
          <div
            className="fill-icon-color"
            id="icon-color"
            onChange={this.handleChange}
            style={{ backgroundColor: selectedColor }}
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
          <input
            type="text"
            name="name"
            id="name_icon"
            placeholder="List Name "
            required
            onChange={this.handleChange}
          />
          <p id="name_error" className="error-message">
            Please enter a list name.
          </p>
        </div>
        <div className="color-list-icon" id="color-list">
          <RenderColorOnUi onColorClick={this.handleColorClick} />
        </div>
      </form>
    );
  }
}
export default AddListForm;
