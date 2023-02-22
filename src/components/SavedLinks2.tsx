
// import { HiOutlineStar } from "react-icons/hi2";

// import { useBookmarkContext } from '../context/BookmarkContext';

// type Props = {
//   title: string;
//   url?: string;
//   description?: string;
//   fave?: boolean;
//   // isFave(linkFave: string): void
// }


// const SavedLinks = () => {
//   const { removeLink, bookmarks } = useBookmarkContext()

//   // const handleEdit = (e: FormEvent): void => {
//   //   e.preventDefault()
//   //   const toEdit = bookmarks.find(link => link.title === title)
//   //   const newEdit = { title:newTitle, url:newUrl, description, fave }
//   //   setBookmarks([...bookmarks, newEdit])
//   //   console.log(bookmarks)

//   // }


//   return (
//     <>
//       <div className="flex justify-between">
//         <div>
//           <div className="border">
//             <h3 className="text-lg">
//               {bookmarks.title}
//             </h3>
//             <a href={url} target="blank" className=" hover:text-gray-700">
//               {url}
//             </a>
//           </div>
//         </div>
//         <div className="flex gap-5">
//           <button onClick={() => { removeLink(title) }}>Delete</button>
//           <button><HiOutlineStar />
//           </button>
//         </div>

//       </div>
//     </>

//   )
// }

// export default SavedLinks