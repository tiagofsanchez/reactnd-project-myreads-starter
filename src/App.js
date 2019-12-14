import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchPage from "./SearchPage";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = {};

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(prevState => ({
        ...prevState,
        books
      }));
    });
  }

  handleBookChangeShelf = (book, shelf) => {
    if (book && book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat(book)
        }));
      });
    }
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={books}
              onChangeShelf={this.handleBookChangeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              onChangeShelf={this.handleBookChangeShelf}
              myArchive={books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
