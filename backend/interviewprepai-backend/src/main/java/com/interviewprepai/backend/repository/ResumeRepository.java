package com.interviewprepai.backend.repository;

import com.interviewprepai.backend.entity.Resume;
import com.interviewprepai.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    List<Resume> findByUser(User user);
    void deleteById(Long id);
    boolean existsByUserAndResumeName(
            User user,
            String resumeName
    );
}