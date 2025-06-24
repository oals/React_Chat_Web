import { useState } from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {[...Array(totalPages)].map((_, idx) => (
          <li
            key={idx + 1}
            className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            className="page-link"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;