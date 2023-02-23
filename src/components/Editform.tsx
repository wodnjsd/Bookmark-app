import { FormEvent } from 'react'

type Props = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  url: string;
  id: string;
  editInvalid: boolean;
  sameEditUrl: boolean;
  sameEditTitle: boolean
  editLink(linkToEdit: string): void
  setsameEditTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setsameEditUrl: React.Dispatch<React.SetStateAction<boolean>>;
  setEditInvalid: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editform = ({ title, setEdit, url, id, setUrl, setTitle, editLink, editInvalid, sameEditTitle, sameEditUrl, setEditInvalid, setsameEditUrl, setsameEditTitle }: Props) => {

  const handleSubmit = (e: FormEvent): void => {
    // no refreshing
    e.preventDefault()
    editLink(id)
    setTitle("")
    setUrl("")
  }
  

  return (
    <div className="absolute h-full w-screen flex flex-col left-0 justify-center items-center z-20 backdrop-blur-lg">
      <div className="mx-5 flex flex-col justify-between p-6 rounded-lg bg-white text-sm">
        <div className="text-gray-600 p-2 flex justify-center">
          Make changes to your bookmarks here. Click save when you're done
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col p-4" >
          <label>Title</label>
          <input type="text" className="border focus:outline-none rounded-lg p-1" defaultValue={title} placeholder={title} onChange={(e) => {setTitle(e.target.value); setsameEditTitle(false)}} >
          </input>
          <div className="text-indigo-700 text-xs">{sameEditTitle && (<div> Same Title already exists.</div>)} </div>
          <label className="mt-4">Website URL</label>
          <input type="text" className="border focus:outline-none rounded-lg p-1" defaultValue={url} placeholder={url} onChange={(e) => { setUrl(e.target.value); setEditInvalid(false); setsameEditUrl(false) }}>
          </input>
          {editInvalid ? <div className="text-red-500 text-xs"> Invalid URL. Please try again.</div>: ""} 
          <div className="text-indigo-700 text-xs">{sameEditUrl && (<div> Same URL already exists.</div>)} </div>
          <div className="flex gap-5 mt-6">
            <button type="submit" className="border rounded-lg px-5 py-2 text-xs text-white bg-gray-800">
              Save changes
            </button>
            <button onClick={() => {setEdit(false); setEditInvalid(false); setsameEditUrl(false);  setsameEditTitle(false)}} className="border rounded-md px-5 py-2 text-xs">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Editform