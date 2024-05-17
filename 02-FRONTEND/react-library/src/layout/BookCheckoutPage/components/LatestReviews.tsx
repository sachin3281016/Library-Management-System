import { Link } from "react-router-dom";
import ReviewModel from "../../../models/ReviewModel";
import { Review } from "./Review";

// LatestReviews component
export const LatestReviews: React.FC<{
  reviews: ReviewModel[];
  bookId: number | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div className={props.mobile ? "mt-3" : "row mt-5"}>
      {/* Title section */}
      <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
        <h2>Latest Reviews: </h2>
      </div>

      {/* Reviews section */}
      <div className="col-sm-10 col-md-10">
        {props.reviews.length > 0 ? (
          <>
            {/* Display up to 3 latest reviews */}
            {props.reviews?.slice(0, 3).map((review) => (
              <Review review={review} key={review.id} />
            ))}

            {/* Link to view all reviews */}
            <div className="m-3">
              <Link
                to={`/reviewlist/${props.bookId}`}
                className="btn main-color btn-md"
                type="button"
              >
                Reach all reviews
              </Link>
            </div>
          </>
        ) : (
          // Display message when there are no reviews
          <div className="m-3">
            <p className="lead">
              Currently there are no reviews for this book.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestReviews;
