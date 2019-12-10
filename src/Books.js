import React, { Fragment } from "react";
import BookSelector from "./BookSelector";
import PropTypes from 'prop-types';

const Books = props => {
  const { books, onChangeShelf } = props;
  return (
    <Fragment>
      { books && books.map(book => {
        return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 192,
                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                  }}
                ></div>
                <BookSelector book={book} onChangeShelf={onChangeShelf} />
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        );
      })}
    </Fragment>
  );
};

//?? Why is this not catching my error on the SearchPage component ??
Books.prototypes ={ 
  books: PropTypes.array.isRequired, 
  onChangeShelf: PropTypes.func.isRequired
}

export default Books;
