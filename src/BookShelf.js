import React from "react";
import Books from "./Books";
import PropTypes from 'prop-types'; 

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

BookShelf.prototypes= { 
  books: PropTypes.array.isRequired, 
  onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf;
