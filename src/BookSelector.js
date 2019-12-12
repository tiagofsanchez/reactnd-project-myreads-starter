import React, { Component } from "react";

class BookSelector extends Component {
  state = {
    shelf: ""
  };

  componentDidMount() {
    const { book, myBooks } = this.props;
    if (book.shelf === undefined) {
      this.setState({ shelf: "none" });
    }
    if (book.shelf !== undefined) {
      this.setState({
        shelf: book.shelf
      });
    } else {
      myBooks.map(b => {
        if (b.id === book.id) {
          this.setState({
            shelf: b.shelf
          });
        }
      });
    }
  }

  handleChange = e => {
    const { value } = e.target;
    const { book, onChangeShelf, moveBook } = this.props;
    onChangeShelf(book, value);
    moveBook(value);
  };

  render() {
    const { shelf } = this.state;

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookSelector;
