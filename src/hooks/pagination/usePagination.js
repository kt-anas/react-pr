import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const usePagination = () => {
  const getInitialPage = () => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  };

  const [page, setPage] = useState(getInitialPage);
  const totalPages = 10;
  const ITEMS_PER_PAGE = 8;

  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${ITEMS_PER_PAGE}`,
    fetcher
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [page]);

  useEffect(() => {
    const handlePopState = () => {
      setPage(getInitialPage());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return { data, error, page, totalPages, goToPage, isLoading };
};

export default usePagination;
