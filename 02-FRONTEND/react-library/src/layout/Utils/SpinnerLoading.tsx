// Define a functional component named SpinnerLoading
export const SpinnerLoading = () => {
    return (
      // Container with flex properties to center the spinner
      <div className="container m-5 d-flex justify-content-center align-items-center">
        {/* Spinner element with a primary color and a role of 'status' */}
        <div className="spinner-border text-primary" role="status">
          {/* Visually hidden text for screen readers */}
          <div className="visually-hidden">
            Loading...
          </div>
        </div>
      </div>
    );
  }
  