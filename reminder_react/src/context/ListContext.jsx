import { useState } from "react";
import React from "react";


export const ListContext = React.createContext();
export const ListProvider = ({ children }) => {
  const [listNote, setListNote] = useState([]);

  const value = {
    listNote,
    setListNote,
  }

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
};
