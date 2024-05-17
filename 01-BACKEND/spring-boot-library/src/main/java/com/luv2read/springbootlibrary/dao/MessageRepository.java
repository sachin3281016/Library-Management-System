package com.luv2read.springbootlibrary.dao;

import com.luv2read.springbootlibrary.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // Custom query method to find a page of Message entities by user email
    Page<Message> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);

    // Custom query method to find a page of Message entities by closed status
    Page<Message> findByClosed(@RequestParam("closed") boolean closed, Pageable pageable);
}
