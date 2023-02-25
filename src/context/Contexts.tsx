import { createContext, useContext, ReactNode, useState } from "react";

//useContext for EditForm errors- duplicates/ invalid url

type EditProviderProps = {
  children: ReactNode
}

type EditContext = {
  // title:string;
  // url:string;
  editInvalid: boolean;
  sameEditUrl: boolean;
  sameEditTitle: boolean;
  setsameEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setsameEditUrl: React.Dispatch<React.SetStateAction<boolean>>;
  setEditInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  // setTitle: React.Dispatch<React.SetStateAction<string>>;
  // setUrl: React.Dispatch<React.SetStateAction<string>>;

}

const EditContext = createContext({} as EditContext)

export function useEditContext() {
  return useContext(EditContext)
}

export function EditProvider({ children }: EditProviderProps) {

  const [sameEditTitle, setsameEditTitle] = useState(false)
  const [sameEditUrl, setsameEditUrl] = useState(false)
  const [editInvalid, setEditInvalid] = useState(false)
  // const [title, setTitle] = useState("")
  // const [url, setUrl] = useState("")



  return (<EditContext.Provider value={{ sameEditUrl, editInvalid, setsameEditUrl, setEditInvalid,  setsameEditTitle, sameEditTitle }}>
    {children}
  </EditContext.Provider>
  )
}