import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import SearchPage from "./SearchPage";
import BookList from "./BookList";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookList} />
        <Route path="/addbook" component={SearchPage} />
      </div>
    );
  }
}

export default BooksApp;
