import React from 'react'

type Props = {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  removeLink(linkToDelete: string): void;
  title: string;
  id: string;
}

const Popup = ({ setPopup, removeLink, id }: Props) => {
  return (
    <div className="absolute flex left-0 w-full h-screen justify-center items-center z-20 backdrop-blur-md">
      <div className="flex flex-col justify-between p-10 rounded-lg bg-slate-100">
      <div className="text-gray-600 text-sm"> Are you sure you want to delete this bookmark?</div>
      <div className="flex justify-start gap-5 mt-5">
      <button onClick={() => {setPopup(false); removeLink(id)}} className="bg-red-500 text-sm text-white rounded-lg px-10 after:py-1"> Yes, delete</button>
      <button onClick={() => setPopup(false)} className="border rounded-lg px-5 py-1 text-sm"> Cancel </button>
      </div>
      </div>
     
    </div>
  )
}

export default Popup