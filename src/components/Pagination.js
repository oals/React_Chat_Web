

const Pagination = ({currentPage, totalPages, onPageChange }) => {
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link bg-dark border-dark text-white"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {[...Array(totalPages)].map((_, idx) => (
          <li
            key={idx + 1}
            className={`page-item ${currentPage === idx + 1 ? 'active border-dark' : ''}`}
          >
            <button
              className="page-link bg-dark text-white border-dark"
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            className="page-link bg-dark text-white border-dark"
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