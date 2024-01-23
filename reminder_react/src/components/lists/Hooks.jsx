import React, { useEffect, useState } from "react";
import getAllList from "../../fetchApi/fetchApiList";

function ComponentHook() {
  const [listNote, setListNote] = useState([]);

  const getListNote = async () => {
    try {
      const listData = await getAllList();

      setListNote(listData);
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
  };

  useEffect(() => {
    console.log("Component did mount use");
    getListNote();
        
  }, []);

  return (
    <div>
      {listNote.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}

      {console.log(listNote, "log DOM")}
    </div>
  );
}

export default ComponentHook;




