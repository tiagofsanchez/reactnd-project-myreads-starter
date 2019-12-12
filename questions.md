# QUESTIONS For Ravi (mentor)

## Search Page
```text
a) As the user types into the search field, books that match the query are displayed on the page, along with their titles and authors. You can use throttle/debounce but are not required to do so.
```

what is throttle/debounce? And why should I use it?

```text
b) Search results are not shown when all of the text is deleted out of the search input box.
```

does this mean that when the search input box is deleted and as a result `this.state.search` is "" results are not shown? T

```text
Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.

If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf.
```

I am not sure how should I think about this

## prop-type

Not sure why my implementation doesn't work