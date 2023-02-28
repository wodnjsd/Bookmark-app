import React from 'react'
import { motion } from "framer-motion"

//Confirmation popup to delete all bookmarks 

type Props = {
  setAllPopup: React.Dispatch<React.SetStateAction<boolean>>;
  removeAll(): void;

}

const DeleteAll = ({ setAllPopup, removeAll }: Props) => {
  return (
    <div className="fixed h-screen w-screen flex flex-col justify-center items-center top-0 left-0 z-20 backdrop-blur backdrop-brightness-50">
      <motion.div className="flex flex-col justify-between p-10 rounded-lg bg-neutral"
      whileInView="visible"
      initial="hidden"
      transition={{ delay:0.1, duration:0.4}}
      variants={{
        hidden: {opacity: 0.7, scale:0.8},
        visible: {opacity: 1, scale:1}
      }}>
      <div className="text-gray-600 text-sm"> Are you sure you want to delete all your bookmarks?</div>
      <div className="flex justify-start gap-5 mt-5">
      <button onClick={() => {setAllPopup(false); removeAll()}} className="bg-red-500 text-sm text-white rounded-lg px-10 after:py-1"> Yes, delete</button>
      <button onClick={() => setAllPopup(false)} className="border rounded-lg px-5 py-1 text-sm"> Cancel </button>
      </div>
      </motion.div>
     
    </div>
  )
}

export default DeleteAll