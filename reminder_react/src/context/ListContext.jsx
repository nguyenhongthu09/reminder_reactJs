import { useState } from "react";
import React from "react";
import { addNewList, updateListData, delList } from "../fetchApi/fetchApiList";

export const ListContext = React.createContext();
export const ListProvider = ({ children }) => {
  const [listNote, setListNote] = useState([]);

  const addListNote = async (newListNote) => {
    await addNewList({
      id: newListNote.id,
      name: newListNote.name,
      isColor: newListNote.isColor,
    });
    setListNote((prevList) => [...prevList, newListNote]);
  };

  const editListNote = async (editedListNote) => {
    const { id, totalDone, totalCount, ...updateList } = editedListNote;
    await updateListData(id, updateList.name, updateList.isColor);
    setListNote((prevList) =>
      prevList.map((list) =>
        list.id === id ? { ...list, ...updateList } : list
      )
    );
  };

  const deleteListNote = async (deletedListNoteId) => {
    await delList(deletedListNoteId);
    setListNote((prevList) =>
      prevList.filter((list) => list.id !== deletedListNoteId)
    );
  };
  const value = {
    listNote,
    addListNote,
    editListNote,
    deleteListNote,
    setListNote,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
