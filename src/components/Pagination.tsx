import React from 'react'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

type Props = {
  linksPerPage: number;
  totalLinks: number;
  paginate(pgNumber: number): void;
  next(): void;
  previous(): void
}

const Pagination = ({ linksPerPage, totalLinks, paginate, next, previous }: Props) => {


  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav >
      <ul className="flex justify-between">
        <li>
          <a onClick={previous} href='#'>
            <HiArrowLongLeft />
          </a>
        </li>

        {pageNumbers.map(pgNumber => (
          <li key={pgNumber}>
            <a onClick={() => paginate(pgNumber)} href="#" className="text-pink-600 hover:underline">
              {pgNumber}
            </a>
          </li>

        ))}
        <li>
          <a onClick={next} href='#'>
            <HiArrowLongRight />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination