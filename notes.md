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

In the `BookShelf.js` component I get books from `props` and I receive

## How to extract the property of an object

helpful links: [here](https://dev.to/saigowthamr/how-to-loop-through-object-in-javascript-es6-3d26)

## Many Authors

how to take care of many authors

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
