import React from "react";
import BookSelector from "./BookSelector";

const Book = props => {
  const { book ,onChangeShelf } = props   
  return (
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
  );
};

export default Book;
