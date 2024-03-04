import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import Button from "../core/Button";
import { IListNote } from "../../types/listNote.type";
import ListColor from "./ListColor";
import Input from "../core/Input";
import Icon from "../core/Icon";
import Loading from "../core/Loading";
import { useNavigate } from "react-router-dom";
import {
  createList,
  editListNote,
} from "../../redux-toolkit/action/actionListNote";
import { useAppDispatch } from "../../redux-toolkit/store/store";
import { RootState } from "../../redux-toolkit/store/store";
import { useSelector } from "react-redux";
import { getDetailList } from "../../redux-toolkit/action/actionListNote";
import { unwrapResult } from "@reduxjs/toolkit";
import { generateRandomStringId } from "../../utils/common";
interface IListFormProps {
  formType: string;
  idParam?: string;
}

const ListForm: React.FC<IListFormProps> = ({ formType, idParam }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [listData, setListData] = useState<IListNote>({
    id: generateRandomStringId(),
    name: "",
    isColor: "",
  });
  const isLoading = useSelector((state: RootState) => state.loading.loading);

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
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (formType === "edit") {
        await dispatch(editListNote(listData));
      } else {
        await dispatch(createList(listData));
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:");
    } finally {
    }
  };
  const handleCancelClick = () => {
    navigate("/");
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
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (idParam) {
      const listNote: IListNote = { id: idParam, name: "", isColor: "" };
      dispatch(getDetailList(listNote))
        .then((data: any) => {
          const list = unwrapResult(data);
          setListData(list);
        })
        .catch((error: any) => {
          console.error("Error:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      id="form_edit_list"
      action=""
      className={`form-edit-list ${formType}`}
    >
      {isLoading && <Loading />}
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
            <Icon type="notelist" />
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

export default ListForm;
