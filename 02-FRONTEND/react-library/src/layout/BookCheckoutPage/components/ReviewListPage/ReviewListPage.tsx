import { useEffect, useState } from "react";
import ReviewModel from "../../../../models/ReviewModel";
import { Pagination } from "../../../Utils/Pagination";
import { Review } from "./../Review";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";

// Component for displaying a list of reviews for a book
export const ReviewListPage = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalAmoutOfReviews, setTotalAmountOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reviewsPerPage] = useState(5);

  // Extracting bookId from the URL
  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchReview = async () => {
      setIsLoading(true);

      // Constructing the URL to fetch reviews for the specific book and page
      const reviewUrl = `${
        process.env.REACT_APP_API
      }/reviews/search/findByBookId?bookId=${bookId}&page=${
        currentPage - 1
      }&size=${reviewsPerPage}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseReviewsJson = await responseReviews.json();

      // Extracting relevant information from the response
      setCurrentPage(responseReviewsJson.page.number + 1);
      setTotalAmountOfReviews(responseReviewsJson.page.totalElements);
      setTotalPages(responseReviewsJson.page.totalPages);
      const responseData = responseReviewsJson._embedded.reviews;

      const loadedReviews: ReviewModel[] = responseData.map(
        (reviewData: any) => {
          const { id, userEmail, bookId, date, reviewDescription, rating } =
            reviewData;

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

      setReviews(loadedReviews);
      setIsLoading(false);
    };

    // Fetching reviews and handling errors
    fetchReview().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [currentPage]);

  // Loading spinner while fetching data
  if (isLoading) {
    return <SpinnerLoading />;
  }

  // Displaying error message if HTTP error occurred
  if (httpError) {
    return (
      <div className="mt-4">
        <p>{httpError}</p>
      </div>
    );
  }

  // Calculating the index of the last and first review on the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  // Determining the last item on the current page
  let lastItem =
    reviewsPerPage * currentPage <= totalAmoutOfReviews
      ? reviewsPerPage * currentPage
      : totalAmoutOfReviews;

  // Function to handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container m-5">
      <div>
        <h3>
          Comments: <b>{reviews.length}</b>
        </h3>
      </div>

      <p>
        {indexOfFirstReview + 1} to {lastItem} of {totalAmoutOfReviews} items.
      </p>

      <div className="row">
        {/* Displaying each review */}
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>

      {/* Displaying pagination component if there are multiple pages */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          paginate={paginate}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default ReviewListPage;
