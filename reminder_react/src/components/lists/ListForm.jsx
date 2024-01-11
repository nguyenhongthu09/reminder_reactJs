import React, { Component } from "react";
import Button from "../core/Button";
import ListColor from "./ListColor";
import { generateRandomStringId } from "../../untils/common";
import Input from "../core/Input";
import Icon from "../core/Icon";
import Loading from "../core/Loading";
import PropTypes from "prop-types";
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
    const { formType, onSubEditForm, onSubmitSuccess } = this.props;
    const { id, name, isColor } = this.state;
    const formData = {
      id: id,
      name: name,
      isColor: isColor,
    };
    try {
      this.setState({ loading: true });

      if (formType === "edit") {
        await onSubEditForm(formData);
      } else {
        await onSubmitSuccess(formData);
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
    const { formType, listData } = this.props;
    if (formType === "edit" && listData) {
      const { id, name, isColor } = listData;
      this.setState({
        id: id,
        name: name,
        isColor: isColor,
      });
    }
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
          />
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

ListForm.propTypes = {
  formType: PropTypes.oneOf(["add", "edit"]),
  colors: PropTypes.arrayOf(PropTypes.string),
  onCancelClick: PropTypes.func,
  onSubEditForm: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  listData: PropTypes.object,
};
export default ListForm;
