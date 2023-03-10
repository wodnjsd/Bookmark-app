import { createContext, useContext, ReactNode, useState } from "react";


//useContext for EditForm errors- duplicates/ invalid url

type EditProviderProps = {
  children: ReactNode
}

type EditContext = {
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

  const [sameEditTitle, setsameEditTitle] = useState(false)
  const [sameEditUrl, setsameEditUrl] = useState(false)
  const [editInvalid, setEditInvalid] = useState(false)





  return (<EditContext.Provider value={{ sameEditUrl, sameEditTitle , editInvalid, setsameEditUrl, setEditInvalid, setsameEditTitle }}>
    {children}
  </EditContext.Provider>
  )
}