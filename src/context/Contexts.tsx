import { createContext, useContext, ReactNode, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BookmarkType } from "../types/bookmark";
//useContext for EditForm errors- duplicates/ invalid url

type EditProviderProps = {
  children: ReactNode
}

type EditContext = {
  openEdit: () => void;
  closeEdit: () => void;
  edit: boolean;
  editInvalid: boolean;
  sameEditUrl: boolean;
  sameEditTitle: boolean;
  setsameEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setsameEditUrl: React.Dispatch<React.SetStateAction<boolean>>;
  setEditInvalid: React.Dispatch<React.SetStateAction<boolean>>;

}

const EditContext = createContext({} as EditContext)

export function useEditContext() {
  return useContext(EditContext)
}

export function EditProvider({ children }: EditProviderProps) {
  const [edit, setEdit] = useState(false)
  const [sameEditTitle, setsameEditTitle] = useState(false)
  const [sameEditUrl, setsameEditUrl] = useState(false)
  const [editInvalid, setEditInvalid] = useState(false)

  const openEdit = () => setEdit(true)
  const closeEdit = () => setEdit(false)


  return (<EditContext.Provider value={{ edit, openEdit, closeEdit, sameEditUrl, editInvalid, setsameEditUrl, setEditInvalid, setsameEditTitle, sameEditTitle }}>
    {children}
  </EditContext.Provider>
  )
}