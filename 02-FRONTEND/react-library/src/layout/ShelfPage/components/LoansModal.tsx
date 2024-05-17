// React functional component for displaying loan options in a modal

import ShelfCurrentLoansModel from "../../../models/ShelfCurrentLoansModel";

// Props include shelfCurrentLoans (details about the current loan), mobile (boolean for mobile view), returnBook (function to return a book), renewLoan (function to renew a loan)
export const LoansModal: React.FC<{
  shelfCurrentLoans: ShelfCurrentLoansModel;
  mobile: boolean;
  returnBook: any;
  renewLoan: any;
}> = (props) => {
  return (
    // Modal structure with conditional IDs based on mobile view
    <div
      className="modal fade"
      id={
        props.mobile
          ? `mobilemodal${props.shelfCurrentLoans.book.id}`
          : `modal${props.shelfCurrentLoans.book.id}`
      }
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      key={props.shelfCurrentLoans.book.id}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal header */}
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Loan Options
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal body */}
          <div className="modal-body">
            <div className="container">
              <div className="mt-3">
                {/* Book details */}
                <div className="row">
                  <div className="col-2">
                    {props.shelfCurrentLoans.book ? (
                      <img
                        src={props.shelfCurrentLoans.book.img}
                        width="56"
                        height="87"
                        alt="Book"
                      />
                    ) : (
                      <img
                        src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                        width="56"
                        height="87"
                        alt="book"
                      />
                    )}
                  </div>
                  <div className="col-10">
                    <h6>{props.shelfCurrentLoans.book.author} </h6>
                    <h4>{props.shelfCurrentLoans.book.title}</h4>
                  </div>
                </div>

                <hr />

                {/* Display due date information */}
                {props.shelfCurrentLoans.dayLeft > 0 && (
                  <p className="text-secondary">
                    Due in {props.shelfCurrentLoans.dayLeft} days.
                  </p>
                )}

                {props.shelfCurrentLoans.dayLeft === 0 && (
                  <p className="text-success">Due Today.</p>
                )}

                {props.shelfCurrentLoans.dayLeft < 0 && (
                  <p className="text-danger">
                    Past due by {props.shelfCurrentLoans.dayLeft} days.
                  </p>
                )}

                {/* List of loan options */}
                <div className="list-group mt-3">
                  {/* Return Book button */}
                  <button
                    onClick={() => {
                      props.returnBook(props.shelfCurrentLoans.book.id);
                    }}
                    data-bs-dismiss="modal"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    Return Book
                  </button>

                  {/* Renew Loan button with conditional styling and functionality */}
                  <button
                    data-bs-dismiss="modal"
                    className={
                      props.shelfCurrentLoans.dayLeft < 0
                        ? "list-group-item list-group-item-action inactiveLink"
                        : "list-group-item list-group-item-action"
                    }
                    onClick={
                      props.shelfCurrentLoans.dayLeft < 0
                        ? (event) => event.preventDefault()
                        : (event) => {
                            event.preventDefault();
                            props.renewLoan(props.shelfCurrentLoans.book.id);
                          }
                    }
                  >
                    {props.shelfCurrentLoans.dayLeft < 0
                      ? "Late dues cannot be renewed"
                      : "Renew loan for 7 days"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal footer with close button */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
