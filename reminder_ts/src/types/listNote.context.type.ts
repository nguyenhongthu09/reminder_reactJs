import { ListNote } from "./listNote.type";
import { Color } from "./color.type";

interface ListContextType {
    listNote: ListNote[];
    addListNote: (newListNote: ListNote) => Promise<void>;
    editListNote: (editedListNote: ListNote) => Promise<void>;
    deleteListNote: (deletedListNoteId: string) => Promise<void>;
    getListNote: () => Promise<void>;
    updateListNoteCount: (listId: string, newTotalCount: number) => void;
    updateListTotalCount: (newTotalCount: number) => void;
    updateTotalDone: (newTotalDone: number) => void;
    colors: Color[];
    getColors: () => Promise<void>;
    setSelectedListId: (listId: string) => void;
    selectedListId: string;
  }

  export type {ListContextType}