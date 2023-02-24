import { FormEvent, useState } from 'react'
import { BookmarkType } from '../types/bookmark'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid';
// import { useBookmarkContext } from '../context/Contexts';

type Props = {
  handleSubmit(e:FormEvent): void;
  addLink(): void
}

const Form22 = ({ handleSubmit }: Props) => {

  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fave, setFave] = useState(false)
  const [faves, setFaves] = useLocalStorage<BookmarkType[]>("faves", [])

  return (
    <>
      <div className="mt-10 p-30 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-3">
          <div>Enter new link</div>
          <label>Title:</label>
          <input autoFocus required type="text" value={title} placeholder="Name" onChange={(e) => setTitle(e.target.value)}></input>
          <label>URL:</label>
          <input required type="text" value={url} placeholder="URL" onChange={(e) => setUrl(e.target.value)}></input>
          <label>Description:</label>
          <input type="text" value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className="border">Save</button>
        </form>


      </div>
    </>

  )
}

export default Form22