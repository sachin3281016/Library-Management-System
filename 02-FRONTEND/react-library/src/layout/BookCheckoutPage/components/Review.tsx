import ReviewModel from "../../../models/ReviewModel";
import { StarReview } from "../../Utils/StarReview";

// Review component
export const Review: React.FC<{ review: ReviewModel }> = (props) => {
  // Convert review date to a readable format
  const date = new Date(props.review.date);
  const longMonth = date.toLocaleDateString("en-us", { month: "long" });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();

  const dateRender = longMonth + " " + dateDay + " " + dateYear;

  return (
    <div>
      {/* Review details section */}
      <div className="col-sm-8 col-md-8">
        <h5>{props.review.userEmail}</h5>

        {/* Date and star rating section */}
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            {/* Display star rating using StarReview component */}
            <StarReview size={16} rating={props.review.rating} />
          </div>
        </div>

        {/* Review description section */}
        <div className="mt-2">
          <p className="lead">{props.review.reviewDescription}</p>
        </div>
      </div>

      {/* Horizontal line for separation between reviews */}
      <hr />
    </div>
  );
};

export default Review;
