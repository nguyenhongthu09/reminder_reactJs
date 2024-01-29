import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  memo,
  useContext,
} from "react";
import Button from "../core/Button";
import ListColor from "./ListColor";
import { generateRandomStringId } from "../../untils/common";
import Input from "../core/Input";
import Icon from "../core/Icon";
import Loading from "../core/Loading";
import PropTypes from "prop-types";
import { ListContext } from "../../context/ListContext";
function ListForm({
  formType,
  colors,
  onCancelClick,
  listData,
  setListForm,
}) {
  const [formData, setFormData] = useState({
    id: generateRandomStringId(),
    name: "",
    isColor: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const submitButtonRef = useRef(null);
  const inputRef = useRef(null);
  const context = useContext(ListContext);
  const handleColorSelect = useCallback(
    (selectedColor) => {
      setFormData((prevData) => ({
        ...prevData,
        isColor: selectedColor,
      }));
      setIsButtonDisabled(false);
    },
    [setFormData]
  );

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const isDisabled = inputValue.trim() === "";
    setFormData((prevData) => ({
      ...prevData,
      name: inputValue,
    }));
    setIsButtonDisabled(isDisabled);
  };

  const handleInputClick = () => {
    setIsButtonDisabled(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      if (formType === "edit") {
        context.editListNote(formData);
        console.log(formData, " log form data");
        setListForm(false);
      } else {
        context.addListNote(formData);
        console.log(formData, " log form data");
        setListForm(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };
  useEffect(() => {
    console.log("name");
    if (formType === "edit" && listData) {
      const { id, name, isColor } = listData;

      setFormData({
        id: id,
        name: name,
        isColor: isColor,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    submitButtonRef.current.focus();
    inputRef.current.focus();
  }, []);

  const handleCancelClick = () => {
    onCancelClick();
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="form_edit_list"
      action=""
      className={`form-edit-list ${formType}`}
    >
      {loading && <Loading />}
      <div className="form__edit__list">
        <Button
          ref={submitButtonRef}
          type="submit"
          className="button__keydown"
        />
        <Button
          id="btn-xoa"
          className="button-cancel"
          onClick={handleCancelClick}
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
          style={{ backgroundColor: formData.isColor }}
        >
          <span className="fill-color">
            <Icon type="notelist"></Icon>
          </span>
        </div>
        <Input
          id="name_edit-list"
          placeholder="Name List"
          value={formData.name}
          onChange={handleNameChange}
          onClick={handleInputClick}
          ref={inputRef}
        />
        <p id="name_error" className="error-message">
          Please enter a list name.
        </p>
      </div>
      <div
        className="color-list-icon  render-list-color-edit"
        id="color-list-add-list"
      >
        <ListColor colors={colors} onColorClick={handleColorSelect} />
      </div>
    </form>
  );
}

ListForm.propTypes = {
  formType: PropTypes.oneOf(["add", "edit"]),
  colors: PropTypes.arrayOf(PropTypes.string),
  onCancelClick: PropTypes.func,
  onSubEditForm: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  listData: PropTypes.object,
};

export default memo(ListForm);
