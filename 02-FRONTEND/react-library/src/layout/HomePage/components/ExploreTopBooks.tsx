import { Link } from "react-router-dom";

// Define a functional component named ExploreTopBooks
export const ExploreTopBooks = () => {
    return (
      // Container with background color and padding
      <div className="p-5 mb-4 bg-dark header">
        {/* Inner container with white text, flex properties, and centered content */}
        <div className="conainter-fluid py-5 text-white d-flex justify-content-center align-item-center">
          <div>
            {/* Title with large font size and bold */}
            <h1 className="display-5 fw-bold">Find your next adventure</h1>
            
            {/* Subtitle with medium font size */}
            <p className="col-md-8 fs-4">Where would you like to go next?</p>
            
            {/* Button with large size, main color, and white text */}
            <Link type='button' className="btn btn-lg main-color tc" to={"/search"}>Explore top books</Link>
          </div>
        </div>
      </div>
    );
  }
  