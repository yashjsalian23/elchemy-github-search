import axios from "axios";
import React, { useState, useEffect } from "react";

import "./SearchResults.css";

// import { searchRepos } from "../../services/search";

const SearchResult = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("query");
    const page = queryParams.get("page");
    setSearchQuery(query);
    setPage(page);

    // let response = await searchRepos(query, page);
    getResults(query, page);
  }, []);

  const getResults = async (query, page) => {
    let response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}&per_page=10`
    );
    if (response && response.data.items && response.data.items.length) {
      console.log(response.data.items);

      setResults(response.data.items);
      setTotalCount(response.data.total_count);
    }
  };

  return (
    <>
      <div className="result-container">
        {results.map((item, key) => (
          <>
            <div key={key}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.owner?.login}</p>
              <p>{item.language}</p>
              <p>{item.created_at}</p>
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  );
};

export default SearchResult;
