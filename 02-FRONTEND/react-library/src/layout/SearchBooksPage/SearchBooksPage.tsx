// Importing necessary React hooks and components
import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

// SearchBooksPage component
export const SearchBooksPage = () => {
  // State variables using the useState hook
  const [books, setBooks] = useState<BookModel[]>([]); // Array to store book data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [httpError, setHttpError] = useState(null); // HTTP error state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [booksPerPage] = useState(5); // Number of books to display per page
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0); // Total number of books
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection]=useState('Book Category');

  // useEffect hook to fetch books when the component mounts
  // useEffect hook to fetch books when the component mounts or when currentPage changes
  useEffect(() => {
    const fetchBooks = async () => {
      // Constructing the API URL based on the current page and books per page
      const baseUrl: string = `${process.env.REACT_APP_API}/books`;
      let url: string = `${baseUrl}?page=${
        currentPage - 1
      }&size=${booksPerPage}`;
      console.log(url);
      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage=searchUrl.replace('<pageNumber>', `${currentPage-1}`)
        url = baseUrl + searchWithPage;
      }

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
  }, [currentPage, searchUrl]); // Dependency array is empty to run the effect only once when the component mounts

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

  const searchHandleChange = () => {
    if (search === "") {
      setSearchUrl("");
    } else {
      setCurrentPage(1);
      
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
      );
    }
  };

  const categoryField = (value:string)=>{

    setCurrentPage(1);
    if(value.toLowerCase() ==='fe' || value.toLowerCase()==='be' || value.toLowerCase()==='data' || value.toLowerCase()==="devops"){
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)

    }
    else{
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
    }
  }

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="Search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  id="dropdownMenuButton1"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={()=> categoryField('All')}>
                    <a href="#" className="dropdown-item">
                      All
                    </a>
                  </li>
                  <li onClick={()=> categoryField('FE')}>
                    <a href="#" className="dropdown-item">
                      Front End
                    </a>
                  </li>

                  <li onClick={()=> categoryField('BE')}>
                    <a href="#" className="dropdown-item">
                      Back End
                    </a>
                  </li>
                  <li onClick={()=> categoryField('Data')}>
                    <a href="#" className="dropdown-item">
                      Data
                    </a>
                  </li>

                  <li onClick={()=> categoryField('DevOps')}>
                    <a href="#" className="dropdown-item">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalPages > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalAmountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks}{" "}
                items:
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                href="#"
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold tc"
              >
                Library Services
              </a>
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
      </div>
    </div>
  );
};
