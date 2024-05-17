import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";
import { ChangeQuantityOfBooks } from "./components/ChangeQuantityOfBooks";

export const ManageLibraryPage = () => {
  // State variables to manage tab clicks
  const [messageClick, setMessageClick] = useState(false);
  const [changeQuantityOfBookClick, setChangeQuantityOfBookClick] =
    useState(false);

  // Access authentication state using Okta
  const { authState } = useOktaAuth();

  // Redirect to home if user type is not defined
  if (authState?.accessToken?.claims.userType === undefined) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Manage Library</h3>
        {/* Tab navigation */}
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {/* Button for Add new book tab */}
            <button
              onClick={(event) => {
                event.preventDefault();
                setChangeQuantityOfBookClick(false);
                setMessageClick(false);
              }}
              type="button"
              className="nav-link active"
              id="nav-add-book-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-add-book"
              aria-controls="nav-add-book"
              aria-selected="true"
            >
              Add new book
            </button>
            {/* Button for Change Quantity tab */}
            <button
              onClick={(event) => {
                event.preventDefault();
                setChangeQuantityOfBookClick(true);
                setMessageClick(false);
              }}
              type="button"
              className="nav-link "
              id="nav-quantity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-quantity"
              aria-controls="nav-quantity"
              aria-selected="false"
            >
              Change Quantity
            </button>
            {/* Button for Messages tab */}
            <button
              onClick={(event) => {
                event.preventDefault();
                setChangeQuantityOfBookClick(false);
                setMessageClick(true);
              }}
              type="button"
              className="nav-link"
              id="nav-message-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-message"
              aria-controls="nav-message"
              aria-selected="false"
            >
              Messages
            </button>
          </div>
        </nav>

        {/* Tab content */}
        <div className="tab-content" id="nav-tabContent">
          {/* Add new book tab content */}
          <div
            className="tab-pane fade show active"
            id="nav-add-book"
            aria-labelledby="nav-add-book-tab"
            role="tabpanel"
          >
            {!changeQuantityOfBookClick && !messageClick ? (
              <AddNewBook />
            ) : null}
          </div>

          {/* Change Quantity tab content */}
          <div
            className="tab-pane fade "
            id="nav-quantity"
            aria-labelledby="nav-quantity-tab"
            role="tabpanel"
          >
            {changeQuantityOfBookClick && !messageClick ? (
              <ChangeQuantityOfBooks />
            ) : null}
          </div>

          {/* Messages tab content */}
          <div
            className="tab-pane fade "
            id="nav-message"
            aria-labelledby="nav-message-tab"
            role="tabpanel"
          >
            {!changeQuantityOfBookClick && messageClick ? (
              <AdminMessages />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
