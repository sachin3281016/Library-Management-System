// React functional component for displaying shelf-related information
import { useState } from "react";
import { Loans } from "./components/Loans";
import { History } from "./components/History";

export const ShelfPage = () => {
  // State to track whether to display loans or history tab
  const [historyClick, setHistoryClick] = useState(false);

  return (
    <div className="container">
      <div className="mt-3">
        {/* Navigation tabs for Loans and History */}
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {/* Loans tab */}
            <button
              onClick={() => setHistoryClick(false)}
              className="nav-link active"
              id="nav-loans-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-loans"
              type="button"
              role="tab"
              aria-controls="nav-loans"
              aria-selected="true"
            >
              Loans
            </button>
            {/* History tab */}
            <button
              onClick={() => setHistoryClick(true)}
              className="nav-link"
              id="nav-history-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-history"
              type="button"
              role="tab"
              aria-controls="nav-history"
              aria-selected="false"
            >
              Your history
            </button>
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          {/* Loans tab content */}
          <div
            className="tab-pane fade show active"
            id="nav-loans"
            role="tabpanel"
            aria-labelledby="nav-loans-tab"
          >
            <Loans />
          </div>
          {/* History tab content */}
          <div
            className="tab-pane fade"
            id="nav-history"
            role="tabpanel"
            aria-labelledby="nav-history-tab"
          >
            {/* Display History component based on historyClick state */}
            {historyClick ? <History /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
