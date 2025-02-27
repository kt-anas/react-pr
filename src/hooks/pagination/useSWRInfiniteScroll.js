import { useRef, useCallback } from "react";
import useSWRInfinite from "swr/infinite";

const useSWRInfiniteScroll = () => {
  const baseUrl = "https://jsonplaceholder.typicode.com/posts";
  const itemsPerPage = 10;

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.length === 0) return null;
      return `${baseUrl}?_page=${pageIndex + 1}&_limit=${itemsPerPage}`;
    },
    [baseUrl, itemsPerPage]
  );

  const { data, error, isValidating, setSize, size } = useSWRInfinite(
    getKey,
    fetcher
  );

  const items = data ? data.flat() : [];
  const hasMore = data ? data[data.length - 1]?.length > 0 : true;

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isValidating) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSize(size + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isValidating, setSize, hasMore, size]
  );

  return { items, error, isValidating, lastItemRef, hasMore };
};

export default useSWRInfiniteScroll;
