
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'


//Pagination 

type Props = {
  totalLinks: number;
  currentPage: number;
  nPages: number;
  paginate(pgNumber: number): void;
  next(): void;
  previous(): void
}

const Pagination = ({ nPages, totalLinks, currentPage, paginate, next, previous }: Props) => {

  // total number of pages
  const pageNumbers = []
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="my-2">
      <ul className="flex justify-between gap-3">
        <li>
          {/* arrow to previous page */}
          {totalLinks !== 0 && <a onClick={(e) => { previous(); e.preventDefault() }} href='#'>
            <HiArrowLongLeft className="hover:text-lg mx-2 mt-1" />
          </a>
          }
        </li>
        {pageNumbers.map(pgNumber => (
          <li key={pgNumber}>
            {/* current page- underlined  */}
            {pgNumber === currentPage ? (<a onClick={e => e.preventDefault()} href="#" className="opacity-70 underline underline-offset-2">
              {pgNumber}
            </a>) : (
              // going to different page by clicking on page number
              <a onClick={(e) => { paginate(pgNumber); e.preventDefault() }} href="#" className="hover:underline hover:opacity-70 underline-offset-2">
                {pgNumber}
              </a>
            )}
          </li>
        ))}
        <li>
          {/* arrow to next page */}
          {totalLinks !== 0 && <a onClick={(e) => { next(); e.preventDefault() }} href='#' className="hover:text-lg">
            <HiArrowLongRight className="mx-2 mt-1" />
          </a>
          }
        </li>
      </ul>
    </nav>
  )
}

export default Pagination