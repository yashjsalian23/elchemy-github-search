import { Routes, Route } from "react-router-dom";

import HomePage from "./components/home-page/HomePage";
import SearchResult from "./components/search-result/SearchResults";
import DetailPage from "./components/detailed-page/DetailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" exact element={<SearchResult />} />
        <Route path="/detail/:owner/:repo" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
