package com.luv2read.springbootlibrary.dao;

import com.luv2read.springbootlibrary.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface HistoryRepository extends JpaRepository<History, Long> {

    // Custom query method to find a page of History entities by user email
    Page<History> findBooksByUserEmail(@RequestParam("email") String userEmail, Pageable pageable);
}
