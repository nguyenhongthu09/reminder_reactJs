import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useContext,
  ChangeEvent,
  FormEvent,
} from "react";
import Button from "../core/Button.tsx";
import { ListNote } from "../../types/listNote.type.ts";
import ListColor from "./ListColor.tsx";

import Input from "../core/Input.tsx";
import Icon from "../core/Icon.tsx";
import Loading from "../core/Loading.tsx";

import { ListContext } from "../../context/listNote.context.tsx";

interface ListFormProps {
  formType: string;
  listData: ListNote;
  setIsListForm: React.Dispatch<React.SetStateAction<boolean>>;
  setListData: React.Dispatch<React.SetStateAction<ListNote>>;
};

const ListForm: React.FC<ListFormProps> = ({
  formType,
  listData,
  setIsListForm,
  setListData,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(ListContext);

  const handleColorSelect = (selectedColor: string) => {
    setListData((prevData) => ({
      ...prevData,
      isColor: selectedColor,
    }));
    setIsButtonDisabled(false);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const isDisabled = inputValue.trim() === "";
    setListData((prevData) => ({
      ...prevData,
      name: inputValue,
    }));
    setIsButtonDisabled(isDisabled);
  };

  const handleInputClick = () => {
    setIsButtonDisabled(false);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (formType === "edit") {
        context.editListNote(listData);
        setIsListForm(false);
      } else {
        context.addListNote(listData);
        setIsListForm(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    submitButtonRef.current?.focus();
    inputRef.current?.focus();
  }, []);

  const handleCancelClick = () => {
    setIsListForm(false);
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
          style={{ backgroundColor: listData.isColor }}
        >
          <span className="fill-color">
            <Icon type="notelist"></Icon>
          </span>
        </div>
        <Input
          id="name_edit-list"
          placeholder="Name List"
          value={listData.name}
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
        <ListColor onColorClick={handleColorSelect} />
      </div>
    </form>
  );
};

export default memo(ListForm);
