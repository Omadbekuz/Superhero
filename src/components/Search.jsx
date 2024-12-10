import React, { useState } from 'react';
import "./Search.css"

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // onSearch funksiyasini chaqiradi
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Qahramon nomini qidirish..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
