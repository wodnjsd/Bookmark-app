import { FormEvent } from 'react'
import { useEditContext } from '../context/Contexts';
import bookmark from '../assets/Bookmark.json'
import Lottie from "lottie-react";

//Popup when editing bookmark

type Props = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setsameEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  sameEditTitle: boolean;
  title: string;
  url: string;
  id: string;
  editLink(id:string): void
 }

const Editform = ({ sameEditTitle, setsameEditTitle, id, title, url, setEdit, editLink,  setTitle, setUrl  }: Props) => {
  const {  editInvalid, setEditInvalid, sameEditUrl, setsameEditUrl,} = useEditContext()

  const handleSubmit = (e: FormEvent): void => {
    // no refreshing
    e.preventDefault()
    editLink(id)
  }
  
  
  return (
    <div className="fixed h-full w-screen flex flex-col left-0 top-0 justify-center items-center z-20 backdrop-blur-lg">
      <div className="mx-10 flex flex-col justify-between rounded-lg bg-white text-sm">
      
        <div className="text-gray-600 flex justify-between gap-4">
           <p className="m-5">Make changes to your bookmarks here. Click save when you're done.</p>
    
        <Lottie animationData={bookmark} initialSegment={[0,15]} loop={false} className=" xs:block h-20 -translate-y-6" />
         
          </div>

        <form onSubmit={handleSubmit} className="flex flex-col p-4" >
          <label>Title</label>
          <input type="text" required  defaultValue={title} placeholder={title} onChange={(e) => {setTitle(e.target.value); setUrl(url); setsameEditTitle(false)}} >
          </input>
          <div className="text-indigo-700 text-xs">{sameEditTitle && (<div> Same Title already exists.</div>)} </div>
          <label className="mt-4">Website URL</label>
          <input type="text" required defaultValue={url} placeholder={url} onChange={(e) => { setUrl(e.target.value); setTitle(title); setEditInvalid(false); setsameEditUrl(false) }}>
          </input>
          {editInvalid && <div className="text-red-500 text-xs"> Invalid URL. Please try again.</div>} 
          <div className="text-indigo-700 text-xs">{sameEditUrl && (<div> Same URL already exists.</div>)} </div>
          <div className="flex gap-5 mt-6">
            <button type="submit" className="border px-5 text-xs text-white bg-gray-800 disabled:bg-opacity-50 ">
              Save changes
            </button>
            <button type="button" onClick={() => {setEdit(false); setEditInvalid(false); setsameEditUrl(false);  setsameEditTitle(false);}} className="border px-5 text-xs">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editform