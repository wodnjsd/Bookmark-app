import { useState, FormEvent } from 'react'
import { SlPencil } from "react-icons/sl";
import { HiOutlineTrash } from 'react-icons/hi2'
import Popup from './Popup';
import Editform from './Editform'


type Props = {
  title: string
  url: string;
  id: string;
  fave?: boolean;
  removeLink(linkToDelete: string): void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  editLink(id: string): void
  sameEditTitle: boolean;
  setsameEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  edited:boolean;
  setEdited: React.Dispatch<React.SetStateAction<boolean>>;

}

const SavedLinks = ({ edited, setEdited, setsameEditTitle, sameEditTitle, editLink, id, title, url, removeLink, setUrl, setTitle }: Props) => {

  
const [edit, setEdit] = useState(false)
  const [popup, setPopup] = useState(false)

  const handleEdit = (e: FormEvent): void => {
    // no refreshing
    e.preventDefault()
    editLink(id)
  }


  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center pr-3 py-2 border rounded-lg w-auto">
        <div className="hidden sm:flex w-1/6 flex-wrap justify-center">
          <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=24`} />
        </div>

        <div className="flex flex-col flex-wrap py-2 overflow-hidden sm:border-l pl-6  sm:basis-2/3  ">
          <h3 className="text-md font-semibold">
            {title}
          </h3>
          <a href={url} target="blank" className="  hover:text-gray-700 text-xs  font-light leading-3 underline">
            {url}
          </a>

        </div>
        <div className="flex mx-2 text-lg my-1">
          <button disabled={popup} className="rounded-md p-1 ml-3 hover:shadow" onClick={() => { setEdited(false); setEdit(true); console.log(title) }}><SlPencil /></button>
          <button disabled={edit} onClick={() => setPopup(true)} className="rounded-md p-1 ml-3 hover:shadow"><HiOutlineTrash /></button>
    
          {edit && !edited ? (
            <Editform
              setEdit={setEdit}
              title={title}
              id={id}
              url={url}
              setUrl={setUrl}
              setTitle={setTitle}
              editLink={editLink}
              setsameEditTitle={setsameEditTitle}
              sameEditTitle={sameEditTitle}
              handleEdit={handleEdit}
              setEdited={setEdited}

            />) : (''
          )}
          {popup ? (
          <Popup
            setPopup={setPopup}
            removeLink={removeLink}
            id={id}
            title={title} />) : (''
        )}

        </div>
        
      </div>
    </>

  )
}

export default SavedLinks