import { Routes, Route } from "react-router-dom";

import SearchResult from "./components/search-result/SearchResults";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/search-results" exact element={<SearchResult />} />
      </Routes>
    </div>
  );
}

export default App;
