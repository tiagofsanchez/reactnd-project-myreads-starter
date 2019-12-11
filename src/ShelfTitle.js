import React, { Fragment } from "react";

const shelfName = [
  { shelf: "currentlyReading", name: "Currently Reading" },
  { shelf: "wantToRead", name: "Want to Read" },
  { shelf: "read", name: "Read" },
  { shelf: "none", name: "None" }
];

const ShelfTitle = props => {
  const { shelf } = props;
  return (
    <Fragment>
      {shelfName.map(s => {
        if (s.shelf === shelf) {
          return <h2 className="bookshelf-title">{s.name}</h2>;
        }
      })}
    </Fragment>
  );
};

export default ShelfTitle;
