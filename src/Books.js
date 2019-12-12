import React, { Fragment } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const Books = props => {
  const { books, onChangeShelf , myBooks } = props;

  return (
    <Fragment>
      {books &&
        books.map(book => {
          return (
            <Book
              book={book}
              myBooks={myBooks}
              onChangeShelf={onChangeShelf}
              key={book.id}
            />
          );
        })}
    </Fragment>
  );
};

//?? Why is this not catching my error on the SearchPage component ??
Books.prototypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default Books;
