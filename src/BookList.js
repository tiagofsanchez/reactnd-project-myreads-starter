import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const BookList = props => {
  const { books } = props;

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
                  <h2 className="bookshelf-title">{shelf}</h2>
                  <BookShelf books={booksByShelf[shelf]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Link className="open-search" to="/addbook">
        <button>Add Book</button>
      </Link>
    </div>
  );
};

export default BookList;
