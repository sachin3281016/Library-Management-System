import React from "react";
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";

// Define a functional component named ReturnBook
const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {/* Check if book has an image; if not, use a default image */}
        {props.book.img ? (
          <img
            src={props.book.img}
            alt="Book"
            width="151"
            height="233"
          />
        ) : (
          <img
            src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
            alt="Book"
            width="151"
            height="233"
          />
        )}
        {/* Display book title and author */}
        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        {/* Reserve button */}
        <Link to={`/checkout/${props.book.id}`} className="btn main-color tc">
          Reserve
        </Link>
      </div>
    </div>
  );
}

export default ReturnBook;
