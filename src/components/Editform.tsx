import { useState } from 'react'

type Props = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  url: string;
  id: string;
  editLink(linkToEdit: string): void
}

const Editform = ({ title, setEdit, url, id, setUrl, setTitle, editLink }: Props) => {


  return (
    <div className="absolute h-full w-screen flex flex-col justify-center items-center top-0 left-0 z-20 backdrop-blur-sm">
      <div className="mx-5 flex flex-col justify-between p-5 rounded-lg bg-slate-100">
        <div className="text-gray-600 p-2 flex justify-center text-sm">
          Make changes to your bookmarks here. Click save when you're done
        </div>

        <form className="flex flex-col p-5 gap-2" >
          <label>Title</label>
          <input type="text" defaultValue={title} placeholder={title} onChange={(e) => setTitle(e.target.value)} >
          </input>
          <label>Website URL</label>
          <input type="text" className="border rounded-lg p-1" defaultValue={url} placeholder={url} onChange={(e) => setUrl(e.target.value)}>
          </input>
          <div className="flex gap-5 mt-5">
            <button onClick={() => { setEdit(false); editLink(id) }} className="border rounded-lg px-5 py-2 text-xs text-white bg-gray-800">
              Save changes
            </button>
            <button onClick={() => setEdit(false)} className="border rounded-md px-5 py-2 text-xs">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editform