import React, { Component } from "react";
import CloseSearchButton from "./CloseSearchButton";
import * as BooksAPI from "./BooksAPI";
import Books from "./Books";
import PropTypes from "prop-types";

class SearchPage extends Component {
  state = {
    search: "",
    books: "",
    myBooks: ""
  };

  /*
  I am maintaining a single source of truth on my `App.js` and to pass the shelf along 
  to every Book, depending on my search and the books shelf I will need to check if my 
  props have changed and push them if they did. NOTE: the props will get change every
  time the user selects a different shelf for any book.
  */
  componentDidUpdate(prevProps) {
    const { myArchive } = this.props;
    if (JSON.stringify(myArchive) !== JSON.stringify(prevProps.myArchive)) {
      this.setState(prevState => ({
        ...prevState,
        myBooks: myArchive
      }));
    }
  }

  //Make the API Call of the Books depending on the user inputs
  handleChange = e => {
    const { value } = e.target;
    const { myArchive } = this.props;
    /*
    I need to search for `value` as this.setState is ASYNC and 
    if I search for this.state.search will have "delay" given the 
    this.setState nature. 
    NOTE: not using throttle-debounce
    */
    this.setState(prevState => ({
      ...prevState,
      search: value
    }));

    if (value) {
      BooksAPI.search(value).then(books => {
        if (books !== "") {
          this.setState(prevState => ({
            ...prevState,
            search: value,
            books: books,
            myBooks: myArchive
          }));
        }
      });
    } else {
      this.setState(prevState => ({
        ...prevState,
        books: "",
        search: ""
      }));
    }
  };

  render() {
    const { search, books, myBooks } = this.state;
    const { onChangeShelf } = this.props;
    console.log(this.state);
    let booksOrNoBooks = "";
    if (books.error === "empty query" || books === "undefined") {
      booksOrNoBooks = (
        <h1 style={{ textAlign: `center` }}>
          We can't find anything... sorry, try again
        </h1>
      );
    } else {
      booksOrNoBooks = (
        <ol className="books-grid">
          {books && (
            <Books
              books={books}
              onChangeShelf={onChangeShelf}
              myBooks={myBooks}
            />
          )}
        </ol>
      );
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <CloseSearchButton />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">{booksOrNoBooks}</div>
      </div>
    );
  }
}

SearchPage.prototypes = {
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  myArchive: PropTypes.array.isRequired
};

export default SearchPage;
