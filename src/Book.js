import React, { Component } from "react";
import BookSelector from "./BookSelector";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    myBooks: PropTypes.array
  };

  state = {
    changeStyle: false
  };

  render() {
    const { book, onChangeShelf, myBooks } = this.props;
    let coverBook = ``;
    if (book.imageLinks !== undefined) {
      coverBook = `url(${book.imageLinks.smallThumbnail})`;
    }

    const onMoveBook = shelf => {
      if (shelf !== undefined) {
        this.setState({
          changeStyle: !this.state.changeStyle
        });
      }
    };

    let backgroundColorIfSelected = { backgroundColor: `none` };
    if (this.state.changeStyle) {
      backgroundColorIfSelected = {
        backgroundColor: `darkgray`,
        margin: `5px`
      };
    }

    return (
      <li key={book.id} style={backgroundColorIfSelected}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: coverBook
              }}
            ></div>
            <BookSelector
              book={book}
              myBooks={myBooks}
              onChangeShelf={onChangeShelf}
              moveBook={onMoveBook}
            />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {/* A better way to
            display information from an array: book.authors.join(' / ') Needles
            to say that this avoids the problem with the key whenever you use a
            .map() */}
            {/* book.authors &&
              book.authors.map((author, index) => {
                return (
                  <p style={{ margin: 0 }} key={index}>
                    {author}
                  </p>
                );
              }) */}
            {book.authors && book.authors.join(" / ")}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
