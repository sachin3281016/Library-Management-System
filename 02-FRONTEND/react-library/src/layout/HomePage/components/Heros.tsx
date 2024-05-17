import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

// Define a functional component named Heros
export const Heros = () => {
  const { authState } = useOktaAuth();
  return (
    <div>
      {/* Desktop Heros */}
      <div className="d-none d-lg-block">
        {/* First Row */}
        <div className="row g-0 mt-5">
          {/* Left Column */}
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"> </div>
          </div>
          {/* Right Column */}
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                Whether it is to learn a new skill or grow within one, we will
                be able to provide the top content for you!
              </p>
              {authState?.isAuthenticated ? (
                // Render if the user is authenticated
                <Link
                  to="/search"
                  className="btn btn-lg main-color tc"
                  type="button"
                >
                  Explore top books
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
        </div>

        {/* Second Row */}
        <div className="row g-0">
          {/* Left Column */}
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide the most accurate book selection
                possible for our Luv 2 Read Students! We are diligent about our
                book selection, and our books are always our top priority.
              </p>
            </div>
          </div>
          {/* Right Column */}
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"> </div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          {/* First Section */}
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                Whether it is to learn a new skill or grow within one, we will
                be able to provide the top content for you!
              </p>
              {authState?.isAuthenticated ? (
                // Render if the user is authenticated
                <Link
                  to="/search"
                  className="btn btn-lg main-color tc"
                  type="button"
                >
                  Explore top books
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

          {/* Second Section */}
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide the most accurate book selection
                possible for our Luv 2 Read Students! We are diligent about our
                book selection, and our books are always our top priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
