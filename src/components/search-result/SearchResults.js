import axios from "axios";
import React, { useState, useEffect } from "react";

import Loader from "../ui/Loader/Loader";

import "./SearchResults.css";

const SearchResult = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("query");
    const page = queryParams.get("page");
    setSearchQuery(query);
    setPage(page ? page : 1);

    setIsLoading(true);
    getResults(query, page ? page : 1);
  }, []);

  const getResults = async (query, page) => {
    let response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`
    );
    setIsLoading(false);
    if (response && response.data.items && response.data.items.length) {
      setResults(response.data.items);
      setTotalCount(response.data.total_count);
    } else {
      setResults([]);
    }
  };

  const redirectToDetailedPage = (ownerName, repoName) => {
    if (!ownerName || !repoName) return;
    window.location.href = `/detail/${ownerName}/${repoName}`;
  };

  const handlePagination = (type) => {
    if (!type) return;
    let copyPageValue = page;
    let fetchResults = true;
    switch (type) {
      case "prev":
        if (copyPageValue > 1) {
          copyPageValue--;
        } else {
          fetchResults = false;
        }
        break;
      case "next":
        if (copyPageValue >= 1) {
          copyPageValue++;
        } else {
          fetchResults = false;
        }
        break;
    }
    setPage(copyPageValue);
    /**
     * Query params added to persist pagination on re-load
     */
    if (fetchResults) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", copyPageValue);
      window.location.href =
        window.location.pathname + `?${searchParams.toString()}`;
      getResults(searchQuery, copyPageValue);
    }
  };

  return (
    <>
      <p className="result-title">Results for {searchQuery}</p>
      {results && results.length ? (
        <>
          <div className="result-pagination">
            <span onClick={() => handlePagination("prev")}>Prev</span>
            <span onClick={() => handlePagination("next")}>Next</span>
            <span>
              <b>Current Page</b>: {page}
            </span>
          </div>
          <div className="result-search">
            <a href="/">Back to search </a>
          </div>
          <div className="result-container">
            {results.map((item, key) => (
              <>
                <div
                  key={item}
                  onClick={() =>
                    redirectToDetailedPage(item.owner?.login, item.name)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <p>
                    <span className="detail-container-key">Name:</span>{" "}
                    {item.name ? (
                      item.name
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </p>
                  <p>
                    <span className="detail-container-key">Description:</span>{" "}
                    {item.description ? (
                      item.description
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </p>
                  <p>
                    <span className="detail-container-key">Owner:</span>{" "}
                    {item.owner?.login ? (
                      item.owner?.login
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </p>
                  <p>
                    <span className="detail-container-key">Language:</span>{" "}
                    {item.language ? (
                      item.language
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </p>
                  <p>
                    <span className="detail-container-key">Created On:</span>{" "}
                    {item.created_at ? (
                      item.created_at
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </p>
                </div>
                <hr />
              </>
            ))}
          </div>
        </>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <p className="not-available-placeholder">
              Results not available for your query: {searchQuery}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default SearchResult;
