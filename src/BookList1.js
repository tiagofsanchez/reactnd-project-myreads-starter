import React from "react";

const BookList1 = props => {
  const { books } = props;
  console.log(books);
  return <p>I am your list</p>;
};

export default BookList1;
