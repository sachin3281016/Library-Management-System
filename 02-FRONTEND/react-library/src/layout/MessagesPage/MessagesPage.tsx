import { useState } from "react";
import { PostNewMessage } from "./components/PostNewMessage";
import { Messages } from "./components/Messages";

export const MessagesPage = () => {
  // State variable to track whether the user is viewing responses/pending questions
  const [messageClick, setMessageClick] = useState(false);

  return (
    <div className="container">
      <div className="mt-3 mb-3">
        {/* Navigation tabs for submitting questions and viewing responses/pending questions */}
        <nav className="nav nav-tabs" id="nab-tab" role="tablist">
          {/* Tab for submitting questions */}
          <button
            className={`nav-link ${!messageClick ? "active" : ""}`}
            onClick={() => setMessageClick(false)}
            id="nav-send-message-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-send-message"
            role="tab"
            aria-controls="nav-send-message"
            aria-selected={!messageClick}
            type="button"
          >
            Submit Question
          </button>

          {/* Tab for viewing responses/pending questions */}
          <button
            className={`nav-link ${messageClick ? "active" : ""}`}
            onClick={() => setMessageClick(true)}
            id="nav-message-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-message"
            role="tab"
            aria-controls="nav-message"
            aria-selected={messageClick}
            type="button"
          >
            Q/A Response/Pending
          </button>
        </nav>

        {/* Content panes for the tabs */}
        <div className="tab-content" id="nav-tabContent">
          {/* Pane for submitting questions */}
          <div
            className={`tab-pane fade show ${!messageClick ? "active" : ""}`}
            id="nav-send-message"
            aria-labelledby="nav-send-message-tab"
            role="tabpanel"
          >
            <PostNewMessage />
          </div>

          {/* Pane for viewing responses/pending questions */}
          <div
            className={`tab-pane fade ${messageClick ? "show active" : ""}`}
            id="nav-message"
            aria-labelledby="nav-message-tab"
            role="tabpanel"
          >
            {messageClick ? <Messages /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
