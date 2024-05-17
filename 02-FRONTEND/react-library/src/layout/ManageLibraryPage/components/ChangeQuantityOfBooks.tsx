import { useState, useEffect } from "react";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { ChangeQuantityOfBook } from "./ChangeQuantityOfBook";

// ChangeQuantityOfBooks component
export const ChangeQuantityOfBooks = () => {
  // State variables using the useState hook
  const [books, setBooks] = useState<BookModel[]>([]); // Array to store book data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [httpError, setHttpError] = useState(null); // HTTP error state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [booksPerPage] = useState(5); // Number of books to display per page
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0); // Total number of books
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [bookDelete, setBookDelete] = useState(false);

  // useEffect hook to fetch books when the component mounts
  // useEffect hook to fetch books when the component mounts or when currentPage changes
  useEffect(() => {
    const fetchBooks = async () => {
      // Constructing the API URL based on the current page and books per page
      const url: string = `${process.env.REACT_APP_API}/books?page=${
        currentPage - 1
      }&size=${booksPerPage}`;

      // Fetch data from the provided API endpoint
      const response = await fetch(url);

      // Checking if the response is successful (HTTP status code 2xx)
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Parsing the JSON response
      const responseJson = await response.json();

      // Extracting relevant information from the response
      setCurrentPage(responseJson.page.number + 1);
      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      // Mapping the response data to an array of BookModel instances
      const loadedBooks: BookModel[] = responseJson._embedded.books.map(
        (bookData: any) => ({
          // Details of each book instance
          id: bookData.id,
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
          copies: bookData.copies,
          copiesAvailable: bookData.copiesAvailable,
          category: bookData.category,
          img: bookData.img,
        })
      );

      // Setting the state variables with the loaded books and updating loading state
      setBooks(loadedBooks);
      setIsLoading(false);
    };

    // Call the fetchBooks function and handle errors
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [currentPage, bookDelete]); // Dependency array is empty to run the effect only once when the component mounts

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

  // Calculate the index of the last book on the current page
  const indexOfLastBook = booksPerPage * currentPage;
  // Calculate the index of the first book on the current page
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // Calculate the last item displayed, considering the total amount of books
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  // Function to handle pagination button clicks
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const deleteBook = () => setBookDelete(true);

  return (
    <div className="container mt-5">
      {totalAmountOfBooks > 0 ? (
        <>
          <div className="mt-3">
            <h3>
              Number of results: <b>{totalAmountOfBooks}</b>
            </h3>
          </div>
          <p>
            {indexOfFirstBook} to {lastItem} of {totalAmountOfBooks} items:{" "}
          </p>

          {books.map((book) => (
            <ChangeQuantityOfBook book={book} deleteBook={deleteBook} />
          ))}
        </>
      ) : (
        <div>
          <h5>Add a book before changing quantity</h5>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
