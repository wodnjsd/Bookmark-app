
type Props = {
  title: string;
  url?: string;
  description?: string;
  removeLink(linkToDelete: string): void
}

function editLink() {

}


const SavedLinks = ({ title, url, removeLink }: Props) => {

  return (
    <>
      <div className="flex justify-between">
        <div>
          <div>
            <h3 className="text-lg">
              {title}
            </h3>
            <p>
              {url}
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <button>Edit</button>
          <button onClick={() => { removeLink(title) }}>Delete</button>
        </div>
      </div>
    </>

  )
}

export default SavedLinks