import { useState, FormEvent } from 'react'
import { SlPencil } from "react-icons/sl";
import { HiOutlineTrash } from 'react-icons/hi2'
import Popup from './DeletePopup';
import Editform from './Editform'

//Individual saved link to be shown in list

type Props = {
  title: string
  url: string;
  id: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  removeLink(linkToDelete: string): void;
  editLink(id: string): boolean;

}


const SavedLinks = ({ id, title, url, removeLink, setUrl, setTitle, editLink, }: Props) => {
  const [edit, setEdit] = useState(false)
  const [popup, setPopup] = useState(false)


  // triggered on submitting edit form
  const handleEdit = (e: FormEvent): void => {
    // no refreshing
    try {
      e.preventDefault()
      if (editLink(id)) {
        //if edit successful close edit popup
        setEdit(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center pr-3 py-2 border border-gray-300 rounded-lg w-auto">
        <div className="hidden sm:flex w-1/6 flex-wrap justify-center">
          <img src={`https://www.google.com/s2/favicons?domain=${url}&sz=24`} />
        </div>
        <div className="flex flex-col flex-wrap py-2 overflow-hidden sm:border-l border-gray-300 pl-6  sm:basis-2/3  ">
          <h3 className="text-md font-semibold">
            {title}
          </h3>
          <a href={url} target="blank" className="  hover:text-gray-700 text-xs  font-light leading-3 underline">
            {url}
          </a>
        </div>
        <div className="flex mx-2 text-lg my-1">
          <button disabled={popup} className="rounded-md p-1 ml-3 hover:shadow" onClick={() => { setEdit(true), setTitle(title); setUrl(url) }}><SlPencil /></button>
          <button disabled={edit} onClick={() => setPopup(true)} className="rounded-md p-1 ml-3 hover:shadow"><HiOutlineTrash /></button>
          {/* triggeres editing form when edit button pressed */}
          {edit ?
            <Editform
              key={id}
              id={id}
              title={title}
              url={url}
              setEdit={setEdit}
              setUrl={setUrl}
              setTitle={setTitle}
              handleEdit={handleEdit}
              editLink={editLink}
            // setEdited={setEdited}
            /> : ('')
          }
          {/* triggers deleting confirmation popup when delete button pressed */}
          {popup && (
            <Popup
              setPopup={setPopup}
              removeLink={removeLink}
              id={id}
              title={title} />
          )}

        </div>

      </div>
    </>

  )
}

export default SavedLinks