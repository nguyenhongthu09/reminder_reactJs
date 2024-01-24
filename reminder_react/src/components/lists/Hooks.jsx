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




// import React, { useState, useEffect } from "react";
// import { generateRandomStringId } from "../../untils/common";

// function ComponentHook({ formType, listData }) {
//   const [, setFormData] = useState({
//     id: generateRandomStringId(),
//     name: "",
//     isColor: "",
//   });

//   useEffect(() => {
//     if (formType === "edit" && listData) {
//       const { id, name, isColor } = listData;
//       setFormData({
//         id: id,
//         name: name,
//         isColor: isColor,
//       });
//     }
//   }, [formType, listData]);

//   return <div>{console.log("log vi du")}</div>;
// }

// export default ComponentHook;
