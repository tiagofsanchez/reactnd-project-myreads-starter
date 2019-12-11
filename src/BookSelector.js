import React, { Component } from "react";

class BookSelector extends Component {
  state = {
    shelf: ""
  };

  componentDidMount() {
    this.setState({
      shelf: this.props.book.shelf
    });
  }

  handleChange = e => {
    const { value } = e.target;
    const { book, onChangeShelf , changeStyleChecker } = this.props;
    console.log(`I want to change ${book.id} from ${book.shelf} to ${value}`);
    onChangeShelf(book, value);
    changeStyleChecker(book.id)
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
