package com.luv2read.springbootlibrary.service;

import com.luv2read.springbootlibrary.dao.BookRepository;
import com.luv2read.springbootlibrary.dao.CheckoutRepository;
import com.luv2read.springbootlibrary.dao.HistoryRepository;
import com.luv2read.springbootlibrary.dao.PaymentRepository;
import com.luv2read.springbootlibrary.entity.Book;
import com.luv2read.springbootlibrary.entity.Checkout;
import com.luv2read.springbootlibrary.entity.History;
import com.luv2read.springbootlibrary.entity.Payment;
import com.luv2read.springbootlibrary.responseModels.ShelfCurrentLoansResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;

    private HistoryRepository historyRepository;

    private PaymentRepository paymentRepository;

    @Autowired
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository, PaymentRepository paymentRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
        this.paymentRepository = paymentRepository;
    }

    // Method to check out a book for a user
    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        // Retrieve the book by ID
        Optional<Book> book = bookRepository.findById(bookId);

        // Check if the book exists and is available for checkout
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book doesn't exist or is already checked out by the user.");
        }

        // Retrieve the user's current checkouts
        List<Checkout> currentBooksCheckout = checkoutRepository.findByUserEmail(userEmail);
        boolean bookNeedsReturned = false;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        // Check if the user has any overdue books
        for (Checkout checkout : currentBooksCheckout) {
            Date d1 = sdf.parse(checkout.getReturnDate());
            Date d2 = sdf.parse(LocalDate.now().toString());

            TimeUnit timeUnit = TimeUnit.DAYS;

            double differenceInTime = timeUnit.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

            if (differenceInTime < 0) {
                bookNeedsReturned = true;
                break;
            }
        }

        // Check for outstanding fees before proceeding with checkout
        Payment userPayment = paymentRepository.findByUserEmail(userEmail);
        if ((userPayment != null && userPayment.getAmount() > 0) || (userPayment != null && bookNeedsReturned)) {
            throw new Exception("Outstanding fees. Cannot proceed with checkout.");
        }

        // If user has no payment record, create one with zero amount
        if (userPayment == null) {
            Payment payment = new Payment();
            payment.setAmount(0.00);
            payment.setUserEmail(userEmail);
            paymentRepository.save(payment);
        }

        // Update the available copies of the book and save it
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        // Create a new checkout record and save it
        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(), LocalDate.now().plusDays(7).toString(), bookId);
        checkoutRepository.save(checkout);

        // Return the checked-out book
        return book.get();
    }

    // Method to check if a book is checked out by a user
    public Boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateCheckout != null;
    }

    // Method to get the count of current loans for a user
    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        // List to store responses for each book on the user's shelf
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        // Retrieve a list of checkouts associated with the user's email
        List<Checkout> checkoutList = checkoutRepository.findByUserEmail(userEmail);

        // List to store book IDs from the retrieved checkouts
        List<Long> bookIdList = new ArrayList<>();

        // Collect book IDs from the checkouts
        for (Checkout checkout : checkoutList) {
            bookIdList.add(checkout.getBookId());
        }

        // Retrieve a list of books based on the collected book IDs
        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);

        // Date formatter for handling date calculations
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        // Iterate through each book
        for (Book book : books) {
            // Find the corresponding checkout for the current book
            Optional<Checkout> checkout = checkoutList.stream().filter(x -> x.getBookId() == book.getId()).findFirst();

            // Check if the checkout exists
            if (checkout.isPresent()) {
                // Parse checkout and current date for date comparison
                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                // Calculate the difference in days
                TimeUnit timeUnit = TimeUnit.DAYS;
                long difference_In_Time = timeUnit.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

                // Create ShelfCurrentLoansResponse and add to the list
                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, (int) difference_In_Time));
            }
        }

        // Return the list of responses for the books on the user's shelf
        return shelfCurrentLoansResponses;
    }

    public void returnBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (!book.isPresent() || validateCheckout == null) {
            throw new Exception("Book doesn't exist or is not checked out by the user");
        }

        // Update available copies of the book
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        bookRepository.save(book.get());

        // Calculate the overdue period and update user's payment
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        TimeUnit timeUnit = TimeUnit.DAYS;

        double differenceInTime = timeUnit.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

        if (differenceInTime < 0) {
            Payment payment = new Payment();
            payment.setAmount(payment.getAmount() + (differenceInTime * (-1)));
            payment.setUserEmail(userEmail);
            paymentRepository.save(payment);
        }

        // Delete checkout record and save the book in history
        checkoutRepository.deleteById(validateCheckout.getId());
        History history = new History(userEmail, book.get().getTitle(), book.get().getAuthor(), book.get().getDescription(), bookId, validateCheckout.getCheckoutDate(), LocalDate.now().toString(), book.get().getImg());
        historyRepository.save(history);
    }

    public void renewLoan(String userEmail, Long bookId) throws Exception {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout == null) {
            throw new Exception("Book doesn't exist or is not checked out by the user");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        if (d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0) {
            // Renew the return date by 7 days
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);
        }
    }
}
