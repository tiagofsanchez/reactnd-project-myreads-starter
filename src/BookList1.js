import React from "react";
import Book from "./Book"; 


const BookList1 = props => {
  const { books } = props;
  return (
    <div className="bookshelf-books">
      <Book/>
    </div>
  );
};

export default BookList1;
