import { FormEvent, useState } from 'react'
import { Popover } from '@headlessui/react'
import { HiOutlineStar } from "react-icons/hi2";
import { BookmarkType } from '../types/bookmark'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Pagination from './Pagination';

type Props = {
  title: string;
  url?: string;
  description?: string;
  fave?: boolean;
  removeLink(linkToDelete: string): void;
  editLink(linkToEdit: string, newTitle: string, newUrl: string): void;
  // isFave(linkFave: string): void
}


// function isFave(title: string): void {
//   const [fave, setFave] = useState(false)
//   const linkFave = (bookmarks.filter(link => link.title === title
//   ))
// }

const SavedLinks = ({ title, url, description, fave, removeLink, editLink }: Props) => {
  const [edit, setEdit] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")
  // const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])
  // const [currentPage, setCurrentPage] = useState(1)
  // // const [linksPerPage] = useState(2)
  // const indexOfLastLink = currentPage * linksPerPage;
  // const indexOfFirstLink = indexOfLastLink - linksPerPage;
  // const currentLinks = bookmarks.slice(indexOfFirstLink,
  //   indexOfLastLink);
  // const nPages = Math.ceil(bookmarks.length / linksPerPage)

  // const handleEdit = (e: FormEvent): void => {
  //   e.preventDefault()
  //   const toEdit = bookmarks.find(link => link.title === title)
  //   const newEdit = { title:newTitle, url:newUrl, description, fave }
  //   setBookmarks([...bookmarks, newEdit])
  //   console.log(bookmarks)

  // }



  return (
    <>
      <div className="flex justify-between">
        <div>

          <div className="border">
            <h3 className="text-lg">
              {title}
            </h3>
            <a href={url} target="blank" className=" hover:text-gray-700">
              {url}
            </a>
          </div>


        </div>
        <div className="flex gap-5">

          {/* {edit ? <Popover>

            <form >
              <input type="text" defaultValue={title} placeholder={title} onChange={(e) => setNewTitle(e.target.value)} >
              </input>
              <input type="text" defaultValue={url} placeholder={url} onChange={(e) => setNewUrl(e.target.value)}>
              </input>
            </form>
            <button type="submit" className="border" onClick={() => { editLink(title, newTitle, newUrl) }}>Edit</button>
            <button onClick={() => setEdit(false)} className="border">Close</button>

          </Popover> : ""}
           */}
          {/* <button onClick={() => setEdit(!edit)}>Edit</button> */}
          <button onClick={() => { removeLink(title) }}>Delete</button>
          <button><HiOutlineStar />
          </button>
        </div>

      </div>
    </>

  )
}

export default SavedLinks