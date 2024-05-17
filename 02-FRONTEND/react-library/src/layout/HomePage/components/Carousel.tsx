// Import necessary modules and components from React and other files
import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel"; // Import the BookModel class
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import ReturnBook from "./ReturnBook";
import { Link } from "react-router-dom";

// Define a functional component named Carouusel
export const Carouusel = () => {
  // State variables using the useState hook
  const [books, setBooks] = useState<BookModel[]>([]); // Array to store book data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [httpError, setHttpError] = useState(null); // HTTP error state

  // useEffect hook to fetch books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `${process.env.REACT_APP_API}/books`;
      const url: string = `${baseUrl}?page=0&size=9`;

      // Fetch data from the provided API endpoint
      const response = await fetch(url);

      // Check if the response is successful (HTTP status code 2xx)
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Parse the JSON response
      const responseJson = await response.json();

      // Extract the array of books from the response
      const responseData = responseJson._embedded.books;
        console.log(responseData);
      // Map the response data to an array of BookModel instances
      const loadedBooks: BookModel[] = responseData.map((bookData: any) => ({
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        copies: bookData.copies,
        copiesAvailable: bookData.copiesAvailable,
        category: bookData.category,
        img: bookData.img,
      }));

      // Set the state variables with the loaded books and update loading state
      setBooks(loadedBooks);
      setIsLoading(false);
    };

    // Call the fetchBooks function and handle errors
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message); // Fix: should be error.message instead of error.mressage
    });
  }, []); // Dependency array is empty to run the effect only once when the component mounts

  // Render loading spinner while data is being fetched
  if (isLoading) {
    return <SpinnerLoading />;
  }

  // Render error message if an HTTP error occurs
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  // Render the carousel component with book data
  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>

      {/* Desktop Carousel */}
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Carousel Inner Content */}
        <div className="carousel-inner">
          {/* Carousel Item 1 */}
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {/* Map over the first 3 books and render ReturnBook component for each */}
              {books.slice(0, 3).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>

          {/* Carousel Item 2 */}
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {/* Map over the next 3 books and render ReturnBook component for each */}
              {books.slice(3, 6).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>

          {/* Carousel Item 3 */}
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {/* Map over the last 3 books and render ReturnBook component for each */}
              {books.slice(6, 9).map((book) => (
                <ReturnBook book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile Carousel */}
      <div className="d-lg-none mt-3">
        {/* Render a single book for mobile view */}
        <div className="row d-flex justify-content-center align-items-center">
          <ReturnBook book={books[7]} key={books[7].id} />
        </div>
      </div>

      {/* View More Button */}
      <div className="homepage-carousel-title mt-3">
        <Link to="/search" className="btn btn-outline-secondary btn-lg">
          {" "}
          View More
        </Link>
      </div>
    </div>
  );
};
