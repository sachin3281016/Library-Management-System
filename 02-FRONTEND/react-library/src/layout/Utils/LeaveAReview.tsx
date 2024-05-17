import { useState } from "react";
import { StarReview } from "./StarReview";

export const LeaveAReview: React.FC<{ submitReview: any }> = (props) => {
  const [startInput, setStarInput] = useState(0);
  const [displayInput, setDisplayInput] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");

  function starValue(value: number) {
    setDisplayInput(true);
    setStarInput(value);
    
  }

  return (
    <div className="dropdown" style={{ cursor: "pointer" }}>
      <h5
        className="dropdown-toggle"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
      >
        Leave a review?
      </h5>

      <ul
        id="submitReviewRating"
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
      >
        <li>
          <button onClick={() => starValue(0)} className="dropdown-item">
            0.0 star
          </button>
        </li>

        <li>
          {" "}
          <button onClick={() => starValue(0.5)} className="dropdown-item">
            0.5 star
          </button>
        </li>
        <li>
          {" "}
          <button onClick={() => starValue(1)} className="dropdown-item">
            1.0 star
          </button>
        </li>

        <li>
          {" "}
          <button onClick={() => starValue(1.5)} className="dropdown-item">
            1.5 star
          </button>
        </li>
        <li>
          {" "}
          <button onClick={() => starValue(2)} className="dropdown-item">
            2.0 star
          </button>
        </li>
        <li>
          {" "}
          <button onClick={() => starValue(2.5)} className="dropdown-item">
            2.5 star
          </button>{" "}
        </li>
        <button onClick={() => starValue(3)} className="dropdown-item">
          3.0 star
        </button>
        <li>
          {" "}
          <button onClick={() => starValue(3.5)} className="dropdown-item">
            3.5 star
          </button>{" "}
        </li>
        <li>
          {" "}
          <button onClick={() => starValue(4)} className="dropdown-item">
            4.0 star
          </button>
        </li>
        <li>
          {" "}
          <button onClick={() => starValue(4.5)} className="dropdown-item">
            4.5 star
          </button>
        </li>
        <li>
          {" "}
          <button onClick={() => starValue(5)} className="dropdown-item">
            5.0star
          </button>
        </li>
      </ul>
      <StarReview rating={startInput} size={32} />

      {displayInput && (
        <form method="POST"  onSubmit={(event)=>{
          event.preventDefault();
          props.submitReview(startInput, reviewDescription)}}>
          <hr />
          <div className="mb-3">
            <label  className="form-label">
              Description
            </label>
            <textarea 
              name="description"
              id="submitReviewDescription"
              rows={3}
              placeholder="Optional"
              className="form-control"
              onChange={(e) => setReviewDescription(e.target.value)}
            ></textarea>
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};
