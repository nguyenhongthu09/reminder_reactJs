import ListForm from "../../components/lists/ListForm";
import React, { useState } from "react";
import { IListNote } from "../../types/listNote.type";
import { useParams, useLocation } from "react-router-dom";

export default function FormList() {
  const location = useLocation();
  const { state } = location;
  const [, setIsListForm] = useState<boolean>(false);
  const { id } = useParams();
  const [formType] = useState<string>(id ? "edit" : "add");
  const [listData, setListData] = useState<IListNote>(
    state.listData || { id: "", name: "", isColor: "" }
  );
  return (
    <div>
      <ListForm
        formType={formType}
        listData={listData}
        setIsListForm={setIsListForm}
        setListData={setListData}
      />
    </div>
  );
}
