import React, { Fragment } from "react";
import BookSelector from "./BookSelector";

const Books = props => {
  const { books, onChangeShelf } = props;
  console.log(books);
  return (
    <Fragment>
      {books.map(book => {
        return (
          <li key={book.title}>
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

export default Books;
