import React, { FormEvent, useState } from 'react'
import { BookmarkProps } from '../types/bookmark'


const Forms = ({}:BookmarkProps) => {

  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fave, setFave] = useState(false)
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([])


  const handleSubmit = (e: FormEvent): void => {
    // no refreshing
    e.preventDefault()
    const newBookmark = { title, url, description, fave}
    // save to local storage
    setBookmarks(
      [...bookmarks, newBookmark])
    console.log(bookmarks)

    window.localStorage.setItem("saved", JSON.stringify(newBookmark))
  

  }
  const saved: BookmarkProps[] = []
  // const savedList = JSON.parse(localStorage.getItem('saved'))

  const getSaved = ():BookmarkProps[] => {
    const listJSON = localStorage.getItem("saved")
    if (listJSON === null ) return []
    return JSON.parse(listJSON)
  }

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between">
          <div>Enter new link</div>
          <label>Title</label>
          <input autoFocus required type="text" value={title} placeholder="Name" onChange={(e) => setTitle(e.target.value)}></input>
          <label>URL</label>
          <input required type="text" value={url} placeholder="URL" onChange={(e) => setUrl(e.target.value)}></input>
          <label>Description</label>
          <input type="text" value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />
          <label>Favourite?</label>
          <button type="submit">Save</button>
        </form>

      </div>
    </>

  )
}

export default Forms