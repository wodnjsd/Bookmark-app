import { FormEvent, useState } from 'react'
import { HiOutlineStar } from "react-icons/hi2";
import { BookmarkType } from '../types/bookmark'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2'
import Popup from './Popup';
import Editform from './Editform'

type Props = {
  title: string;
  url: string;
  description?: string;
  fave?: boolean;
  removeLink(linkToDelete: string): void;
  editLink(linkToEdit: string): void
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

}

// function isFave(title: string): void {
//   const [fave, setFave] = useState(false)
//   const linkFave = (bookmarks.filter(link => link.title === title
//   ))
// }

const SavedLinks = ({ title, url, description, fave, removeLink, setUrl, setTitle, editLink }: Props) => {
  const [edit, setEdit] = useState(false)

  const [popup, setPopup] = useState(false)
  // const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])
  // const [currentPage, setCurrentPage] = useState(1)
  // const [linksPerPage] = useState(2)
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
      <div className="flex justify-between px-4  border rounded-md w-full">
        <div className="py-2">
          <h3 className="text-lg">
            {title}
          </h3>
          <a href={url} target="blank" className=" hover:text-gray-700">
            {url}
          </a>
        </div>
        <div className="flex gap-5">
        <button onClick={() => setEdit(true)}><HiOutlinePencil /></button>
          <button onClick={() => setPopup(true)}><HiOutlineTrash /></button>
          <button><HiOutlineStar />
          </button>
          {edit ? (
          <Editform
            setEdit={setEdit}
            setUrl={setUrl}
            setTitle={setTitle}
            editLink={editLink}
            title={title}
            url={url}/>) : (''
        )}
        </div>
        {popup ? (
          <Popup
            setPopup={setPopup} 
            removeLink={removeLink}
            title={title}/>) : (''
        )}

      </div>
    </>

  )
}

export default SavedLinks