import React, { Component } from "react";
import Button from "../core/Button";
import ListColor from "./ListColor";
import { generateRandomStringId } from "../../untils/common";
import Input from "../core/Input";
import Icon from "../core/Icon";
import Loading from "../core/Loading";
class ListForm extends Component {
  constructor() {
    super();
    this.state = {
      id: generateRandomStringId(),
      name: "",
      isButtonDisabled: true,
      loading: false,
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
    const isButtonDisabled = inputValue.trim() === "";
    this.setState({
      name: inputValue,
      isButtonDisabled: isButtonDisabled,
    });
  };

  handleInputClick = () => {
    this.setState({
      isButtonDisabled: false,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ loading: true });

      if (this.props.formType === "edit") {
        await this.props.onSubEditForm({
          id: this.state.id,
          name: this.state.name,
          isColor: this.state.isColor,
        });
      } else {
        await this.props.onSubmitSuccess({
          id: this.state.id,
          name: this.state.name,
          isColor: this.state.isColor,
        });
      }

      this.setState({ loading: false });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      this.setState({ loading: false });
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    const { formType, selectedListItem } = this.props;
    if (formType === "edit" && selectedListItem) {
      const { id, name, isColor } = selectedListItem;
      this.setState({
        id: id,
        name: name,
        isColor: isColor,
      });
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { formType, colors } = this.props;
    const { isColor, name, loading, isButtonDisabled } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        id="form_edit_list"
        action=""
        className={`form-edit-list ${formType}`}
      >
        {loading && <Loading />}
        <div className="form__edit__list">
          <Button
            id="btn-xoa"
            className="button-cancel"
            onClick={this.props.onCancelClick}
          >
            Cancel
          </Button>
          <Button
            disabled={isButtonDisabled}
            type="submit"
            id="btnsubedit"
            className="button-done"
          >
            {formType === "edit" ? "Edit" : "Done"}
          </Button>
        </div>
        <h1>{formType === "add" ? "Add List" : "Edit List"}</h1>

        <div className="form_add_list_name">
          <div
            className="fill-icon-color fill-color-edit"
            id="icon-color-edit"
            style={{ backgroundColor: isColor }}
          >
            <span className="fill-color">
              <Icon type="notelist"></Icon>
            </span>
          </div>
          <Input
            id="name_edit-list"
            placeholder="Name List"
            value={formType === "edit" ? name : undefined}
            onChange={this.handleNameChange}
            onClick={this.handleInputClick}
          ></Input>
          <p id="name_error" className="error-message">
            Please enter a list name.
          </p>
        </div>
        <div
          className="color-list-icon  render-list-color-edit"
          id="color-list-add-list"
        >
          <ListColor colors={colors} onColorClick={this.handleColorSelect} />
        </div>
      </form>
    );
  }
}
export default ListForm;
