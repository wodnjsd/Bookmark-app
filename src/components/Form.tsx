import { FormEvent, SetStateAction, useState } from 'react'
import { BookmarkType } from '../types/bookmark'
import SavedLinks from './SavedLinks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid';
import Pagination from './Pagination';
import { BiBookmarkAlt, BiLinkAlt } from 'react-icons/bi'

const Forms = () => {

  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fave, setFave] = useState(false)
  const [edit, setEdit] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")

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

    // window.localStorage.setItem("saved", JSON.stringify(bookmarks))
  }



  // const doesExist = async (url: string) => {
  //   return (await fetch(url)).ok
  // }


  //! lots of false positives..
  // function isUrl(url: string): boolean {
  //   try {
  //     new URL(url)
  //     return true
  //   } catch (err) {
  //     return false
  //   }
  // }


  function isValidURL(url: string) {
    if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
      return true
    } else {
      // setInvalid(true)
      return false
    }
  }
  const regex = "[(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]]*)"
  const regex2 = "[(http(s)?):\/\/(www\.)?\w-/=#%&\.\?]{2,}\.[a-z]{2,}([\w-/=#%&\.\?]*)"

  //! create nice alerts/ messages
  function addLink() {
    const id = uuidv4()
    const newBookmark = { id, title, url, fave }
    if (isValidURL(url) === false) {
      // alert("not valid url")
      return setInvalid(true)
    }
    // if (bookmarks.find(link => link.title === title)) {
    //   return alert("title already present")
    // }
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
    const index = bookmarks.findIndex(link => link.id === linkToEdit)
    const toEdit = bookmarks.filter(link => link.id !== linkToEdit)
    const id =  bookmarks[index].id
    const newEdit = { id, title, url }
    if (toEdit.find(link => link.title === title)) {
      return alert("title already present")
    }
    if (toEdit.find(link => link.url === url)) {
      return alert("url already present")
    }
    if (!isValidURL(newEdit.url)) {
      return alert("Invalid url")
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
      return link.id !== linkToDelete
    }))
  }

  const removeAll = (): void => {
    setBookmarks([])
  }


  return (
    <>
      <div className="mt-10 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-3 w-3/5">
          <div className="flex gap-1 my-5 font-semibold text-xl"><BiBookmarkAlt className="mt-1 mx-1" />Create bookmark</div>

          <label>Website URL</label>
          <input type="text" required pattern={regex} className="border rounded-lg p-1" value={url} placeholder="Enter URL" onChange={(e) => { setUrl(e.target.value); setInvalid(false) }}></input>
          <div className="text-red-500 text-xs">{invalid && (<div> Invalid URL. Please try again.</div>)} </div>  <label >Title/ description</label>
          <input type="text" value={title} className="border rounded-lg p-1" placeholder="Name" onChange={(e) => setTitle(e.target.value)}></input>
          <button type="submit" disabled={!url} className="bg-gray-800 text-white disabled:bg-opacity-50 rounded-lg text-sm mt-5 py-2">Add bookmark</button>
        </form>
        <div className="flex flex-col justify-between  mt-10 mx-10 w-3/5 border-t border-gray-400">
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
              <Pagination linksPerPage={linksPerPage} totalLinks={bookmarks.length} paginate={paginate} next={next} previous={previous} />
              <button className="text-sm rounded-lg px-3 py-2 bg-gray-900 text-slate-100" onClick={removeAll}>
                Clear all
              </button></div>
              : <div className="flex flex-col items-center mt-10"><p>No bookmarks yet</p>
                <p className="text-gray-500 text-xs">Start adding now!</p></div>}
          </div>

        </div>


      </div>
    </>

  )
}

export default Forms