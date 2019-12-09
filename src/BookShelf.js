import React from "react";
import Books from "./Books";

const BookShelf = props => {
  const { books } = props;

  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        <Books books={books} />
      </ol>
    </div>
  );
};

export default BookShelf;
