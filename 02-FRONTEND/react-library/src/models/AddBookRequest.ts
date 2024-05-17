// Class representing the request model for adding a book
class AddBookRequest {
    // Properties representing book details
    title: string;
    author: string;
    description: string;
    copies: number;
    category: string;
    img?: string; // Optional property for book image URL

    // Constructor to initialize the book details
    constructor(
        title: string,
        author: string,
        description: string,
        copies: number,
        category: string,
    ) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.category = category;
    }
}

// Exporting the AddBookRequest class
export default AddBookRequest;
