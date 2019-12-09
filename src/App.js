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

  handleBookChangeShelf = (bookID, shelf) => {
    BooksAPI.update(bookID, shelf).then(books => {
      console.log(books);
    });
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
        <Route path="/addbook" component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
