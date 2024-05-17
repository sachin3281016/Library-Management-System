import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";
import { LeaveAReview } from "../../Utils/LeaveAReview";

// CheckoutAndReviewBox component
export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  currentLoansCount: number;
  isCheckedOut: boolean;
  isAuthenticated: any;
  checkoutBook: any;
  isReviewLeft: boolean;
  submitReview: any;
}> = (props) => {
  // Function to render the checkout button based on user's authentication and book status
  function buttonRender() {
    if (props.isAuthenticated) {
      if (!props.isCheckedOut && props.currentLoansCount < 5) {
        return (
          <button
            className="btn btn-lg btn-success"
            onClick={() => props.checkoutBook()}
          >
            Checkout
          </button>
        );
      } else if (props.isCheckedOut) {
        return (
          <p>
            <b>Book checked out, Enjoy!</b>
          </p>
        );
      } else if (!props.isCheckedOut) {
        return <p className="text-danger">Too many books checked out.</p>;
      }
    }
    return (
      <Link to="/login" className="btn btn-lg btn-success">
        Sign in
      </Link>
    );
  }

  // Function to render the review section based on user's authentication and review status
  function reviewRender() {
    if (props.isAuthenticated && props.isReviewLeft) {
      return (
        <p>
          <b>Thank you for your review!</b>
        </p>
      );
    } else if (props.isAuthenticated && !props.isReviewLeft) {
      return <LeaveAReview submitReview={props.submitReview} />;
    }

    return (
      <div>
        <hr />
        <p>Sign in to be able to leave a review.</p>
      </div>
    );
  }

  return (
    <div
      className={
        props.mobile
          ? "card d-flex mt-4"
          : "card col-3 container d-flex mt-4 mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          {/* Display the number of books checked out */}
          <p>
            <b>{props.currentLoansCount}/5 </b>
            books checked out
          </p>

          <hr />

          {/* Determine whether the book is available or on waitlist */}
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}

          {/* Display the number of copies and available copies */}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.book?.copies} </b> copies
            </p>
            <p className="col-6 lead">
              <b>{props.book?.copiesAvailable} </b> available
            </p>
          </div>
        </div>

        {/* Link to sign-in page or render checkout button */}
        {buttonRender()}

        <hr />

        {/* Additional information */}
        <p className="mt-3">
          This number can be changed until placing order has been complete.
        </p>
        {reviewRender()}
      </div>
    </div>
  );
};
