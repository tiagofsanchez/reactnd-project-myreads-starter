# Notes and interesting remarks

## Component Life-cycle: componentDidMount()

The following example is very interesting to highlight how `componentDidMount()` works.
I my `App.js` I have the following:

```jsx
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

  render() {
    console.log(this.state);
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList books={books} />} />
        <Route path="/addbook" component={SearchPage} />
      </div>
    );
  }
}
```

With the `console.log(this.state)` I can check that `render()` gets mounted first, after you will have the `componentDidMount()` that will fetch all the data from the API and push that into the state of my `App.js`.

As a result of this, every time that you pass `App.js` state into their children, you will have to make sure that the state exists and the children component can use it. As an example:

```js
{books && books.map((book) => {...})}
```

## Group by a property in my objectArray

In the `BookList.js` component I get books from `props` and I receive

## How to extract the property of an object

helpful links: [here](https://dev.to/saigowthamr/how-to-loop-through-object-in-javascript-es6-3d26)

## Many Authors

how to take care of many authors and render them inline with one another

```jsx
{
  books &&
    books.map(book => {
      const bookShelf = book.shelf;
      const bookTitle = book.title;
      const bookAuthors = book.authors;
      return (
        <ul key={bookTitle}>
          <li>
            {bookTitle}, from {bookShelf} and{" "}
            {bookAuthors.map(author => {
              return (
                <p style={{ display: `inline` }} key={author}>
                  {author}{" "}
                </p>
              );
            })}
          </li>
        </ul>
      );
    });
}
```

## Set up the Controlled Component

I have created a `BookSelector.js` that will have state that will be the `shelf` of a given book. At the beginning it will empty, but it will be updated with `componentDidMount()` depending on the `this.props.book.shelf`. 

```jsx
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
    const { book, onChangeShelf } = this.props;
    console.log(`I want to change ${book.id} from ${book.shelf} to ${value}`);
    onChangeShelf(book, value);
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
```

Every time that I select a different shelf, the book will be changing it's location on the it will trigger the callback function that will take `book` and `shelf` as arguments to change the database and the overall state of the `App.js`

```jsx
  handleBookChangeShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.getAll().then(books => {
          this.setState({books})
        })
      });
    }
  };
```

Above, however, I am considering 2 API calls, and to certain extent I reckon that will be inefficient and will slow down the UI.