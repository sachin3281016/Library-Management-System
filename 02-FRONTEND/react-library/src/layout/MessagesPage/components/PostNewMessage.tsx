import { useOktaAuth } from "@okta/okta-react";
import { FormEvent, useState } from "react";
import MessageModal from "../../../models/MessageModel";

export const PostNewMessage = () => {
  // State variables to manage form input, display success, and warning messages
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);

  // Access authentication state using Okta
  const { authState } = useOktaAuth();

  // Function to submit a new question
  async function submitNewQuestion(_event: FormEvent<HTMLFormElement>) {
    _event.preventDefault();

    const url = `${process.env.REACT_APP_API}/messages/secure/add/message`;

    if (
      authState?.isAuthenticated &&
      title.trim() !== "" &&
      question.trim() !== ""
    ) {
      // Create a MessageModal instance for the new question
      const messageRequestModel = new MessageModal(title, question);

      // Prepare the request options for the API call
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageRequestModel),
      };

      // Make the API call to submit the new question
      const submitNewQuestionResponse = await fetch(url, requestOptions);

      // Check if the request was successful
      if (!submitNewQuestionResponse.ok) {
        throw new Error("Something went wrong");
      }

      // Reset form inputs and display success message
      setDisplayWarning(false);
      setDisplaySuccess(true);
      setQuestion("");
      setTitle("");
    } else {
      // Display warning if any field is empty
      setDisplaySuccess(false);
      setDisplayWarning(true);
    }
  }

  return (
    <div className="card mt-3">
      {/* Display success message if a question is added successfully */}
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Question added successfully
        </div>
      )}

      {/* Form for submitting new questions */}
      <div className="card-header">Ask a question to Luv 2 Read admin</div>
      <div className="card-body">
        <form method="POST" onSubmit={(event) => submitNewQuestion(event)}>
          {/* Display warning if any field is empty */}
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              All fields must be filled out
            </div>
          )}

          {/* Input field for question title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Title"
              id="titleFormInput"
            />
          </div>

          {/* Textarea for the question content */}
          <div className="mb-3">
            <label className="form-label">Question</label>
            <textarea
              className="form-control"
              name="question"
              id="questionTextarea"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>

          {/* Submit button */}
          <div>
            <button className="btn btn-primary" type="submit">
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
