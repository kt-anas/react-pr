import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import useHandlePage from '../../hooks/pagination/useHandlePage';

const PageNav = ({ page, totalPages, goToPage }) => {
  const {handleFirst, handleLast,handleNext,handlePrev} = useHandlePage(page, totalPages, goToPage);
  return (
    <Navbar fixed="bottom" className="justify-content-center">
      <button
        onClick={handleFirst}
        disabled={page === 1}
        className="btn btn-primary mx-2"
        style={{ opacity: page === 1 ? 0.6 : 1 }}
      >
        First
      </button>
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="btn btn-primary mx-2"
        style={{ opacity: page === 1 ? 0.6 : 1 }}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button 
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`btn mx-1 ${
              page === pageNumber ? 'btn-secondary' : 'btn-primary'
            }`}
            disabled={page === pageNumber}
            style={{ opacity: page === pageNumber ? 0.9 : 1 }}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="btn btn-primary mx-2"
        style={{ opacity: page === totalPages ? 0.6 : 1 }}
      >
        Next
      </button>
      <button
        onClick={handleLast}
        disabled={page === totalPages}
        className="btn btn-primary mx-2"
        style={{ opacity: page === totalPages ? 0.6 : 1 }}
      >
        Last
      </button>
    </Navbar>
  );
};

export default PageNav;
