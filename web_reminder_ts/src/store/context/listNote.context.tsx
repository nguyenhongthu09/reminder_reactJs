import React, { createContext, useState, ReactNode } from "react";

interface IListProvider {
  children: ReactNode;
}

interface IListContextType {
  setSelectedListId: React.Dispatch<React.SetStateAction<string>>;
  selectedListId: string;
  setNameList: React.Dispatch<React.SetStateAction<string>>;
  nameList: string;
}

export const ListContext = createContext<IListContextType>({
  selectedListId: "",
  setSelectedListId: () => {},
  setNameList: () => {},
  nameList: "",
});

export const ListNoteProvider = ({ children }: IListProvider) => {
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [nameList, setNameList] = useState<string>("");

  const value: any = {
    selectedListId,
    setSelectedListId,
    nameList,
    setNameList,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
