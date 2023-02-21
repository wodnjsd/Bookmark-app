// import { createContext, useContext, ReactNode, useState } from "react";
// import { BookmarkType } from "../types/bookmark";
// import { useLocalStorage } from "../hooks/useLocalStorage";

// type BookmarkContext = {
//   addLink: () => void
//   removeLink: () => void
// }

// const BookmarkContext = createContext({} as BookmarkContext)

// export function useBookmarkContext() {
//   return useContext(BookmarkContext)
// }

// type BookmarkProviderProps = {
//   children: ReactNode
// }



// export function BookmarkProvider({ children }: BookmarkProviderProps) {
//   const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("Bookmarks", [])

//   function addLink() {
//     const newBookmark = { title, url, description, fave }
//     setBookmarks([...bookmarks, newBookmark])
//   }
//     const removeLink = (linkToDelete:string):void => {
//       setBookmarks(bookmarks.filter((link) => {
//         return link.title !== linkToDelete
//       }))
//     }
  



//   }
//   return <BookmarkContext.Provider value={{}}>
//     {children}
//   </BookmarkContext.Provider>
// }