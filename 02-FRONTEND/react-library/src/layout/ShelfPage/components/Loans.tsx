import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoansModel from "../../../models/ShelfCurrentLoansModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {
  // Okta authentication state
  const { authState } = useOktaAuth();

  // State variables for HTTP error, current loans, and loading state
  const [httpError, setHttpError] = useState("");
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<
    ShelfCurrentLoansModel[]
  >([]);
  const [checkout, setCheckout] = useState(false);
  const [isLoadingCurrentLoans, setIsLoadingCurrentLoans] = useState(false);

  // useEffect hook to fetch shelf current loans when the component mounts or when 'checkout' changes
  useEffect(() => {
    const fetchShelfCurrentLoans = async () => {
      setIsLoadingCurrentLoans(true);

      // Check if the user is authenticated
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/books/secure/currentloans`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };

        try {
          const shelfCurrentLoansResponse = await fetch(url, requestOptions);

          if (!shelfCurrentLoansResponse.ok) {
            throw new Error("Something went wrong!");
          }

          const shelfCurrentLoansJson = await shelfCurrentLoansResponse.json();
          setShelfCurrentLoans(shelfCurrentLoansJson);
        } catch (error:any) {
          // Handle error fetching shelf current loans
          setHttpError(error.message);
        } finally {
          setIsLoadingCurrentLoans(false);
        }
      }
    };

    // Call fetchShelfCurrentLoans function
    fetchShelfCurrentLoans();
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  // Function to handle returning a book
  async function returnBook(bookId: number) {
    if (authState && authState.isAuthenticated) {
      const url = `${process.env.REACT_APP_API}/books/secure/return?bookId=${bookId}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-type": "application/json",
        },
      };

      try {
        const returnBookResponse = await fetch(url, requestOptions);

        if (!returnBookResponse.ok) {
          throw new Error("Something went wrong!");
        }

        setCheckout(!checkout);
      } catch (error:any) {
        // Handle error in returning a book
        setHttpError(error.message);
      }
    }
  }

  // Function to handle renewing a loan
  async function renewLoan(bookId: number) {
    if (authState && authState.isAuthenticated) {
      const url = `${process.env.REACT_APP_API}/books/secure/renew/loan?bookId=${bookId}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-type": "application/json",
        },
      };

      try {
        const renewLoanResponse = await fetch(url, requestOptions);

        if (!renewLoanResponse.ok) {
          throw new Error("Something went wrong!");
        }

        setCheckout(!checkout);
      } catch (error:any) {
        // Handle error in renewing a loan
        setHttpError(error.message);
      }
    }
  }

  // Render loading spinner while fetching shelf current loans
  if (isLoadingCurrentLoans) {
    return <SpinnerLoading />;
  }

  // Render error message if an HTTP error occurs
  if (httpError) {
    return (
      <div className="container mt-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop */}

      <div className="d-none d-lg-block mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5>Current Loans:</h5>

            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {shelfCurrentLoan.book?.img ? (
                      <img
                        src={shelfCurrentLoan.book.img}
                        width="226"
                        height="349"
                        alt="Book"
                      />
                    ) : (
                      <img
                        src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                        width="226"
                        height="349"
                        alt="book"
                      />
                    )}
                  </div>

                  <div className="col-3 col-md-3 d-flex card container">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loans Options</h4>
                        {shelfCurrentLoan.dayLeft > 0 && (
                          <p className="text-secondary">
                            Due in {shelfCurrentLoan.dayLeft} days.
                          </p>
                        )}

                        {shelfCurrentLoan.dayLeft === 0 && (
                          <p className="text-success">Due Today.</p>
                        )}

                        {shelfCurrentLoan.dayLeft < 0 && (
                          <p className="text-danger">
                            Past due by {shelfCurrentLoan.dayLeft} days.
                          </p>
                        )}

                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                          >
                            Manage Loans
                          </button>

                          <Link
                            to="/search"
                            className="list-group-item list-group-itme-action"
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>

                      <hr />
                      <p className="mt-3">
                        help other to find their adventure by reviewing your
                        loan.
                      </p>

                      <Link
                        className="btn btn-primary"
                        to={`checkout/${shelfCurrentLoan.book.id}`}
                      >
                        Leave a review?
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                {/* LoansModal component for desktop */}
                <LoansModal
                  shelfCurrentLoans={shelfCurrentLoan}
                  mobile={false}
                  returnBook={returnBook}
                  renewLoan={renewLoan}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Current no loans.</h3>

            <Link to="/search" className="btn btn-primary">
              Search for a new book
            </Link>
          </>
        )}
      </div>

      {/* Mobile */}

      <div className="d-lg-none mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className="mb-3">Current Loans:</h5>

            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {shelfCurrentLoan.book?.img ? (
                    <img
                      src={shelfCurrentLoan.book.img}
                      width="226"
                      height="349"
                      alt="Book"
                    />
                  ) : (
                    <img
                      src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                      width="226"
                      height="349"
                      alt="book"
                    />
                  )}
                </div>

                <div className="card d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Loans Options</h4>
                      {shelfCurrentLoan.dayLeft > 0 && (
                        <p className="text-secondary">
                          Due in {shelfCurrentLoan.dayLeft} days.
                        </p>
                      )}

                      {shelfCurrentLoan.dayLeft === 0 && (
                        <p className="text-success">Due Today.</p>
                      )}

                      {shelfCurrentLoan.dayLeft < 0 && (
                        <p className="text-danger">
                          Past due by {shelfCurrentLoan.dayLeft} days.
                        </p>
                      )}

                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                        >
                          Manage Loans
                        </button>

                        <Link
                          to="/search"
                          className="list-group-item list-group-itme-action"
                        >
                          Search more books?
                        </Link>
                      </div>
                    </div>

                    <hr />
                    <p className="mt-3">
                      help other to find their adventure by reviewing your loan.
                    </p>

                    <Link
                      className="btn btn-primary"
                      to={`checkout/${shelfCurrentLoan.book.id}`}
                    >
                      Leave a review?
                    </Link>
                  </div>
                </div>
                <hr />
                {/* LoansModal component for mobile */}
                <LoansModal
                  shelfCurrentLoans={shelfCurrentLoan}
                  mobile={true}
                  returnBook={returnBook}
                  renewLoan={renewLoan}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Current no loans.</h3>

            <Link to="/search" className="btn btn-primary">
              Search for a new book
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
