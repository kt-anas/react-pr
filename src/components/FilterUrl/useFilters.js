import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useFilter = (filters) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerms, setSearchTerms] = useState({});
  const [visibleOptions, setVisibleOptions] = useState({});

  const getFilterState = () => {
    const currentFilter = {};
    filters.forEach((filter) => {
      currentFilter[filter.name] = searchParams.getAll(filter.name) || [];
    });
    return currentFilter;
  };

  const filter = getFilterState();
  const expandedFilters = searchParams.get("expanded")?.split(",") || [];

  const handleFilterChange = (event, key, subKey) => {
    const isChecked = event.target.checked;
    const currentValues = searchParams.getAll(key);
    if (isChecked) {
      searchParams.append(key, subKey);
    } else {
      const updatedValues = currentValues.filter((value) => value !== subKey);
      searchParams.delete(key);
      updatedValues.forEach((value) => searchParams.append(key, value));
    }
    setSearchParams(searchParams);
  };

  const removeFilter = (key, subKey) => {
    const currentValues = searchParams.getAll(key);
    const updatedValues = currentValues.filter((value) => value !== subKey);
    searchParams.delete(key);
    updatedValues.forEach((value) => searchParams.append(key, value));
    setSearchParams(searchParams);
  };

  const handleSearch = (event, filterGroupName) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [filterGroupName]: event.target.value.toLowerCase(),
    }));
    setVisibleOptions((prevVisible) => ({
      ...prevVisible,
      [filterGroupName]: 5,
    }));
  };

  const handleShowMoreLess = (filterGroupName, totalOptions) => {
    setVisibleOptions((prevVisible) => ({
      ...prevVisible,
      [filterGroupName]:
        (prevVisible[filterGroupName] || 5) >= totalOptions ? 5 : totalOptions,
    }));
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const toggleFilter = (filterName) => {
    const isExpanded = expandedFilters.includes(filterName);
    const newExpandedFilters = isExpanded
      ? expandedFilters.filter((name) => name !== filterName)
      : [...expandedFilters, filterName];

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      expanded: newExpandedFilters.join(","),
    });
  };

  return {
    filter,
    handleFilterChange,
    removeFilter,
    clearAllFilters,
    handleSearch,
    handleShowMoreLess,
    searchTerms,
    visibleOptions,
    expandedFilters,
    toggleFilter,
  };
};

export default useFilter;
