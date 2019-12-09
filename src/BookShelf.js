import React from "react";
import Books from "./Books";

const BookShelf = props => {
  const { books, onChangeShelf } = props;

  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        <Books books={books} onChangeShelf={onChangeShelf} />
      </ol>
    </div>
  );
};

export default BookShelf;
