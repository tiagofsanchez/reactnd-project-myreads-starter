import React from "react";
import BookShelf from "./BookShelf";
import AddBookButton from "./AddBookButton";
import PropTypes from "prop-types";
import ShelfTitle from "./ShelfTitle";

const BookList = props => {
  const { books, onChangeShelf } = props;

  //this will `groupBy` considering the property of my choosing.
  //in this case I wanted to be the shelf
  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  //creat an object that Groups the books considering the shelf that they are in
  let booksByShelf = {};
  if (books) {
    booksByShelf = groupBy(books, "shelf");
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            {Object.keys(booksByShelf).map(shelf => {
              return (
                <div key={shelf}>
                  <ShelfTitle shelf={shelf} />
                  <BookShelf
                    books={booksByShelf[shelf]}
                    onChangeShelf={onChangeShelf}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <AddBookButton />
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array,
  onChangeShelf: PropTypes.func.isRequired
};

export default BookList;
