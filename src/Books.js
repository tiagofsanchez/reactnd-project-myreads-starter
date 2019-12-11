import React, { Fragment } from "react";
import Book from "./Book";
import PropTypes from 'prop-types';

const Books = props => {
  const { books, onChangeShelf } = props;
  
  
  //need to create a class component to have a state that will change the styling accordingly
  let backgroundColorIfSelected = {backgroundColor:`none`}
  const onChangeStyle = bookID => {
    console.log(bookID)}
  
  console.log(onChangeShelf())


  return (
    <Fragment>
      { books && books.map(book => {
        return (
          <li key={book.id} style={backgroundColorIfSelected}>
            <Book book={book} onChangeShelf={onChangeShelf} changeStyleChecker={onChangeStyle} />
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
