
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

type Props = {
  linksPerPage: number;
  totalLinks: number;
  currentPage: number;
  paginate(pgNumber: number): void;
  next(): void;
  previous(): void
}

const Pagination = ({ linksPerPage, totalLinks, currentPage, paginate, next, previous }: Props) => {

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="my-2">
      <ul className="flex justify-between gap-3">
        <li>
          {totalLinks !== 0 && <a onClick={(e) => { previous(); e.preventDefault() }} href='#'>
            <HiArrowLongLeft className="hover:text-lg mx-2 mt-1" />
          </a>
          }
        </li>
        {pageNumbers.map(pgNumber => (
          <li key={pgNumber}>
            {pgNumber === currentPage ? (<a onClick={(e) => { paginate(pgNumber); e.preventDefault() }} href="#" className="opacity-70 underline underline-offset-2">
              {pgNumber}
            </a>) : (
              <a onClick={(e) => { paginate(pgNumber); e.preventDefault() }} href="#" className="hover:underline underline-offset-2">
                {pgNumber}
              </a>
            )}
          </li>
        ))}
        <li>
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