import React, { useState, useEffect } from "react";

const SearchResult = () => {
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("query");
    setSearchQuery(query);
  }, []);
  return (
    <>
      <p>{searchQuery}</p>
    </>
  );
};

export default SearchResult;
