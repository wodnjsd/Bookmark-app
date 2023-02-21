import { FormEvent, useState } from 'react'
import { Popover } from '@headlessui/react'
import { HiOutlineStar } from "react-icons/hi2";
import { BookmarkType } from '../types/bookmark'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Pagination from './Pagination';
import { useBookmarkContext } from '../context/BookmarkContext';

type Props = {
  title: string;
  url?: string;
  description?: string;
  fave?: boolean;
  removeLink(linkToDelete: string): void;
  // isFave(linkFave: string): void
}


const SavedLinks = ({ title, url, description, fave }: Props) => {
  const { removeLink, editLinks } = useBookmarkContext()
  let [edit, setEdit] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])
  const [currentPage, setCurrentPage] = useState(1)
  const [linksPerPage] = useState(2)
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = bookmarks.slice(indexOfFirstLink,
    indexOfLastLink);
  const nPages = Math.ceil(bookmarks.length / linksPerPage)

  const handleEdit = (e: FormEvent): void => {
    e.preventDefault()
    const toEdit = bookmarks.find(link => link.title === title)
    const newEdit = { title:newTitle, url:newUrl, description, fave }
    setBookmarks([...bookmarks, newEdit])
    console.log(bookmarks)

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


  return (
    <>
      <div className="flex justify-between">
        <div>
          {currentLinks.map((item: BookmarkType) => (
             <div className="border">
             <h3 className="text-lg">
               {item.title}
             </h3>
             <a href={item.url} target="blank" className=" hover:text-gray-700">
               {item.url}
             </a>
             //! Make url into link
           </div>
          ))}
         
        </div>
        <div className="flex gap-5">
          <button onClick={() => setEdit(!edit)}>Edit</button>
          {edit ? <Popover>

            <form onSubmit={handleEdit}>
              <input type="text" defaultValue={title} placeholder={title} onChange={(e) => setNewTitle(e.target.value)} >
              </input>
              <input type="text" defaultValue={url} placeholder={url} onChange={(e) => setNewUrl(e.target.value)}>
              </input>
            </form>
            <button type="submit" onClick={handleEdit}>Edit</button>
            <button onClick={() => setEdit(false)}>Close</button>

          </Popover> : ''}

          <button onClick={() => { removeLink(title) }}>Delete</button>
          <button><HiOutlineStar />
          </button>
        </div>
        <Pagination linksPerPage={linksPerPage} totalLinks={bookmarks.length} paginate={paginate} next={next} previous={previous} />
      </div>
    </>

  )
}

export default SavedLinks