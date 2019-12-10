import React from "react";
import CloseSearchButton from './CloseSearchButton';

const SearchPage = props => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
       <CloseSearchButton />
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
};

export default SearchPage;
