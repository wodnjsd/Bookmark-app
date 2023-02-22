import { useState } from 'react'

type Props = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  url: string;
  editLink(linkToEdit: string): void
}

const Editform = ({ title, setEdit, url, setUrl, setTitle, editLink}: Props) => {

  const [description, setDescription] = useState("")

  return (
    <div className="absolute z-20 bg-slate-100 rounded-md flex flex-col justify-between items-center border-md ">
      <div className="text-gray-600 p-2 flex justify-center text-sm">
        Make changes to your bookmarks here. Click save when you're done
      </div>

      <form className="flex flex-col p-5 gap-2" >
      <label>Title</label>
        <input type="text" defaultValue={title} placeholder={title} onChange={(e) => setTitle(e.target.value)} >
        </input>
        <label>Website URL</label>
        <input type="text" defaultValue={url} placeholder={url} onChange={(e) => setUrl(e.target.value)}>
        </input>
        <div className="flex gap-5">
          <button onClick={() => {setEdit(false); editLink(title)}} className="border rounded-md px-5 py-1 text-sm text-white bg-gray-800">
            Save changes
          </button>
          <button onClick={() => setEdit(false)}className="border rounded-md px-5 py-1 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editform