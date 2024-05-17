import { useEffect, useState } from "react";
import MessageModal from "../../../models/MessageModel";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";

export const Messages = () => {
  // State variables to manage messages
  const [messages, setMessages] = useState<MessageModal[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // Access authentication state using Okta
  const { authState } = useOktaAuth();

  // useEffect hook to fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      if (authState && authState.isAuthenticated) {
        const url = `${
          process.env.REACT_APP_API
        }/messages/search/findByUserEmail?userEmail=${
          authState.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=${messagesPerPage}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const messagesResponse = await fetch(url, requestOptions);

        if (!messagesResponse.ok) {
          throw new Error("Something went wrong!");
        }

        // Parsing the JSON response
        const messagesResponseJson = await messagesResponse.json();

        // Extracting relevant information from the response
        setCurrentPage(messagesResponseJson.page.number + 1);
        setTotalPages(messagesResponseJson.page.totalPages);

        setMessages(messagesResponseJson._embedded.messages);
      }
      setIsLoadingMessages(false);
    };

    // Call the fetchMessages function and handle errors
    fetchMessages().catch((error: any) => {
      setIsLoadingMessages(false);
      setHttpError(error.message);
    });
  }, [currentPage, authState]);

  // Render loading spinner while data is being fetched
  if (isLoadingMessages) {
    return <SpinnerLoading />;
  }

  // Render error message if an HTTP error occurs
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  // Function to handle pagination button clicks
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Current Q/A:</h5>
          {messages.map((message) => (
            <div key={message.id}>
              <div className="card mt-2 p-2 rounded bg-body">
                {/* Message details */}
                <h5>
                  Case #{message.id} {message.title}
                </h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                {/* Display response or pending message */}
                <div>
                  <h5>Response</h5>
                  {message.response && message.adminEmail ? (
                    <>
                      <h6>{message.adminEmail}</h6>
                      <p>{message.response}</p>
                    </>
                  ) : (
                    <p>
                      <i>
                        Pending response from administration. Please be patient.
                      </i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h5>All questions you submit will be shown here</h5>
      )}

      {/* Pagination component */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};
