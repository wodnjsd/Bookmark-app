import React from 'react'
import { motion } from "framer-motion"

//Confirmation popup to delete one bookmark

type Props = {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  removeLink(linkToDelete: string): void;
  title: string;
  id: string;
}

const Popup = ({ setPopup, removeLink, id }: Props) => {
  return (
    <div className="fixed flex left-0 top-0 w-full h-screen justify-center items-center z-20 backdrop-blur backdrop-brightness-50">
      <motion.div className="flex flex-col justify-between p-8 rounded-lg bg-neutral"
      whileInView="visible"
      initial="hidden"
      transition={{ delay:0.1, duration: 0.4 }}
      variants={{
        hidden: {  scale:0.8, y:0},
        visible: { scale: 1, y:0},
      }}
      >
      <div className="text-gray-600 text-sm"> Are you sure you want to delete this bookmark?</div>
      <div className="flex justify-start gap-5 mt-5">
      <button onClick={() => {setPopup(false); removeLink(id)}} className="bg-red-500 text-sm text-white px-8 "> Yes, delete</button>
      <button onClick={() => setPopup(false)} className="border px-5 text-sm"> Cancel </button>
      </div>
      </motion.div>
     
    </div>
  )
}

export default Popup