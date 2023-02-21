import React, { FormEvent, useState, useEffect } from 'react'
import { BookmarkType } from '../types/bookmark'
import SavedLinks from './SavedLinks'
import { useLocalStorage } from '../hooks/useLocalStorage'


const Forms = () => {

  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fave, setFave] = useState(false)
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])

  const handleSubmit = (e: FormEvent): void => {
    // no refreshing
    e.preventDefault()
    // const newBookmark = { title, url, description, fave }
    // save to local storage
    // setBookmarks([...bookmarks, newBookmark])
    addLink()
    console.log(bookmarks)
    // window.localStorage.setItem("saved", JSON.stringify(bookmarks))
  }

  function addLink() {
    const newBookmark = { title, url, description, fave }
    if (bookmarks.find(link => link.title === title)) {
      return alert("title already present")
      //! create nice alert/ message
    }
    if (bookmarks.find(link => link.url === url)) {
      return alert("url already present")
      //! create nice alert/ message
    }
    setBookmarks([...bookmarks, newBookmark])
  }

  // const getSaved = (): BookmarkType[] => {
  //   const listJSON = localStorage.getItem("saved")
  //   if (listJSON === null) return []
  //   return (JSON.parse(listJSON))
  // }

  const removeLink = (linkToDelete:string):void => {
    setBookmarks(bookmarks.filter((link) => {
      return link.title !== linkToDelete
    }))
  }

  return (
    <>
      <div className="mt-10 p-30 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-3">
          <div>Enter new link</div>
          <label>Title:</label>
          <input autoFocus required type="text" value={title} placeholder="Name" onChange={(e) => setTitle(e.target.value)}></input>
          <label>URL:</label>
          <input required type="text" value={url} placeholder="URL" onChange={(e) => setUrl(e.target.value)}></input>
          <label>Description:</label>
          <input type="text" value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />
          <label>Favourite?</label>
          <button type="submit" className="border">Save</button>
        </form>
        <div>
          <div className="mt-10">Saved Links:</div>
          {bookmarks.map((item: BookmarkType) => (
            <SavedLinks
              key={item.title}
              title={item.title}
              url={item.url} 
              removeLink={removeLink}/>
          ))}
        </div>

      </div>
    </>

  )
}

export default Forms