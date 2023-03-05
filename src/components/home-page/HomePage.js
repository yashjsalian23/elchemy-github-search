import axios from "axios";
import React, { useState, useEffect } from "react";

import "./HomePage.css";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState();
  const [timeout, setTimeOut] = useState();

  const getResults = async (query) => {
    let response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}&per_page=5`
    );
    if (response && response.data.items && response.data.items.length) {
      setResults(response.data.items);
    } else {
      setResults([]);
    }
  };

  /**
   * Debouncing of 300ms
   * @param {string} query
   */
  const onKeyPress = (query) => {
    if (timeout) clearTimeout(timeout);
    setQuery(query);
    const ti = setTimeout(() => {
      setQuery(query);
      getResults(query);
    }, 300);
    setTimeOut(ti);
  };

  const redirectToDetailedPage = (ownerName, repoName) => {
    if (!ownerName || !repoName) return;
    setQuery(null);
    window.location.href = `/detail/${ownerName}/${repoName}`;
  };

  /**
   * This function is called when user presses enter and redirects to listing page
   * @param {Object} e
   * @returns
   */

  const redirectToSearchPage = (e) => {
    if (!query) return;
    if (e?.key != "Enter") return;
    setQuery(null);
    window.location.href = `/search-results?query=${query}`;
  };

  return (
    <>
      <div className="homepage">
        <p className="homepage-title">Seach Anything from github</p>
        <div className="TypeAheadDropDown">
          <input
            placeholder="Search any repository from github"
            onChange={(e) => onKeyPress(e.target.value)}
            onKeyDown={(e) => redirectToSearchPage(e)}
          />
          <ul>
            {results.map((item, key) => (
              <>
                <li
                  key={key}
                  onClick={() =>
                    redirectToDetailedPage(item.owner?.login, item.name)
                  }
                >
                  <span>
                    <span className="data-key">Repository:</span>{" "}
                    {item.name ? (
                      item.name
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </span>
                  <br />
                  <span>
                    <span className="data-key">Description:</span>{" "}
                    {item.description ? (
                      item.description
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </span>
                  <br />
                  <span>
                    <span className="data-key">Owner:</span>{" "}
                    {item.owner?.login ? (
                      item.owner?.login
                    ) : (
                      <span className="data-placeholder">Not available</span>
                    )}
                  </span>
                  <br />
                </li>

                <hr />
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;
