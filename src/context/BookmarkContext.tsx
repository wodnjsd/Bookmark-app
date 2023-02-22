// import { createContext, useContext, ReactNode, useState } from "react";
// import { BookmarkType } from "../types/bookmark";
// import { useLocalStorage } from "../hooks/useLocalStorage";

// type BookmarkProviderProps = {
//   children: ReactNode
// }

// type BookmarkContext = {
//   addLink: (title: string) => void
//   removeLink: (title: string) => void
//   editLinks: (linkToEdit: string) => void
//   bookmarks: BookmarkItem[]
// }

// // type BookmarkItem = {
// //   title: string,
// //   url: string
// // }

// type BookmarkItem = BookmarkType

// const BookmarkContext = createContext({} as BookmarkContext)

// export function useBookmarkContext() {
//   return useContext(BookmarkContext)
// }





// export function BookmarkProvider({ children }: BookmarkProviderProps) {
//   const [bookmarks, setBookmarks] = useLocalStorage<BookmarkItem[]>("saved", [])

//   const addLink = (title: string, url: string, description: string, fave: boolean) => {
//     const newBookmark = { title, url, description, fave }
//     // if (isUrl(url) === false) {
//     //   return alert("not valid url")
//     // }
//     if (bookmarks.find(link => link.title === title)) {
//       return alert("title already present")
//     }
//     if (bookmarks.find(link => link.url === url)) {
//       return alert("url already present")
//     }
//     setBookmarks([...bookmarks, newBookmark])
//   }

//   const removeLink = (linkToDelete: string): void => {
//     setBookmarks(bookmarks.filter((link) => {
//       return link.title !== linkToDelete
//     }))
//   }

//   const editLink = (linkToEdit: string): void => {

//     const index = bookmarks.findIndex(link => link.title === linkToEdit)
//     const toEdit = bookmarks.filter(link => link.title !== linkToEdit)
//     const newEdit = { title, url, description, fave }
//     if (toEdit.find(link => link.title === title)) {
//       return alert("title already present")
//     }
//     if (toEdit.find(link => link.url === url)) {
//       return alert("url already present")
//     }
//     setBookmarks([...toEdit, newEdit])
//     // const edited = bookmarks.splice(index, 1, newEdit)
//     // setBookmarks([...edited])
//     console.log(toEdit)
//     console.log(bookmarks)
//     console.log(index)
//     // console.log(edited)

//   }


//   return (<BookmarkContext.Provider value={{ addLink, removeLink, editLink, bookmarks }}>
//     {children}
//   </BookmarkContext.Provider>
//   )
// 