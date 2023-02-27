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
  // const [sameEditTitle, setsameEditTitle] = useState(false)
  const [edited, setEdited] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [added, setAdded] = useState(false)

  //const [faves, setFaves] = useLocalStorage<BookmarkType[]>("faves", [])

  const filteredLinks =
    bookmarks.filter((link) =>
      link.title.toLowerCase().includes(search.toLowerCase())
    )

  const [currentPage, setCurrentPage] = useState(1)
  const [linksPerPage] = useState(20)
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstLink,
    indexOfLastLink);
  const nPages = Math.ceil(filteredLinks.length / linksPerPage)

  //Submitting form 
  const handleSubmit = (e: FormEvent): void => {
    // no refreshing
    e.preventDefault()
    addLink()
    console.log(bookmarks)
  }

  // Check if URL valid with regex
  function isValidURL(url: string) {
    if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
      return true
    } else {
      return false
    }
  }
  const regex = "[(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]]*)"
  const regex2 = "[(http(s)?):\/\/(www\.)?\w-/=#%&\.\?]{2,}\.[a-z]{2,}([\w-/=#%&\.\?]*)"


  //Adding new link to list of bookmarks 
  function addLink() {
    const id = uuidv4()
    setId(id)
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
    setTitle("")
    setUrl("")
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 800)
  }

  //Paginating
  const paginate = (pgNumber: number) => setCurrentPage(pgNumber)
  //next page 
  const next = () => {
    if (currentPage !== nPages)
      setCurrentPage(currentPage + 1)
  }
  //previous page
  const previous = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }

  //Editing link
  const editLink = (id: string): void => {
    const index = bookmarks.findIndex(link => link.id === id)
    const toEdit = bookmarks.filter(link => link.id !== id)
    // const id = bookmarks[index].id
    const newEdit = { id, title, url }
    if (toEdit.find(link => link.title === title)) {
      // alert("same title")
      return setsameEditTitle(true)
    }
    if (toEdit.find(link => link.url === url)) {
      // alert("same url")
      return setsameEditUrl(true)
    }
    if (isValidURL(newEdit.url) === false) {
      // alert("invalid")
      return setEditInvalid(true)
    }

    bookmarks.splice(index, 1, newEdit)
    setBookmarks(bookmarks)
    console.log(toEdit)
    console.log(bookmarks)
    console.log(newEdit)
    console.log(index)
    setTitle("")
    setUrl("")
    setEditInvalid(false)
    setsameEditUrl(false);
    setsameEditTitle(false)
    setEdited(true)

  }

  //Deleting chosen bookmark
  const removeLink = (linkToDelete: string): void => {
    setBookmarks(bookmarks.filter((link) => {
      return link.id !== linkToDelete
    }))
    setDeleted(true)
    setTimeout(() => {
      setDeleted(false)
    }, 1000)
  }

  //Deleting all bookmarks
  const removeAll = (): void => {
    setBookmarks([])
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
          <input type="text" required pattern={regex} className="border p-1" value={url} placeholder="Enter URL" onChange={(e) => { setUrl(e.target.value); setInvalid(false); setsameUrl(false) }}></input>
          {/*Error messages when invalid or duplicate urls*/}
          {invalid && (<div className="text-red-500 text-xs"> Invalid URL. Please try again.</div>)}
          {sameUrl && (<div className="text-indigo-700 text-xs"> Same URL already exists.</div>)}
          <label className="mb-1 mt-5">Title/ description</label>
          <input type="text" required value={title} className="border p-1" placeholder="Title" onChange={(e) => { setTitle(e.target.value); setsameTitle(false) }}></input>
          <div className="text-indigo-700 text-xs">{sameTitle && (<div> Same Title already exists.</div>)} </div>
          <button type="submit" disabled={!url || !title } className="bg-gray-900 text-neutral disabled:bg-opacity-50 disabled:shadow-none text-sm mt-10 ">Add bookmark</button>
        </form>
        <div className="flex flex-col justify-start  mt-10 mx-10 max-w-3xl min-h-[60vh] w-1/2 lg:w-3/5 border-t border-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-center my-8">
            <div className="flex font-semibold text-xl py-3"><BiLinkAlt className="mt-1 mx-1" />Your links:</div>
            <input type="text" placeholder="Search..." className="h-8 text-sm" value={search} onChange={(e) => { setSearch(e.target.value) }} />
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
                edited={edited}
                setEdited={setEdited}
                id={item.id}
                title={item.title}
                url={item.url}
                removeLink={removeLink}
                setUrl={setUrl}
                setTitle={setTitle}
                editLink={editLink}
              />
            </div>

          ))}
            <Pagination linksPerPage={linksPerPage} totalLinks={filteredLinks.length} paginate={paginate} next={next} previous={previous}
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
            : <div className="flex flex-col justify-center items-center mt-20"><p>No bookmarks yet</p>
              <p className="text-gray-500 text-xs mt-2">Start adding now!</p></div>}
        </div>
      </div>
    </>

  )
}

export default Forms