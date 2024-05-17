package com.luv2read.springbootlibrary.service;

import com.luv2read.springbootlibrary.dao.BookRepository;
import com.luv2read.springbootlibrary.entity.Book;
import com.luv2read.springbootlibrary.requestModels.AddBookRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    // Repository for accessing book data
    private BookRepository bookRepository;

    // Constructor injection of BookRepository
    @Autowired
    public AdminService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Service method to add a new book
    public void postBook(AddBookRequest addBookRequest) {
        // Create a new Book entity and set its properties
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setImg(addBookRequest.getImg());
        book.setCategory(addBookRequest.getCategory());
        // Save the new book to the database
        bookRepository.save(book);
    }

    // Service method to increase the quantity of available copies for a book
    public void increaseBookQuantity(long bookId) throws Exception {
        // Retrieve the book by its ID
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent())
            throw new Exception("Book not found");

        // Increment both total copies and available copies
        book.get().setCopies(book.get().getCopies() + 1);
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        // Save the updated book to the database
        bookRepository.save(book.get());
    }

    // Service method to decrease the quantity of available copies for a book
    public void decreaseBookQuantity(long bookId) throws Exception {
        // Retrieve the book by its ID
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent() || book.get().getCopies() <= 0 || book.get().getCopiesAvailable() <= 0)
            throw new Exception("Book not found or quantity locked");

        // Decrement both total copies and available copies
        book.get().setCopies(book.get().getCopies() - 1);
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        // Save the updated book to the database
        bookRepository.save(book.get());
    }

    // Service method to delete a book by its ID
    public void deleteBook(Long bookId) throws Exception {
        // Check if the book exists
        Optional<Book> book = bookRepository.findById(bookId);
        if (!book.isPresent())
            throw new Exception("Book not found");

        // Delete the book from the database
        bookRepository.deleteById(bookId);
    }
}
