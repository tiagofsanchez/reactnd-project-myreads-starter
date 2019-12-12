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

  handleChange = e => {
    const { value } = e.target;
    const { search } = this.state;
    const { myArchive } = this.props;

    this.setState(prevState => ({
      ...prevState,
      search: value
    }));
    if (search) {
      BooksAPI.search(search).then(books => {
        if (books !== "" && search !== "") {
          this.setState(prevState => ({
            ...prevState,
            books: books,
            myBooks: myArchive
          }));
        }
      });
    } else {
      console.log(search);
      this.setState(prevState => ({
        ...prevState,
        books: ""
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
  books: PropTypes.array.isRequired
};

export default SearchPage;
