import React, { Fragment } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const Books = props => {
  const { books, onChangeShelf, myBooks } = props;

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

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  myBooks: PropTypes.array
};

export default Books;
