import React from "react";
import BookSelector from "./BookSelector";

const Book = props => {
  const { book, onChangeShelf } = props;

  //need to create a class component to have a state that will change the styling accordingly
  let backgroundColorIfSelected = { backgroundColor: `none` };
  const onChangeStyle = (bookID , shelf) => {
    console.log(`${bookID} and ${shelf}`);
  };
  onChangeStyle();

  return (
    <li key={book.id} style={backgroundColorIfSelected}>
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
          <BookSelector book={book} onChangeShelf={onChangeShelf} changeStyleChecker={onChangeStyle}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};

export default Book;
