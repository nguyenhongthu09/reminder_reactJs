import React, { createContext, useState, ReactNode } from "react";

interface IListProvider {
  children: ReactNode;
}

interface IListContextType {
  setNameList: React.Dispatch<React.SetStateAction<string>>;
  nameList: string;
}

export const ListContext = createContext<IListContextType>({
  setNameList: () => {},
  nameList: "",
});

export const ListNoteProvider = ({ children }: IListProvider) => {
  const [nameList, setNameList] = useState<string>("");

  const value: any = {
    nameList,
    setNameList,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
