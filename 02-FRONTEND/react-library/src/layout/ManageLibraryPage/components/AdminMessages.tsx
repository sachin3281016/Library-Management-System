import { useEffect, useState } from "react";
import MessageModal from "../../../models/MessageModel";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import AdminMessageRequest from "../../../models/AdminMessageRequest";

// AdminMessages component
export const AdminMessages = () => {
  // State variables using the useState hook
  const [messages, setMessages] = useState<MessageModal[]>([]); // Array to store message data
  const [isLoadingMessages, setIsLoadingMessages] = useState(false); // Loading state
  const [httpError, setHttpError] = useState(null); // HTTP error state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [messagesPerPage] = useState(5); // Number of messages to display per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const { authState } = useOktaAuth();
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [messageId, setMessageId] = useState();

  // useEffect hook to fetch messages when the component mounts or when currentPage changes
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      if (authState && authState.isAuthenticated) {
        const url = `${
          process.env.REACT_APP_API
        }/messages/search/findByClosed?closed=false&page=${
          currentPage - 1
        }&size=${messagesPerPage}`;
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
  }, [currentPage, authState, btnSubmit]);

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

  // Function to handle pagination
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Function to submit a response to a question
  async function submitResponseToQuestion(id: any, response: string) {
    const url = `${process.env.REACT_APP_API}/messages/secure/admin/message`;

    if (
      authState &&
      authState.isAuthenticated &&
      response.trim() !== "" &&
      id !== null
    ) {
      const adminMessageRequest: AdminMessageRequest = new AdminMessageRequest(
        id,
        response
      );

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminMessageRequest),
      };

      const messageAdminRequestModelResponse = await fetch(url, requestOptions);

      if (!messageAdminRequestModelResponse.ok) {
        throw new Error("Something went wrong!");
      }

      setDisplayWarning(false);
      setBtnSubmit(!btnSubmit);
    } else {
      setMessageId(id);
      setDisplayWarning(true);
    }
  }

  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Pending Q/A:</h5>
          {messages.map((message) => (
            <AdminMessage
              message={message}
              key={message.id}
              messageId={messageId}
              submitResponseToQuestion={submitResponseToQuestion}
              displayWarning={displayWarning}
            />
          ))}
        </>
      ) : (
        <h5>No pending Q/A</h5>
      )}

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
