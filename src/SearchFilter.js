import { useState } from "react";

export default function SearchFilter({ searchNews }) {
  const [search, setSearch] = useState("");
  return (
    <div className="filter-container">
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-button" onClick={() => searchNews(search)}>
        Search
      </button>
    </div>
  );
}
