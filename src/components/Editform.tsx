import { FormEvent } from 'react'
import { useEditContext } from '../context/Contexts';
import bookmark from '../assets/Bookmark.json'
import Lottie from "lottie-react";
import { motion } from "framer-motion"

//Popup form to edit bookmark

type Props = {
  title: string;
  url: string;
  id: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  editLink(id: string): void;
  handleEdit(e: FormEvent): void;
 }


const Editform = ({ title, url, setTitle, setUrl, handleEdit, setEdit }: Props) => {
  const { editInvalid, setEditInvalid, sameEditUrl, setsameEditUrl, sameEditTitle, setsameEditTitle } = useEditContext()

  return (
    <div className="fixed h-full w-screen flex flex-col left-0 top-0 justify-center items-center z-20 backdrop-blur backdrop-brightness-50">
      <motion.div className="mx-10 flex flex-col justify-between rounded-lg bg-neutral text-sm" 
        whileInView="visible"
        initial="hidden"
        transition={{
          delay: 0.2,
           duration: 0.6 }}
        variants={{
          hidden: {y: 100 },
          visible: {  y: 0 },
        }}
      >
        <div className="text-gray-600 flex justify-between gap-4 ml-4 ">
          <p className="mx-5 mt-5 pt-4">Make changes to your bookmarks here. Click save when you're done.</p>
          <Lottie animationData={bookmark} initialSegment={[0, 15]} loop={false} className="hidden sm:block h-20 -translate-y-5" />
        </div>
        <form onSubmit={handleEdit} className="flex flex-col pb-8 pt-4 px-10" >
          <label>Title</label>
          <input type="text" required defaultValue={title} placeholder={title} onChange={(e) => {setTitle(e.target.value); setsameEditTitle(false); setEditInvalid(false);}} >
          </input>
          {sameEditTitle && <div className="text-indigo-700 text-xs"> Same Title already exists.</div>} 
          <label className="mt-4">Website URL</label>
          <input type="text" required defaultValue={url} placeholder={url} onChange={(e) => { setUrl(e.target.value);  setEditInvalid(false); setsameEditUrl(false);  }}>
          </input>
          {editInvalid && <div className="text-red-500 text-xs"> Invalid URL. Please try again.</div>}
          {sameEditUrl && <div className="text-indigo-700 text-xs"> Same URL already exists.</div>}
          <div className="flex gap-5 mt-6">
            <button type="submit" className="border px-5 text-xs text-neutral bg-gray-800 disabled:bg-opacity-50 ">
              Save changes
            </button>
            <button type="button" onClick={() => { setEdit(false); setTitle(""); setUrl(""); setEditInvalid(false); setsameEditUrl(false);  setsameEditTitle(false); }} className="border px-5 text-xs">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Editform