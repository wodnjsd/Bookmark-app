import { createContext, useContext, ReactNode, useState } from "react";
import { BookmarkType } from "../types/bookmark";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BookmarkProviderProps = {
  children: ReactNode
}

type BookmarkContext = {
  addLink: (title: string, url: string, description: string, fave: boolean) => void
  removeLink: (title: string) => void
  editLinks: (title: string, newTitle: string, newUrl: string, newDescription: string) => void
  bookmarks: BookmarkItem[]
}

type BookmarkItem = {
  title: string,
  url: string
}

const BookmarkContext = createContext({} as BookmarkContext)

export function useBookmarkContext() {
  return useContext(BookmarkContext)
}





export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkItem[]>("saved", [])

  const addLink = (title: string, url: string, description: string, fave: boolean) => {
    const newBookmark = { title, url, description, fave }
    // if (isUrl(url) === false) {
    //   return alert("not valid url")
    // }
    if (bookmarks.find(link => link.title === title)) {
      return alert("title already present")
    }
    if (bookmarks.find(link => link.url === url)) {
      return alert("url already present")
    }
    setBookmarks([...bookmarks, newBookmark])
  }

  const removeLink = (linkToDelete: string): void => {
    setBookmarks(bookmarks.filter((link) => {
      return link.title !== linkToDelete
    }))
  }

  const editLinks = (linkToEdit: string, newTitle: string, newUrl: string, newDescription: string): void => {
    const toEdit = bookmarks.filter(link => link.title === linkToEdit)
    const newEdit = { title: newTitle, url: newUrl, description: newDescription }
    setBookmarks([...bookmarks, newEdit])

  }


  return (<BookmarkContext.Provider value={{ addLink, removeLink, editLinks, bookmarks }}>
    {children}
  </BookmarkContext.Provider>
  )
}