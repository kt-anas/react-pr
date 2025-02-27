import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import filtersData from "../../../initial_filter.json";
import useFilter from "./useFilters";

function Filter() {
  const {
    filter,
    handleFilterChange,
    removeFilter,
    clearAllFilters,
    expandedFilters,
    handleSearch,
    handleShowMoreLess,
    searchTerms,
    visibleOptions,
    toggleFilter,
  } = useFilter(filtersData.filters);

  return (
    <div
      style={{
        width: "300px",
        position: "fixed",
        top: "20px",
        left: "20px",
        padding: "10px",
        overflow: "auto",
        maxHeight: "100vh",
      }}
    >
      <div className="filter-container">
        {Object.keys(filter).some((key) => filter[key].length > 0) && (
          <div className="mb-3">
            <Button variant="danger" onClick={clearAllFilters}>
              Clear Filters
            </Button>
          </div>
        )}

        {Object.keys(filter).some((key) => filter[key].length > 0) && (
          <div className="mb-3 d-flex flex-wrap gap-2">
            {Object.keys(filter).map((key) =>
              filter[key].map((value, index) => (
                <Badge
                  key={`${key}-${value}-${index}`}
                  pill
                  bg="primary"
                  className="d-flex align-items-center"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {filtersData.filters
                    .find((f) => f.name === key)
                    ?.options.find((option) => option.value === value)?.label ||
                    value}
                  <Button
                    variant="link"
                    className="btn-close btn-close-white btn-sm"
                    style={{ padding: 0, marginLeft: "0.5rem" }}
                    aria-label="Remove"
                    onClick={() => removeFilter(key, value)}
                  />
                </Badge>
              ))
            )}
          </div>
        )}

        <Accordion alwaysOpen activeKey={expandedFilters}>
          {filtersData.filters.map((filterGroup) => (
            <Accordion.Item
              eventKey={filterGroup.name}
              key={filterGroup.name}
            >
              <Accordion.Header
                onClick={() => toggleFilter(filterGroup.name)}
              >
                {filterGroup.name}
              </Accordion.Header>
              <Accordion.Body>
                {filterGroup.options.length > 10 && (
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    className="mb-3"
                    onChange={(event) => handleSearch(event, filterGroup.name)}
                    value={searchTerms[filterGroup.name] || ""}
                  />
                )}

                {filterGroup.options
                  .filter((option) =>
                    filterGroup.options.length > 10
                      ? option.label
                          .toLowerCase()
                          .includes(searchTerms[filterGroup.name] || "")
                      : true
                  )
                  .slice(0, visibleOptions[filterGroup.name] || 5)
                  .map((option) => (
                    <Form.Check
                      key={`${filterGroup.name}-${option.value}`}
                      type="checkbox"
                      id={`${filterGroup.name}-${option.value}`}
                      label={option.label}
                      checked={filter[filterGroup.name]?.includes(option.value)}
                      onChange={(event) =>
                        handleFilterChange(
                          event,
                          filterGroup.name,
                          option.value
                        )
                      }
                    />
                  ))}

                {filterGroup.options.filter((option) =>
                  filterGroup.options.length > 10
                    ? option.label
                        .toLowerCase()
                        .includes(searchTerms[filterGroup.name] || "")
                    : true
                ).length === 0 && <div>Search not found</div>}

                {filterGroup.options.length > 5 && (
                  <Button
                    variant="link"
                    onClick={() =>
                      handleShowMoreLess(
                        filterGroup.name,
                        filterGroup.options.length
                      )
                    }
                    style={{ marginTop: "10px" }}
                  >
                    {(visibleOptions[filterGroup.name] || 5) >=
                    filterGroup.options.length
                      ? "Show Less"
                      : "Show More"}
                  </Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Filter;
