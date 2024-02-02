import { useState, createContext, ReactNode } from "react";
import React from "react";
import getAllList, {
  addNewList,
  delList,
  updateListData,
} from "../fetchApi/fetchApiList";
import getColor from "../fetchApi/fetchColor";
import { IListNote } from "../types/listNote.type";
import { IColor } from "../types/color.type";

interface IListProvider {
  children: ReactNode;
}
interface IListContextType {
  listNote: IListNote[];
  addListNote: (newListNote: IListNote) => Promise<void>;
  editListNote: (editedListNote: IListNote) => Promise<void>;
  deleteListNote: (deletedListNoteId: string) => Promise<void>;
  getListNote: () => Promise<void>;
  updateListNoteCount: (listId: string, newTotalCount: number) => void;
  updateListTotalCount: (newTotalCount: number) => void;
  updateTotalDone: (newTotalDone: number) => void;
  colors: IColor[];
  getColors: () => Promise<void>;
  setSelectedListId: React.Dispatch<React.SetStateAction<string>>;
  selectedListId: string;
}

export const ListContext = createContext<IListContextType>({
  listNote: [],
  addListNote: () => Promise.resolve(),
  editListNote: () => Promise.resolve(),
  deleteListNote: () => Promise.resolve(),
  getListNote: () => Promise.resolve(),
  getColors: () => Promise.resolve(),
  updateListNoteCount: () => {},
  updateListTotalCount: () => {},
  updateTotalDone: () => {},
  selectedListId: "",
  setSelectedListId: () => {},
  colors: [],
});

export const ListProvider = ({ children }: IListProvider) => {
  const [listNote, setListNote] = useState<IListNote[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [colors, setColors] = useState<IColor[]>([]);

  const getListNote = async (): Promise<void> => {
    const listData = await getAllList();
    if (Array.isArray(listData)) {
      setListNote(listData as IListNote[]);
    }
  };

  const getColors = async (): Promise<void> => {
    const colorData = await getColor();
    setColors(colorData.map((color) => ({ color: color.color })));
  };

  const addListNote = async (newListNote: IListNote): Promise<void> => {
    try {
      const newList = { ...newListNote };
      const createdListNote = await addNewList(newList);
      const updatedListNote = {
        ...createdListNote,
        totalDone: 0,
        totalCount: 0,
      };
      setListNote((prevList) => [...prevList, updatedListNote]);
    } catch (error) {
      console.error("Lỗi khi thêm mới danh sách:", error);
      throw error;
    }
  };

  const editListNote = async (editedListNote: IListNote): Promise<void> => {
    const { id, totalDone, totalCount, ...updateList } = editedListNote;
    await updateListData(id, updateList.name, updateList.isColor);
    setListNote((prevList) =>
      prevList.map((list) =>
        list.id === id ? { ...list, ...updateList } : list
      )
    );
  };

  const deleteListNote = async (deletedListNoteId: string): Promise<void> => {
    await delList(deletedListNoteId);
    setListNote((prevList) =>
      prevList.filter((list) => list.id !== deletedListNoteId)
    );
  };

  // update khi them moi trong form
  const updateListNoteCount = (listId: string, newTotalCount: number): void => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === listId ? { ...list, totalCount: newTotalCount } : list
      )
    );
  };

  // update khi them moi va xoa trong reminder
  const updateListTotalCount = (newTotalCount: number): void => {
    setListNote((prevListNote) =>
      prevListNote.map((list) =>
        list.id === selectedListId
          ? { ...list, totalCount: newTotalCount }
          : list
      )
    );
  };

  // update total co status la true
  const updateTotalDone = (newTotalDone: number): void => {
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
