import { useState } from "react";
import AddBookRequest from "../../../models/AddBookRequest";
import { useOktaAuth } from "@okta/okta-react";

// AddNewBook component
export const AddNewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);
  const [category, setCategory] = useState("Category");
  const [selectedImg, setSelectedtImg] = useState<any>(null);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displsySuccess, setDisplaySuccess] = useState(false);
  const { authState } = useOktaAuth();

  // Function to handle category selection
  function categoryField(value: string) {
    setCategory(value);
  }

  // Function to convert image to base64 format
  async function base64ConversitonForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  // Function to get base64 representation of an image
  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedtImg(reader.result);
    };

    reader.onerror = function (error) {
      console.log("Error :-) " + error);
    };
  }

  // Function to submit a new book
  const submitNewBook = async () => {
    const url = `${process.env.REACT_APP_API}/admin/secure/add/book`;

    // Check if the user is authenticated and all required fields are filled
    if (
      authState &&
      authState.isAuthenticated &&
      title.trim() !== "" &&
      author.trim() !== "" &&
      description.trim() !== "" &&
      copies >= 0 &&
      category !== "Category"
    ) {
      // Create a new AddBookRequest object
      const book: AddBookRequest = new AddBookRequest(
        title,
        author,
        description,
        copies,
        category
      );
      book.img = selectedImg;

      // Set up the request options
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      };

      // Send the request to add a new book
      const addBookResponse = await fetch(url, requestOptions);

      // Check if the request was successful
      if (!addBookResponse.ok) {
        return new Error("Something went wrong");
      }

      // Reset form fields and display success message
      setTitle("");
      setAuthor("");
      setDescription("");
      setCopies(0);
      setCategory("Category");
      setSelectedtImg(null);
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      // Display warning if any required fields are missing
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  };

  // Render the component
  return (
    <div className="container mt-5 mb-5">
      {/* Display success message */}
      {displsySuccess && (
        <div className="alert alert-success" role="alert">
          Book added successfully.
        </div>
      )}

      {/* Display warning message */}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out.
        </div>
      )}

      <div className="card">
        <div className="card-header">Add New Book</div>
        <div className="card-body">
          {/* Form for adding a new book */}
          <form
            method="POST"
            onSubmit={(event) => {
              event.preventDefault();
              submitNewBook();
            }}
          >
            {/* Form fields */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  placeholder="Author"
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Category</label>
                {/* Dropdown for selecting category */}
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-target="#addNewBookId"
                >
                  {category}
                </button>
                <ul
                  id="addNewBookId"
                  aria-labelledby="dropdownMenuButton1"
                  className="dropdown-menu"
                >
                  <li>
                    <a
                      onClick={() => categoryField("FE")}
                      className="dropdown-item"
                    >
                      Front End
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("BE")}
                      className="dropdown-item"
                    >
                      Back End
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("Data")}
                      className="dropdown-item"
                    >
                      Data
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("DevOps")}
                      className="dropdown-item"
                    >
                      Dev Ops
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                id="description"
                rows={3}
                placeholder="Description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              ></textarea>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Copies</label>
              <input
                type="number"
                name="Copies"
                onChange={(e) => setCopies(Number(e.target.value))}
                className="form-control"
                placeholder="Copies"
                value={copies}
                required
              />
            </div>

            {/* Input for selecting an image */}
            <input
              type="file"
              required
              id="file"
              onChange={(e) => {
                e.preventDefault();
                base64ConversitonForImages(e);
              }}
            />

            {/* Submit button */}
            <div>
              <button className="btn btn-primary mt-3" type="submit">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
