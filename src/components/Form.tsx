import { FormEvent, useState } from 'react'
import { BookmarkType } from '../types/bookmark'
import SavedLinks from './SavedLinks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid';
import Pagination from './Pagination';
import { Popover } from '@headlessui/react'
import { HiOutlinePencil } from 'react-icons/hi2'
import { BiBookmarkAlt, BiLinkAlt } from 'react-icons/bi'
import Form22 from './NewForm';
import Editform from './Editform'


const Forms = () => {

 
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fave, setFave] = useState(false)
  const [ edit, setEdit ] = useState(false)
  // const [faves, setFaves] = useLocalStorage<BookmarkType[]>("faves", [])
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])

  const [currentPage, setCurrentPage] = useState(1)
  const [linksPerPage] = useState(5)
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

  const paginate = (pgNumber: number) => setCurrentPage(pgNumber)

  const next = () => {
    if (currentPage !== nPages)
      setCurrentPage(currentPage + 1)
  }
  const previous = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }

  //! Need to check valid url & duplicates for editing 
  const editLink = (linkToEdit: string): void => {

    const index = bookmarks.findIndex(link => link.title === linkToEdit)
    const toEdit = bookmarks.filter(link => link.title !== linkToEdit)
    const newEdit = { title, url, description, fave }
    if (toEdit.find(link => link.title === title)) {
      return alert("title already present")
    }
    if (toEdit.find(link => link.url === url)) {
      return alert("url already present")
    }
    setBookmarks([...toEdit, newEdit])
    // const edited = bookmarks.splice(index, 1, newEdit)
    // setBookmarks([...edited])
    console.log(toEdit)
    console.log(bookmarks)
    console.log(index)
    // console.log(edited)

  }

  const removeLink = (linkToDelete: string): void => {
    setBookmarks(bookmarks.filter((link) => {
      return link.title !== linkToDelete
    }))
  }

  const removeAll = (): void => {
    setBookmarks([])
  }


  return (
    <>
      <div className="mt-10 p-30 flex flex-col justify-center items-center">
        {/* <Form22
          handleSubmit={handleSubmit} /> */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-3">
          <div className="flex"><BiBookmarkAlt className="mt-1 mx-1" />Create bookmark</div>
          <label>Title</label>
          <input autoFocus required type="text" value={title} placeholder="Name" onChange={(e) => setTitle(e.target.value)}></input>
          <label>Website URL</label>
          <input required type="text" className="border rounded-md" value={url} placeholder="Enter URL" onChange={(e) => setUrl(e.target.value)}></input>
          <label>Description</label>
          <input type="text" value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />
          {/* <label>Favourite?</label> */}
          <button type="submit" className="bg-gray-800 rounded-md text-slate-100 text-sm py-1">Add bookmark</button>
        </form>{/* Make adding disabled if no url */}
        <div className="flex flex-col justify-between items-center mt-10 mx-10 w-3/5">
          <div className="flex my-5"><BiLinkAlt className="mt-1 mx-1" />Your links:</div>
          {currentLinks.map((item: BookmarkType) => (
            <div className="w-full">
              <SavedLinks
                key={item.title}
                title={item.title}
                url={item.url}
                removeLink={removeLink}
                setUrl={setUrl}
                setTitle={setTitle} 
                editLink={editLink}
               />
            </div>
          ))}


          <Pagination linksPerPage={linksPerPage} totalLinks={bookmarks.length} paginate={paginate} next={next} previous={previous} />
          <button className="text-sm rounded-md px-2 py-1 bg-gray-900 text-slate-100" onClick={removeAll}>
            Clear all
          </button>
        </div>


      </div>
    </>

  )
}

export default Forms