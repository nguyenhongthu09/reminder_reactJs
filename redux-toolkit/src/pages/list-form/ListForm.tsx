import ListForm from "../../components/lists/ListForm";
import React, { useState } from "react";
import { IListNote } from "../../types/listNote.type";
import { useParams } from "react-router-dom";

export default function FormList() {
  const { id } = useParams();
  const [formType] = useState<string>(id ? "edit" : "add");
  const [listData, setListData] = useState<IListNote>({
    id: "",
    name: "",
    isColor: "",
  });
  return (
    <div>
      <ListForm
        formType={formType}
        listData={listData}
        setListData={setListData}
      />
    </div>
  );
}
