import { Link } from "react-router-dom";

// Define a functional component named Footer
export const Footer = () => {
    return (
      <div className="main-color">
        <footer className="container d-flex flex-wrap justify-content-between align-items-center py-5 main-color">
          {/* Copyright information */}
          <p className="col-md-4 mb-0 tc">© Example Library App, Inc</p>
  
          {/* Navigation links */}
          <ul className="nav navbar-dark col-md-4 justify-content-end">
            <li className="nav-item">
              <Link to="/home" className="nav-link px-2 tc">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link px-2 tc">
                Search Books
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
  