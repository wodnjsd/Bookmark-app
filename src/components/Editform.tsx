import { FormEvent } from 'react'
import { useEditContext } from '../context/Contexts';
import bookmark from '../assets/Bookmark.json'
import Lottie from "lottie-react";
import { motion } from "framer-motion"

//Popup when editing bookmark

type Props = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  // editTitle: string;
  // setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  // setEditUrl: React.Dispatch<React.SetStateAction<string>>;
  // editUrl: string
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setsameEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  sameEditTitle: boolean;
  title: string;
  url: string;
  id: string;
  editLink(id:string): void;
  handleEdit(e: FormEvent): void
  setEdited: React.Dispatch<React.SetStateAction<boolean>>;
  
 }

const Editform = ({ handleEdit, sameEditTitle, setsameEditTitle, setEdited, title, url, setTitle, setUrl, setEdit  }: Props) => {
  const { editInvalid, setEditInvalid, sameEditUrl, setsameEditUrl,} = useEditContext()



   
  return (
    <div className="fixed h-full w-screen flex flex-col left-0 top-0 justify-center items-center z-20 backdrop-blur-lg">
      <motion.div className="mx-10 flex flex-col justify-between rounded-lg bg-white text-sm"
      whileInView="visible"
      initial="hidden"
      transition={{ delay:0.2, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0.7, x: -50, },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      >
        <div className="text-gray-600 flex justify-between gap-4">
           <p className="m-5">Make changes to your bookmarks here. Click save when you're done.</p>
    
        <Lottie animationData={bookmark} initialSegment={[0,15]} loop={false} className=" xs:block h-20 -translate-y-6" />
         
          </div>

        <form onSubmit={handleEdit} className="flex flex-col p-4" >
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
            <button type="button" onClick={() => {setEdit(false); setEditInvalid(false); setsameEditUrl(false); setEdited(false); setsameEditTitle(false);}} className="border px-5 text-xs">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Editform