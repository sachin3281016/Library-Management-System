// Importing BookModel for type checking
import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

// SearchBook component
export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    // Card component to display book information
    <div className="card bg-body rounded mt-3 mb-3 shadow p-3">
      {/* Row for book details */}
      <div className="row g-0">
        {/* Column for book image */}
        <div className="col-md-2">
          {/* Large screen image display */}
          <div className="d-none d-lg-block">
            {props.book.img ? (
              // Display book image if available
              <img src={props.book.img} width="123" height="196" alt="Book" />
            ) : (
              // Display a default image if book image is not available
              <img
                src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>

          {/* Small screen image display */}
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.book.img ? (
              // Display book image if available
              <img src={props.book.img} width="123" height="196" alt="Book" />
            ) : (
              // Display a default image if book image is not available
              <img
                src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>
        </div>

        {/* Column for book details */}
        <div className="col-md-6">
          <div className="card-body">
            {/* Author information */}
            <h5 className="card-title">{props.book.author}</h5>
            {/* Book title */}
            <h4>{props.book.title}</h4>
            {/* Book description */}
            <p className="card-text">{props.book.description}</p>
          </div>
        </div>

        {/* Column for "View Details" button */}
        <div className="d-flex col-md-4 justify-content-center align-items-center">
          {/* "View Details" button */}
          <Link to={`/checkout/${props.book.id}`} className="btn btn-md main-color tc">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
