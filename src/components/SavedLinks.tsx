import { StarIcon} from '@heroicons/react/24/outline'
import { HiOutlineStar} from "react-icons/hi2";

type Props = {
  title: string;
  url?: string;
  description?: string;
  removeLink(linkToDelete: string): void;
  // isFave(linkFave: string): void
}

function editLink() {

}

  // function isFave(title: string): void {
  //   const [fave, setFave] = useState(false)
  //   const linkFave = (bookmarks.filter(link => link.title === title
  //   ))
  // }

const SavedLinks = ({ title, url, removeLink }: Props) => {

  return (
    <>
      <div className="flex justify-between">
        <div>
          <div className="border">
            <h3 className="text-lg">
              {title}
            </h3>
            <a href={url} target="blank" className=" hover:text-gray-700">
              {url}
              </a>
     
            //! Make url into link
          </div>
        </div>
        <div className="flex gap-5">
          <button>Edit</button>
          <button onClick={() => { removeLink(title) }}>Delete</button>
          <button><HiOutlineStar />
            </button>
        </div>
      </div>
    </>

  )
}

export default SavedLinks