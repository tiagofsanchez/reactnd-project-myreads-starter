# QUESTIONS For Ravi (mentor)

## Search Page

```text
a) As the user types into the search field, books that match the query are displayed on the page, along with their titles and authors. You can use throttle/debounce but are not required to do so.
```

what is throttle/debounce? And why should I use it?

```text
b) Search results are not shown when all of the text is deleted out of the search input box.
```

does this mean that when the search input box is deleted and as a result `this.state.search` is "" results are not shown?

I have actually tried to implement this is the following way:

```jsx
handleChange = e => {
  const { value } = e.target;
  const { search } = this.state;
  const { myArchive } = this.props;

  this.setState(prevState => ({
    ...prevState,
    search: value
  }));
  if (search) {
    BooksAPI.search(search).then(books => {
      if (books !== "" && search !== "") {
        this.setState(prevState => ({
          ...prevState,
          books: books,
          myBooks: myArchive
        }));
      }
    });
  } else {
    console.log(search);
    this.setState(prevState => ({
      ...prevState,
      books: ""
    }));
  }
};
```

the problem that I have with that is that I am not sure

```text
Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.

If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf.
```

I have implemented this, but not sure if this is how it should be implemented, SEE BELLOW bookSelector

## prop-type

Not sure why my implementation doesn't work

## bookSelector

There are a couple of things here:

- the below code give me the following alert on the console

```
  Line 18:  Expected to return a value in arrow function  array-callback-return\
```

- is this the best approach?
- whenever I change the selector for the new ones, the shelf will default to none
- change the selector for the books that I have already, the selector will default for the previous one

```js
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
```
