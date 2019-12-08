import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchPage from "./SearchPage";
import BookList from "./BookList";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {};

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState(prevState => ({
        ...prevState,
        books
      }));
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList books={books} />} />
        <Route path="/addbook" component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
