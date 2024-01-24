import React, { useState, useEffect } from "react";
import { generateRandomStringId } from "../../untils/common";

function ComponentHook({ formType, listData, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    id: generateRandomStringId(),
    name: "",
    isColor: "",
  });
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await onSubmitSuccess(formData);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    console.log("add");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      console.log("remove");
    };
  });

  useEffect(() => {
    if (formType === "edit" && listData) {
      const { id, name, isColor } = listData;
      setFormData({
        id: id,
        name: name,
        isColor: isColor,
      });
    }
  }, [formType, listData]);

  return <div>{console.log("log vi du")}</div>;
}

export default ComponentHook;
