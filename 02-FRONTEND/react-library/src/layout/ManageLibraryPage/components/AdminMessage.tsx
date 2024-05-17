import { useState } from "react";
import MessageModal from "../../../models/MessageModel";

// AdminMessage component
export const AdminMessage: React.FC<{
  messageId: any;
  message: MessageModal;
  submitResponseToQuestion: any;
  displayWarning: boolean;
}> = (props) => {
  // State for the response
  const [response, setResoponse] = useState("");
  console.log(props.displayWarning);

  return (
    <div key={props.message.id}>
      {/* Card to display message details and response form */}
      <div className="card mt-3 mb-2 shadow rounded p-3 bg-body">
        {/* Display case number and title */}
        <h5>
          Case #{props.message.id} : {props.message.title}
        </h5>
        {/* Display user email */}
        <h6>{props.message.userEmail}</h6>
        {/* Display user's question */}
        <p>{props.message.question}</p>
        <hr />

        <div>
          {/* Response form */}
          <h5>Response:</h5>
          {/* Form for submitting a response */}
          <form
            method="PUT"
            onSubmit={(event) => {
              event.preventDefault();
              props.submitResponseToQuestion(props.message.id, response);
            }}
          >
            {/* Display warning if fields are not filled out */}
            {props.displayWarning && props.messageId === props.message.id && (
              <div className="alert alert-danger" role="alert">
                All fields must be filled out
              </div>
            )}

            {/* Textarea for entering the response */}
            <div className="mb-3 col-md-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="descritpionTextArea"
                id="descritpionTextArea"
                rows={3}
                onChange={(e) => setResoponse(e.target.value)}
                placeholder="Response"
                value={response}
              ></textarea>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary mt-3">
              Submit Response
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
