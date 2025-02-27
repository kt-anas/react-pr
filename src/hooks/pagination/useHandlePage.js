const useHandlePage = (page, totalPages, goToPage) => {
    const handleFirst = () => goToPage(1);
    const handleLast = () => goToPage(totalPages);
    const handleNext = () => goToPage(page + 1);
    const handlePrev = () => goToPage(page - 1);
  
    return {
      handleFirst,
      handleLast,
      handleNext,
      handlePrev,
    };
  };
  
  export default useHandlePage;
  