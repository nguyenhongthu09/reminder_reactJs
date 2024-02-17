import React, { createContext, useState, ReactNode } from "react";

interface IListProvider {
  children: ReactNode;
}

interface IListContextType {
  setSelectedListId: React.Dispatch<React.SetStateAction<string>>;
  selectedListId: string;
}

export const ListContext = createContext<IListContextType>({
  selectedListId: "",
  setSelectedListId: () => {},
});

export const ListNoteProvider = ({ children }: IListProvider) => {
  const [selectedListId, setSelectedListId] = useState<string>("");

  const value: any = {
    selectedListId,
    setSelectedListId,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
