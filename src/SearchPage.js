import React, { Component } from "react";
import CloseSearchButton from "./CloseSearchButton";
import * as BooksAPI from './BooksAPI';
import Books from "./Books";
import PropTypes from "prop-types"; 

class SearchPage extends Component {
  
  state = { 
    search: "", 
    books: ""
  }
  
  handleChange = e => { 
    const { value } = e.target
    this.setState(prevState => ({
      ...prevState, 
      search: value
    }))
  }

  handleBookSearch = e => { 
    e.preventDefault();
    const { search } = this.state; 
    BooksAPI.search(search).then(books => {
      if (books !== "" && search !== "") {
      this.setState(prevState => ({
        ...prevState, 
        books: books, 
        search: ''
      }))}
    })
    .catch(error=> console.log(error))
  }

  render() {
    const { search , books } = this.state;
    const { onChangeShelf } = this.props
    console.log(this.state)

    let booksOrNoBooks = "";
    if (books.error === "empty query" || books === 'undefined') {
      booksOrNoBooks = <h1 style={{textAlign: `center`}}>We can't find anything... sorry, try again</h1>;
    } else {
      booksOrNoBooks = (
        <ol className="books-grid">
          {books && <Books books={books} onChangeShelf={onChangeShelf} />}
        </ol>
      );
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <CloseSearchButton />
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleBookSearch}> 
            <input type="text" placeholder="Search by title or author" value={search}  onChange={this.handleChange}/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
        {booksOrNoBooks}
        </div>
        
      </div>
    );
  }
}


SearchPage.prototypes ={ 
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default SearchPage;
