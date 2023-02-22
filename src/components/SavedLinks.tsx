import { FormEvent, useState } from 'react'
import { HiOutlineStar } from "react-icons/hi2";
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2'
import Popup from './Popup';
import Editform from './Editform'

type Props = {
  title: string 
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

  return (
    <>
      <div className="flex justify-between px-4  border rounded-lg w-full">
        <div className="py-2">
          <h3 className="text-md font-semibold">
            {title}
          </h3>
          <a href={url} target="blank" className=" hover:text-gray-700 text-sm font-light">
            {url}
          </a>
        </div>
        <div className="flex gap-5">
        <button onClick={() => setEdit(true)}><HiOutlinePencil /></button>
          <button onClick={() => setPopup(true)}><HiOutlineTrash /></button>
          {/* <button><HiOutlineStar />
          </button> */}
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