package com.luv2read.springbootlibrary.dao;

import com.luv2read.springbootlibrary.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repository interface for managing Book entities.
 * Extends JpaRepository to inherit common CRUD operations.
 */
public interface BookRepository extends JpaRepository<Book, Long> {

    // Custom query method to find books by title containing a specified string
    // Uses Pageable for pagination and accepts the search string as a request parameter
    Page<Book> findByTitleContaining(@Param("title") String title, Pageable pageable);

    // Custom query method to find books by a specified category
    // Uses Pageable for pagination and accepts the category as a request parameter
    Page<Book> findByCategory(@Param("category") String category, Pageable pageable);

    // Custom query method to find books by both title containing a string and a specified category
    // Uses Pageable for pagination and accepts the title and category as parameters
    Page<Book> findByTitleContainingAndCategory(@Param("title") String title, @Param("category") String category, Pageable pageable);

    @Query("select o from Book o where id in :book_ids")
    List<Book> findBooksByBookIds(@Param("book_ids") List<Long> bookIds);
}
