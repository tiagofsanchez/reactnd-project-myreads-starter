import React from "react";
import Book from "./Book";
import BookList1 from "./BookList1";

const BookShelf = props => {
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
  console.log(booksByShelf);
  Object.keys(booksByShelf).forEach(key => {
    console.log(key);
    booksByShelf[key].map(book => {
      return console.log(book.title);
    });
  });

  return (
    <div className="bookshelf">
      {Object.keys(booksByShelf).map(shelf => {
        return (
          <div>
            <h2 className="bookshelf-title">{shelf}</h2>
            <BookList1 books={booksByShelf[shelf]} />
          </div>
        );
      })}
      <h2 className="bookshelf-title">Currently Reading</h2>
      <Book />
    </div>
  );
};

export default BookShelf;
