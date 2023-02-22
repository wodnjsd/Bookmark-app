
import Form from './Form'
import { BookmarkType } from "../types/bookmark";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BookmarkProvider } from '../context/Contexts';

type Props = {}

const Home = (props: Props) => {

  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("saved", [])

  return (
    <>
      <div className='flex justify-center items-center w-full h-40 sticky bg-gray-900 '>
        <div className=" text-white font-chillax text-3xl">
          bookmarks
        </div>

      </div>
      <BookmarkProvider>
        <Form />

      </BookmarkProvider>
    </>
  )
}

export default Home