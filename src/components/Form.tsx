import React, { FormEvent, useState, useEffect } from 'react'
import { BookmarkType } from '../types/bookmark'
import SavedLinks from './SavedLinks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid';
import Pagination from './Pagination';

const Forms = () => {

  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fave, setFave] = useState(false)
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])

  const [currentPage, setCurrentPage] = useState(1)
  const [linksPerPage] = useState(3)
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = bookmarks.slice(indexOfFirstLink,
    indexOfLastLink);
  const nPages = Math.ceil(bookmarks.length / linksPerPage)

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

  //! lots of false positives..
  function isUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch (err) {
      return false
    }
  }

  //! create nice alerts/ messages
  function addLink() {
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

  // const getSaved = (): BookmarkType[] => {
  //   const listJSON = localStorage.getItem("saved")
  //   if (listJSON === null) return []
  //   return (JSON.parse(listJSON))
  // }

  const removeLink = (linkToDelete: string): void => {
    setBookmarks(bookmarks.filter((link) => {
      return link.title !== linkToDelete
    }))
  }



  const removeAll = (): void => {
    setBookmarks([])
  }

  const paginate = (pgNumber: number) => setCurrentPage(pgNumber)

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
          {/* <label>Favourite?</label> */}
          <button type="submit" className="border">Save</button>
        </form>
        <div className="mt-10 mx-10">
          <div >Saved Links:</div>
          {currentLinks.map((item: BookmarkType) => (
            <SavedLinks
              key={item.title}
              title={item.title}
              url={item.url}
              removeLink={removeLink}
            />

          ))}
        </div>
        <Pagination linksPerPage={linksPerPage} totalLinks={bookmarks.length} paginate={paginate}/>
        <button onClick={removeAll}>
          Clear All
        </button>


      </div>
    </>

  )
}

export default Forms