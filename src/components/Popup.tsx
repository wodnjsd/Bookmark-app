import React from 'react'

type Props = {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  removeLink(linkToDelete: string): void;
  title: string;
}

const Popup = ({ setPopup, removeLink, title }: Props) => {
  return (
    <div className="absolute z-20 bg-slate-100 flex flex-col justify-between p-5 rounded-md ">
      <div> Are you sure you want to delete this bookmark?</div>
      <div className="flex justify-start gap-5 mt-5">
      <button onClick={() => {setPopup(false); removeLink(title)}} className="bg-red-500 text-sm text-white rounded-md px-10 after:py-1"> Yes, delete</button>
      <button onClick={() => setPopup(false)} className="border rounded-md px-5 py-1 text-sm"> Cancel </button>
      </div>
     
    </div>
  )
}

export default Popup