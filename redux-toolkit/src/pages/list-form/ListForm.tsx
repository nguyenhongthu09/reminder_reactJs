import ListForm from "../../components/lists/ListForm";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function FormList() {
  const { id } = useParams();
  const [formType] = useState<string>(id ? "edit" : "add");

  return (
    <div>
      <ListForm formType={formType} />
    </div>
  );
}
