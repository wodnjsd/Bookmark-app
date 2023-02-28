import { FormEvent, useState } from 'react'
import { BookmarkType } from '../types/bookmark'
import SavedLinks from './SavedLinks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid';
import Pagination from './Pagination';
import { BiBookmarkAlt, BiLinkAlt } from 'react-icons/bi'
import DeleteAll from './DeleteAll';
import { useEditContext } from '../context/Contexts'
import Deleted from './Deleted';
import Added from './Added';


const Forms = () => {
  const { setEditInvalid, setsameEditUrl, setsameEditTitle } = useEditContext()
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [id, setId] = useState("")
  const [invalid, setInvalid] = useState(false)
  const [allPopup, setAllPopup] = useState(false)
  const [sameUrl, setsameUrl] = useState(false)
  const [sameTitle, setsameTitle] = useState(false)
  const [search, setSearch] = useState("")
  const [deleted, setDeleted] = useState(false)
  const [added, setAdded] = useState(false)


  //Searching by title
  const filteredLinks =
    bookmarks.filter((link) =>
      link.title.toLowerCase().includes(search.toLowerCase())
    )

  //Pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const [linksPerPage] = useState(20)
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstLink,
    indexOfLastLink);
  const nPages = Math.ceil(filteredLinks.length / linksPerPage)

  const paginate = (pgNumber: number) => setCurrentPage(pgNumber)
  //Next page 
  const next = () => {
    if (currentPage !== nPages)
      setCurrentPage(currentPage + 1)
  }
  //Previous page
  const previous = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }

  //Submitting form 
  const handleSubmit = (e: FormEvent): void => {
    // no refreshing
    e.preventDefault()
    addLink()
    console.log(bookmarks)
  }

  // Check if URL valid with regex
  function isValidURL(url: string) {
    if (regex2.test(url)) {
      //  try{
      //     return (a.host && a.host != window.location.host)
      //   } catch(err) {
      //     return false
      //   }
      return true
    } else {
      return false
    }
  }

  const regex = new RegExp('/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/')
  const regex2 = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i')


  //Adding new bookmark to array of bookmarks 
  const addLink = () => {
    // generate id for bookmark
    const id = uuidv4()
    setId(id)
    const newBookmark = { id, title, url }
    // invalid url
    if (isValidURL(url) === false) {
      return setInvalid(true)
    }
    // duplicate title
    if (bookmarks.find(link => link.title === title)) {
      return setsameTitle(true)
    }
    // duplicate url
    if (bookmarks.find(link => link.url === url)) {
      return setsameUrl(true)
    }
    setBookmarks([...bookmarks, newBookmark])
    setTitle("")
    setUrl("")
    // trigger 'added' popup 
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 800)
  }


  //Editing bookmark
  const editLink = (id: string): boolean => {
    const index = bookmarks.findIndex(link => link.id === id)
    const toEdit = bookmarks.filter(link => link.id !== id)
    const newEdit = { id, title, url }
    //duplicate title
    if (toEdit.find(link => link.title === title)) {
      setsameEditTitle(true)
      return false
    }
    //duplicate url
    if (toEdit.find(link => link.url === url)) {
      setsameEditUrl(true)
      return false 
    }
    //invalid url 
    if (isValidURL(url) === false) {
      setEditInvalid(true)
      return false
    }
    //replacing current bookmark with new edited bookmark

    bookmarks.splice(index, 1, newEdit)
    setBookmarks(bookmarks)
    setTitle("")
    setUrl("")
    setEditInvalid(false)
    setsameEditUrl(false);
    setsameEditTitle(false)
    console.log(newEdit)
    return true
  }


  //Deleting chosen bookmark
  const removeLink = (linkToDelete: string): void => {
    setBookmarks(bookmarks.filter((link) => {
      return link.id !== linkToDelete
    }))
    //trigger 'deleted' popup
    setDeleted(true)
    setTimeout(() => {
      setDeleted(false)
    }, 1000)
  }

  //Deleting all bookmarks
  const removeAll = (): void => {
    setBookmarks([])
    //trigger 'deleted' popup
    setDeleted(true)
    setTimeout(() => {
      setDeleted(false)
    }, 1000)
  }


  return (
    <>
      <div className="py-10 flex flex-col justify-center items-center ">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between w-1/2 lg:w-3/5 max-w-3xl z-10">
          <div className="flex gap-1 my-5 font-semibold text-xl z-10"><BiBookmarkAlt className="mt-1 mx-1" />Create bookmark</div>
          <label className="my-1">Website URL</label>
          <input type="text" required className="border p-1" value={url} placeholder="Enter URL" onChange={(e) => { setUrl(e.target.value); setInvalid(false); setsameUrl(false) }}></input>
          {/*Error messages when invalid or duplicate urls*/}
          {invalid && <div className="text-red-500 text-xs"> Invalid URL. Please try again.</div>}
          {sameUrl && <div className="text-indigo-700 text-xs"> Same URL already exists.</div>}
          <label className="mb-1 mt-5">Title/ description</label>
          <input type="text" required value={title} className="border p-1" placeholder="Title" onChange={(e) => { setTitle(e.target.value); setsameTitle(false) }}></input>
          {sameTitle && <div className="text-indigo-700 text-xs"> Same Title already exists.</div>}
          <button type="submit" disabled={!url || !title} className="bg-gray-900 text-neutral disabled:bg-opacity-50 disabled:shadow-none text-sm mt-10 ">Add bookmark</button>
        </form>
        <div className="flex flex-col justify-start  mt-10 mx-10 max-w-3xl min-h-[60vh] w-1/2 lg:w-3/5 border-t border-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-center my-8">
            <div className="flex font-semibold text-xl py-3"><BiLinkAlt className="mt-1 mx-1" />Your links:</div>
            <input type="text" placeholder="Search..." className="border h-8 text-sm" value={search} onChange={(e) => { setCurrentPage(1); setSearch(e.target.value) }} />
          </div>
          {deleted && (
            <Deleted
            />
          )}
          {added && (
            <Added
            />
          )}
          {bookmarks.length > 0 ? <div className="flex flex-col items-center gap-5">  {currentLinks.map((item: BookmarkType) => (
            <div className="w-full">
              <SavedLinks
                key={item.id}
                id={item.id}
                title={item.title}
                url={item.url}
                setUrl={setUrl}
                setTitle={setTitle}
                editLink={editLink}
                removeLink={removeLink}

              />
            </div>
          ))}
            <Pagination totalLinks={filteredLinks.length} nPages={nPages} paginate={paginate} next={next} previous={previous}
              currentPage={currentPage} />
            {/* //Button to clear all bookmarks shown if more than one bookmark present */}
            {filteredLinks.length > 0 && <button className="text-sm rounded-lg px-3 py-2 bg-gray-900 text-slate-100" onClick={() => setAllPopup(true)}>
              Clear all
            </button>}
            {allPopup && (
              <DeleteAll
                setAllPopup={setAllPopup}
                removeAll={removeAll}
              />)}
          </div>
            : <div className="flex flex-col justify-center items-center mt-20"><p>No bookmarks yet</p>
              <p className="text-gray-500 text-xs mt-2">Start adding now!</p></div>}
        </div>
      </div>
    </>

  )
}

export default Forms