import { useState, createContext } from "react";
import React from "react";
import getAllList, {
  addNewList,
  updateListData,
  delList,
} from "../fetchApi/fetchApiList";
import getColor from "../fetchApi/fetchColor";

export const ListContext = createContext({});
export const ListProvider = ({ children }) => {
  const [listNote, setListNote] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [colors, setColors] = useState([]);
  const getListNote = async () => {
    const listData = await getAllList();
    setListNote(listData);
  };

  const getColors = async () => {
    const colorData = await getColor();

    setColors(colorData.map((colors) => colors.color));
  };

  const addListNote = async (newListNote) => {
    newListNote.totalDone = 0;
    newListNote.totalCount = 0;
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

  // update khi them moi trong form
  const updateListNoteCount = (listId, newTotalCount) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === listId ? { ...list, totalCount: newTotalCount } : list
      )
    );
  };

  // update khi them moi va xoa trong reminder
  const updateListTotalCount = (newTotalCount) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId
          ? { ...list, totalCount: newTotalCount }
          : list
      )
    );
  };

  // update total co status la true
  const updateTotalDone = (newTotalDone) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId ? { ...list, totalDone: newTotalDone } : list
      )
    );
  };

  const value = {
    listNote,
    addListNote,
    editListNote,
    deleteListNote,
    setListNote,
    getListNote,
    selectedListId,
    setSelectedListId,
    updateListNoteCount,
    updateListTotalCount,
    updateTotalDone,
    colors,
    setColors,
    getColors,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
