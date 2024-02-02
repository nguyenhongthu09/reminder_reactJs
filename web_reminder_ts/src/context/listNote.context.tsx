import { useState, createContext } from "react";
import React from "react";
import getAllList, {
  addNewList,
  delList,
  updateListData,
} from "../fetchApi/fetchApiList";
import getColor from "../fetchApi/fetchColor";
import { ListNote } from "../types/listNote.type";
import { Color } from "../types/color.type";
import { ListProviderProps } from "../types/listNote.provider.type";
import { ListContextType } from "../types/listNote.context.type";
export const ListContext = createContext<ListContextType>({
  listNote: [],
  addListNote: () => Promise.resolve(),
  editListNote: () => Promise.resolve(),
  deleteListNote: () => Promise.resolve(),
  getListNote: () => Promise.resolve(),
  getColors: () => Promise.resolve(),
  updateListNoteCount: () => {},
  updateListTotalCount: () => {},
  updateTotalDone: () => {},
  setSelectedListId: () => {},
  selectedListId: "",
  colors: [],
});

export const ListProvider = ({ children }: ListProviderProps) => {
  const [listNote, setListNote] = useState<ListNote[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [colors, setColors] = useState<Color[]>([]);

  const getListNote = async () => {
    const listData = await getAllList();
    if (Array.isArray(listData)) {
      setListNote(listData);
    }
  };

  const getColors = async () => {
    const colorData = await getColor();
    setColors(colorData.map((color) => ({ color: color.color })));
  };

  const addListNote = async (newListNote: ListNote) => {
    newListNote.totalDone = 0;
    newListNote.totalCount = 0;
    await addNewList({
      id: newListNote.id,
      name: newListNote.name,
      isColor: newListNote.isColor,
    });
    setListNote((prevList) => [...prevList, newListNote]);
  };

  const editListNote = async (editedListNote: ListNote) => {
    const { id, totalDone, totalCount, ...updateList } = editedListNote;
    await updateListData(id, updateList.name, updateList.isColor);
    setListNote((prevList) =>
      prevList.map((list) =>
        list.id === id ? { ...list, ...updateList } : list
      )
    );
  };

  const deleteListNote = async (deletedListNoteId: string) => {
    await delList(deletedListNoteId);
    setListNote((prevList) =>
      prevList.filter((list) => list.id !== deletedListNoteId)
    );
  };

  // update khi them moi trong form
  const updateListNoteCount = (listId: string, newTotalCount: number) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === listId ? { ...list, totalCount: newTotalCount } : list
      )
    );
  };

  // update khi them moi va xoa trong reminder
  const updateListTotalCount = (newTotalCount: number) => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId
          ? { ...list, totalCount: newTotalCount }
          : list
      )
    );
  };

  // update total co status la true
  const updateTotalDone = (newTotalDone: number) => {
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
    getListNote,
    updateListNoteCount,
    updateListTotalCount,
    updateTotalDone,
    colors,
    getColors,
    setSelectedListId,
    selectedListId,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
