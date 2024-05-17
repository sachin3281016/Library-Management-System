// Define a class named BookModel
class BookModel {
    // Properties of the BookModel class
    id: number;               // Unique identifier for the book
    title: string;            // Title of the book
    author?: string;          // Author of the book (optional)
    description?: string;     // Description of the book (optional)
    copies?: number;          // Total copies of the book (optional)
    copiesAvailable?: number; // Number of copies available (optional)
    category?: string;        // Category of the book (optional)
    img?: string;             // URL for the book cover image (optional)
  
    // Constructor to initialize the properties of the BookModel
    constructor(
      id: number,
      title: string,
      author: string,
      description: string,
      copies: number,
      copiesAvailable: number,
      category: string,
      img: string
    ) {
      // Initialize the properties of the BookModel with provided values
      this.id = id;
      this.title = title;
      this.author = author;
      this.description = description;
      this.copies = copies;
      this.copiesAvailable = copiesAvailable;
      this.category = category;
      this.img = img;
    }
  }
  
  // Export the BookModel class to make it available for other modules
  export default BookModel;
  