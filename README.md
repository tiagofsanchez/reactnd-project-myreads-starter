# MyReads Project

My Udacity project.

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## The structure of my Project

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

# Notes, interesting remarks and stuff that I have learnt on this project

## Component Life-cycle: componentDidMount()

The following example is very interesting to highlight how `componentDidMount()` works.
I my `App.js` I have the following (at least, I had that in the beginning):

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
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}
```

With the `console.log(this.state)` I can check that `render()` gets mounted first and it will return an empty `state`, after you will have the `componentDidMount()` that will fetch all the data from the API and push that into the `state` of my `App.js`.

As a result of this, every time that you pass `state` into their children, you will have to make sure that the state exists and the children component can use it. If, for example you are using `books` in a children component you have to make sure that `books` is not empty.

```js
{books && books.map((book) => {...})}
```

Despite the fact that you will have `state` being rendered twice, this will not have any visual implications to the user. Life is good!

## Group by a property in my objectArray

In the `BookList.js` component I get books from `props` and I receive all the books directly from my API in an array of objects that will not be ordered considering the shelf that they are in. As such, we needed to do that. I most confess, I was a little bit stuck here, before discovering `reduce()`.

This is how my data looks:

```js
(13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
0: {title: "The Linux Command Line", subtitle: "A Complete Introduction", authors: Array(1), publisher: "No Starch Press", publishedDate: "2012", …}
1: {title: "How Buildings Learn", subtitle: "What Happens After They're Built", authors: Array(1), publisher: "Penguin", publishedDate: "1995-10-01", …}
...
length: 13
```

Bellow my implementation:

```jsx
const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};
```

If you are not familiar with `reduce()` I definitely encourage you to check out [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) documentation.

After solving this data structure problem I have created a new problem: How to loop through this new object?

```js
{currentlyReading: Array(6), wantToRead: Array(4), read: Array(3)}
currentlyReading: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
read: (3) [{…}, {…}, {…}]
wantToRead: (4) [{…}, {…}, {…}, {…}]
```

## How to map trough and object

So now I have to be able to `map()` through the above object, however `map()` only can be use in arrays. This is when `Object.keys()` comes handy as I will be able to create the needed array.

```jsx
{
  Object.keys(booksByShelf).map(shelf => {
    return (
      <div key={shelf}>
        <ShelfTitle shelf={shelf} />
        <BookShelf books={booksByShelf[shelf]} onChangeShelf={onChangeShelf} />
      </div>
    );
  });
}
```

If you are not familiar with `Object.keys()` I definitely encourage you to check out [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) documentation.

## How to always know the shelf of each given book

A big caveat here: I will assume that you will know how to build a controlled component and here will only address you can know in what shelf the book is.

I have created a `BookSelector.js` that will have state that will be the `shelf` of a given book. At the beginning it will empty, but it will be updated with `componentDidMount()` depending on the `this.props.book.shelf` that I will need to pass down by the parent component.

```jsx
//in BookSelector.js
  state = {
    shelf: ""
  };

  componentDidMount() {
    this.setState({
      shelf: this.props.book.shelf
    });
  }
```

This will be very important so that the selector will start in the accurate position.

Every time that I select a different shelf, the book will be changing it's location on the it will trigger the callback function that will take `book` and `shelf` as arguments to change the database and the overall state of the `App.js` via the `BookAPI.update()`

```jsx
//in App.js
handleBookChangeShelf = (book, shelf) => {
  if (book.shelf !== shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ books });
      });
    });
  }
};
```

> Above, however, I am considering 2 API calls, and to a certain extent I reckon that will be inefficient and will slow down the UI, so I have implemented something different on my project

## The SearchPage implementation

This one was interesting as I needed to think about how to solve for 2 problems:

1. How will the search be done as the user is typing, and not by submitting the query
2. If the book the user is searching is already on one of my shelf's, the user should know that

### Real time search

Actually easier then I expected, you have to implement the API call on the `onChange` handler that you will implement. My implementation as follows:

```jsx
// in SeachPage.js
state = {
  search: "",
  books: "",
  myBooks: ""
};

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
  } else if (search.length === 0) {
    console.log(search);
    this.setState(prevState => ({
      ...prevState,
      books: ""
    }));
  }
};
```

### Is the searched Book in any shelf already?

As you can imagine, the reason my state has `myBooks` is that will get me the data from the books that the user already selected so that I can know if they are the same as the ones retrieved from my search.
With this new piece of data I am now able to change the `state` of my selector depending on where the user books are by updating my `componentDidMount()`

```jsx
// in BookSelector.js
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

I think I cover the most challenging pieces. If you made it thus far I hope you have enjoyed.
