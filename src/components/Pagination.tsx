import React from 'react'

type Props = {
  linksPerPage: number;
  totalLinks: number;
  paginate(pgNumber: number): void
}

const Pagination = ({ linksPerPage, totalLinks, paginate }: Props) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul>

        {pageNumbers.map(pgNumber => (
          <li key={pgNumber}>
            <a onClick={() => paginate(pgNumber)} href="#" className="text-pink-600">
              {pgNumber}
            </a>
          </li>

        ))}
      </ul>
    </nav>
  )
}

export default Pagination