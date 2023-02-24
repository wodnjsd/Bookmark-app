import { FormEvent, SetStateAction, useState } from 'react'
import { BookmarkType } from '../types/bookmark'
import SavedLinks from './SavedLinks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid';
import Pagination from './Pagination';
import { BiBookmarkAlt, BiLinkAlt } from 'react-icons/bi'
import DeleteAll from './DeleteAll';
import { useEditContext } from '../context/Contexts'

const Forms = () => {
  const { setsameEditTitle, setEditInvalid, setsameEditUrl } = useEditContext()
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [id, setId] = useState("")
  const [invalid, setInvalid] = useState(false)
  const [allPopup, setAllPopup] = useState(false)
  const [sameUrl, setsameUrl] = useState(false)
  const [sameTitle, setsameTitle] = useState(false)
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
    addLink()
    console.log(bookmarks)
  }


  function isValidURL(url: string) {
    if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
      return true
    } else {
      return false
    }
  }
  const regex = "[(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]]*)"
  const regex2 = "[(http(s)?):\/\/(www\.)?\w-/=#%&\.\?]{2,}\.[a-z]{2,}([\w-/=#%&\.\?]*)"

  //! create nice alerts/ messages
  function addLink() {
    const id = uuidv4()

    const newBookmark = { id, title, url }
    if (isValidURL(url) === false) {
      // alert("not valid url")
      return setInvalid(true)
    }
    if (bookmarks.find(link => link.title === title)) {
      return setsameTitle(true)
    }
    if (bookmarks.find(link => link.url === url)) {
      return setsameUrl(true)
    }
    setBookmarks([...bookmarks, newBookmark])
    setId(id)
    setTitle("")
    setUrl("")
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
    const index = bookmarks.findIndex(link => link.id === linkToEdit)
    const toEdit = bookmarks.filter(link => link.id !== linkToEdit)
    const id = bookmarks[index].id
    const newEdit = { id, title, url }
    if (toEdit.find(link => link.title === title)) {
      alert("same title")
      return setsameEditTitle(true)
    }
    if (toEdit.find(link => link.url === url)) {
      alert("same url")
      return setsameEditUrl(true)
    }
    if (isValidURL(url) === false) {
      alert("invalid")
      return setEditInvalid(true)
    }
    setBookmarks([...toEdit, newEdit])
    console.log(toEdit)
    console.log(bookmarks)
    console.log(index)
    setTitle("")
    setUrl("")
    setsameEditUrl(false);
    setsameEditTitle(false)

  }

  const removeLink = (linkToDelete: string): void => {
    setBookmarks(bookmarks.filter((link) => {
      return link.id !== linkToDelete
    }))
  }

  const removeAll = (): void => {
    setBookmarks([])
  }


  return (
    <>
      <div className="my-10 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between w-1/2 lg:w-3/5 max-w-3xl">
          <div className="flex gap-1 my-5 font-semibold text-xl"><BiBookmarkAlt className="mt-1 mx-1" />Create bookmark</div>

          <label className="my-1">Website URL</label>
          <input type="text" required pattern={regex} className="border p-1" value={url} placeholder="Enter URL" onChange={(e) => { setUrl(e.target.value); setInvalid(false); setsameUrl(false) }}></input>
          <div className="text-red-500 text-xs">{invalid && (<div> Invalid URL. Please try again.</div>)} </div>
          <div className="text-indigo-700 text-xs">{sameUrl && (<div> Same URL already exists.</div>)} </div>
          <label className="mb-1 mt-5">Title/ description</label>
          <input type="text" required value={title} className="border p-1" placeholder="Title" onChange={(e) => { setTitle(e.target.value); setsameTitle(false) }}></input>
          <div className="text-indigo-700 text-xs">{sameTitle && (<div> Same Title already exists.</div>)} </div>
          <button type="submit" disabled={!url || !title} className="bg-gray-800 text-white disabled:bg-opacity-50 text-sm mt-10 ">Add bookmark</button>
        </form>
        <div className="flex flex-col justify-between  mt-10 mx-10 max-w-3xl w-1/2 lg:w-3/5 border-t border-gray-400">
          <div className="flex my-8 font-semibold text-xl"><BiLinkAlt className="mt-1 mx-1" />Your links:</div>
          <div className="">

            {bookmarks.length > 0 ? <div className="flex flex-col items-center gap-5">  {currentLinks.map((item: BookmarkType) => (
              <div className="w-full">
                <SavedLinks
                  key={item.title}
                  id={item.id}
                  title={item.title}
                  url={item.url}
                  removeLink={removeLink}
                  editLink={editLink}
                  setUrl={setUrl}
                  setTitle={setTitle}
                />

              </div>
            ))}
              <Pagination linksPerPage={linksPerPage} totalLinks={bookmarks.length} paginate={paginate} next={next} previous={previous}
                currentPage={currentPage} />
              <button className="text-sm rounded-lg px-3 py-2 bg-gray-900 text-slate-100" onClick={() => setAllPopup(true)}>
                Clear all
              </button>
              {allPopup ? (
                <DeleteAll
                  setAllPopup={setAllPopup}
                  removeAll={removeAll}
                />) : (''
              )}</div>
              : <div className="flex flex-col items-center my-10"><p>No bookmarks yet</p>
                <p className="text-gray-500 text-xs mt-5">Start adding now!</p></div>}
          </div>

        </div>


      </div>
    </>

  )
}

export default Forms