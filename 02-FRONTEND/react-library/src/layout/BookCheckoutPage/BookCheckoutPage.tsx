import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReview } from "../Utils/StarReview";
import { CheckoutAndReviewBox } from "./components/CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./components/LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

// BookCheckoutPage component
export const BookCheckoutPage = () => {
  // State variables using the useState hook
  const [book, setBook] = useState<BookModel>(); // Array to store book data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [httpError, setHttpError] = useState(null); // HTTP error state

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoadingReview, setIsLoadingreview] = useState(true);
  const [totalStars, setTotalStars] = useState(0);

  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurentLoansCount, setIsLoadingCurentLoansCount] =
    useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(false);

  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(false);

  const [displayError, setDisplayError] = useState(false);
  const { authState } = useOktaAuth();

  const bookId = window.location.pathname.split("/")[2];

  // useEffect hook to fetch books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      // Construct the API endpoint URL using the bookId parameter
      const baseUrl: string = `${process.env.REACT_APP_API}/books/${bookId}`;

      // Fetch data from the provided API endpoint
      const response = await fetch(baseUrl);

      // Check if the response is successful (HTTP status code 2xx)
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Parse the JSON response
      const responseJson = await response.json();

      // Create a BookModel object from the fetched data
      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      // Set the state variables with the loaded books and update loading state
      setBook(loadedBook);
      setIsLoading(false);
    };

    // Call the fetchBooks function and handle errors
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message); // Fix: should be error.message instead of error.mressage
    });
  }, [isCheckedOut, isReviewLeft]); // Dependency array is empty to run the effect only once when the component mounts

  // useEffect hook to fetch reviews when the component mounts
  useEffect(() => {
    const fetchReview = async () => {
      const reviewUrl = `${process.env.REACT_APP_API}/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJsonReviews = await responseReviews.json();
      const responseData = responseJsonReviews._embedded.reviews;

      let weightedStarReviews: number = 0;
      const loadedReviews: ReviewModel[] = responseData.map(
        (reviewData: any) => {
          const { id, userEmail, bookId, date, reviewDescription, rating } =
            reviewData;

          // Calculating the sum of ratings
          weightedStarReviews += rating;

          // Returning the mapped ReviewModel
          return {
            id,
            userEmail,
            bookId,
            date,
            reviewDescription,
            rating,
          };
        }
      );

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }
      setReviews(loadedReviews);
      setIsLoadingreview(false);
    };
    fetchReview().catch((error: any) => {
      setIsLoadingreview(false);
      setHttpError(error.message);
    });
  }, [isReviewLeft]);

  // useEffect hook to fetch user's review for the current book
  useEffect(() => {
    const fetchUserReviewBook = async () => {
      if (authState && authState.isAuthenticated) {
        setIsLoadingUserReview(true);
        const url = `${process.env.REACT_APP_API}/reviews/secure/user/book?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);

        if (!userReview.ok) {
          return new Error("Something went wrong!");
        }

        const userReviewRes = await userReview.json();

        setIsReviewLeft(userReviewRes);
      }
      setIsLoadingUserReview(false);
    };

    fetchUserReviewBook().catch((error: any) => {
      setIsLoadingUserReview(false);
      setHttpError(error.message);
    });
  }, [isReviewLeft]);

  // useEffect hook to fetch the count of current loans for the user
  useEffect(() => {
    const fetchCurrentLoansCount = async () => {
      if (authState && authState?.isAuthenticated) {
        setIsLoadingCurentLoansCount(true);
        const url = `${process.env.REACT_APP_API}/books/secure/currentloans/count`;

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };

        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          return new Error("Something went wrong!");
        }
        const currentLoansCountJson = await currentLoansCountResponse.json();
        setIsLoadingCurentLoansCount(false);
        setCurrentLoansCount(currentLoansCountJson);
      }
    };
    fetchCurrentLoansCount().catch((error: any) => {
      setIsLoadingCurentLoansCount(false);
      setHttpError(error.message);
    });
  }, [authState, isCheckedOut]);

  // useEffect hook to check if the user has checked out the current book
  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (authState && authState?.isAuthenticated) {
        setIsLoadingBookCheckedOut(true);
        const url = `${process.env.REACT_APP_API}/books/secure/ischeckedout/byuser?bookId=${bookId}`;

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };

        const bookCheckedOutResponse = await fetch(url, requestOptions);
        if (!bookCheckedOutResponse.ok) {
          return new Error("Something went wrong!");
        }
        const bookCheckedOutJson = await bookCheckedOutResponse.json();
        setIsLoadingBookCheckedOut(false);
        setIsCheckedOut(bookCheckedOutJson);
      }
    };
    fetchUserCheckedOutBook().catch((error: any) => {
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    });
  }, [authState, isCheckedOut]);

  // Render loading spinner while data is being fetched
  if (
    isLoading ||
    isLoadingReview ||
    isLoadingCurentLoansCount ||
    isLoadingBookCheckedOut ||
    isLoadingUserReview
  ) {
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

  // Function to handle book checkout
  async function checkoutBook() {
    const url = `${process.env.REACT_APP_API}/books/secure/checkout?bookId=${bookId}`;

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      },
    };

    const checkoutBookResponse = await fetch(url, requestOptions);
    if (!checkoutBookResponse.ok) {
      setDisplayError(true);
      return new Error("Something went wrong!");
    }
    setDisplayError(false);
    setIsCheckedOut(true);
  }

  // Function to handle submission of a review
  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book?.id;
    }
    const reviewRequestModel = new ReviewRequestModel(
      bookId,
      reviewDescription,
      starInput
    );

    const url = `${process.env.REACT_APP_API}/reviews/secure`;

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };

    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      return new Error("Something went wrong!");
    }
    setIsReviewLeft(true);
  }

  // Render book details, ratings, and checkout/review box components
  return (
    <div>
      {/* Large screen layout */}
      <div className="container d-none d-lg-block">
        {displayError && (
          <div className="alert alert-danger mt-3">
            Please pay outstanding fees and/or return late book(s)
          </div>
        )}
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2 ">
            {/* Display book image */}
            {book?.img ? (
              <img src={book?.img} alt="book" width="226" height="349" />
            ) : (
              <img
                src={require("../../Images/BooksImages/book-luv2code-1000.png")}
                alt="book"
                width="226"
                height="349"
              />
            )}
          </div>
          <div className="col-md-4 col-4 container">
            <div className="ml-2">
              {/* Display book details */}
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              {/* Display star ratings */}
              <StarReview rating={totalStars} size={32} />
            </div>
          </div>
          {/* Render checkout and review box */}
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentLoansCount={currentLoansCount}
            isCheckedOut={isCheckedOut}
            isAuthenticated={authState?.isAuthenticated}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <hr />
        {/* Render latest reviews component */}
        <LatestReviews
          reviews={reviews}
          bookId={Number(bookId)}
          mobile={false}
        />
        <hr />
      </div>

      {/* Small screen layout */}
      <div className="d-lg-none container mt-4">
        {displayError && (
          <div className="alert alert-danger mt-3">
            Please pay outstanding fees and/or return late book(s)
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center">
          {/* Display book image */}
          {book?.img ? (
            <img src={book?.img} alt="book" width="226" height="349" />
          ) : (
            <img
              src={require("../../Images/BooksImages/book-luv2code-1000.png")}
              alt="book"
              width="226"
              height="349"
            />
          )}
        </div>
        <div className="mt-4"></div>
        <div className="ml-2">
          {/* Display book details */}
          <h2>{book?.title}</h2>
          <h5 className="text-primary">{book?.author}</h5>
          <p className="lead">{book?.description}</p>
          {/* Display star ratings */}
          <StarReview rating={totalStars} size={32} />
        </div>
        {/* Render checkout and review box */}
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          currentLoansCount={currentLoansCount}
          isCheckedOut={isCheckedOut}
          isAuthenticated={authState?.isAuthenticated}
          checkoutBook={checkoutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        {/* Render latest reviews component */}
        <LatestReviews
          reviews={reviews}
          bookId={Number(bookId)}
          mobile={true}
        />
        <hr />
      </div>
    </div>
  );
};
