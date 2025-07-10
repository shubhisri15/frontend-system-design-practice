import './pagination.css'

export default function Pagination ({ numberOfPages, setCurrentPage }) {
    return (
      <div className='pagination-component'>
        <button onClick={() => setCurrentPage(prev => prev - 1)}> Prev</button>
        {Array.from(Array(numberOfPages).keys()).map(
          pageNumber => <button className='page-number' key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>{pageNumber + 1}</button>)}
        <button onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    )
}