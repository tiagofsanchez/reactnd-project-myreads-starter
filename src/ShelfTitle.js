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
      {shelfName.map((s, index) => {
        if (s.shelf === shelf) {
          return (
            <h2 className="bookshelf-title" key={shelf}>
              {s.name}
            </h2>
          );
        }
        return <div key={index}></div>;
      })}
    </Fragment>
  );
};

export default ShelfTitle;
