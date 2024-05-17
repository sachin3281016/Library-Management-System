import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

// Define a functional component named LibraryServices
export const LibraryServices = () => {
  const { authState } = useOktaAuth();
  return (
    <div className="container my-5">
      {/* Container with a row, padding, alignment, border, and shadow */}
      <div className="row p-4 align-items-center border shadow-lg">
        {/* Left Column */}
        <div className="col-lg-7 p-3">
          {/* Title with large font size and bold */}
          <h1 className="display-5 fw-bold">
            Can't find what you are looking for?
          </h1>

          {/* Lead paragraph */}
          <p className="lead">
            If you cannot find what you are looking for, send our library admins
            a personal message!
          </p>

          {/* Button with main color, large size, and white text */}
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
            {authState?.isAuthenticated ? (
              // Render if the user is authenticated
              <Link
                to="/messages"
                className="btn btn-lg main-color px-4 me-md-2 fw-bold tc"
              >
                Library services
              </Link>
            ) : (
              // Render if the user is not authenticated
              <Link
                type="button"
                to="/login"
                className="btn main-color btn-lg tc"
              >
                Sign up
              </Link>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
};
