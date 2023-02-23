import { useState } from 'react'
import { SlPencil } from "react-icons/sl";
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2'
import Popup from './Popup';
import Editform from './Editform'

type Props = {
  title: string 
  url: string;
  id: string;
  fave?: boolean;
  removeLink(linkToDelete: string): void;
  editLink(linkToEdit: string): void
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  editInvalid: boolean;
  sameEditUrl: boolean;
  sameEditTitle: boolean;
  setsameEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setsameEditUrl: React.Dispatch<React.SetStateAction<boolean>>;
  setEditInvalid: React.Dispatch<React.SetStateAction<boolean>>;

}

// function isFave(title: string): void {
//   const [fave, setFave] = useState(false)
//   const linkFave = (bookmarks.filter(link => link.title === title
//   ))
// }

const SavedLinks = ({ title, url, id, removeLink, setUrl, setTitle, editLink, editInvalid, sameEditTitle, sameEditUrl, setEditInvalid, setsameEditTitle, setsameEditUrl }: Props) => {
  const [edit, setEdit] = useState(false)
  const [popup, setPopup] = useState(false)

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center pr-2 py-2 border rounded-lg w-auto">
       <div className="hidden sm:flex w-1/6  justify-center">
       <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=24`} />
       </div>

        <div className="flex flex-col flex-wrap sm:flex-nowrap py-2 sm:border-l pl-6  sm:basis-2/3 overflow-clip">
          <h3 className="text-md font-semibold">
            {title}
          </h3>
          <a href={url} target="blank" className="  hover:text-gray-700 text-xs font-light flex-wrap leading-3 underline">
            {url}
          </a>
         
        </div>
        <div className="flex mx-5 text-lg my-1">
        <button disabled={popup}className="rounded-md p-1 ml-3 hover:shadow" onClick={() => setEdit(true)}><SlPencil /></button>
          <button disabled={edit} onClick={() => setPopup(true)} className="rounded-md p-1 ml-3 hover:shadow"><HiOutlineTrash /></button>
          {/* <button><HiOutlineStar />
          </button> */}
          {edit ? (
          <Editform
            setEdit={setEdit}
            setUrl={setUrl}
            setTitle={setTitle}
            editLink={editLink}
            setsameEditUrl={setsameEditUrl}
            setsameEditTitle={setsameEditTitle}
            title={title}
            id={id}
            url={url}
            setEditInvalid={setEditInvalid}
            editInvalid={editInvalid}
            sameEditUrl={sameEditUrl}
            sameEditTitle={sameEditTitle}/>) : (''
        )}
        </div>
        {popup ? (
          <Popup
            setPopup={setPopup}  
            removeLink={removeLink}
            id={id}
            title={title}/>) : (''
        )}

      </div>
    </>

  )
}

export default SavedLinks