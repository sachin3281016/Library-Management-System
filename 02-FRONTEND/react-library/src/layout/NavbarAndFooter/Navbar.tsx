import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

// Define a functional component named Navbar
export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }
  const handleLogout = async () => oktaAuth.signOut();

  console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        {/* Brand */}
        <span className="navbar-brand">Luv 2 Read</span>

        {/* Toggle button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* Home link */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>

            {/* Search Books link */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search Books
              </NavLink>
            </li>
            {authState.isAuthenticated &&<li className="nav-item">
              <NavLink className="nav-link" to="/shelf">
                Shelf
              </NavLink>
            </li>}

            {authState.isAuthenticated && authState.accessToken?.claims.userType==='admin' &&<li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>}
              {authState.isAuthenticated  &&<li className="nav-item">
              <NavLink className="nav-link" to="/fees">
                Pay fees
              </NavLink>
            </li>}
          </ul>

          {/* Sign in button */}
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? (
              // Render if the user is not authenticated
              <li className="nav-item m-1">
                <NavLink
                  type="button"
                  className="btn btn-outline-light"
                  to="/login"
                >
                  Sign in
                </NavLink>
              </li>
            ) : (
              // Render if the user is authenticated
              <li className="nav-item m-1">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
