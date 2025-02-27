import { useState, useEffect, useRef } from "react";

const usePaginationScroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchItems = async () => {
    if (isLoading || !hasMore) return;  

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=8`
      );
      const result = await response.json();
        
      if (result.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...result]);  
      }
    } catch (err) {
      setError(err);  
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);          }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    fetchItems();
  }, [page]);

  return { data, error, isLoading, hasMore, loaderRef };
};

export default usePaginationScroll;
