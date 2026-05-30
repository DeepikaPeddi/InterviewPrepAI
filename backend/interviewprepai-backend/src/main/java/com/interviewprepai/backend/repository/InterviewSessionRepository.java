package com.interviewprepai.backend.repository;

import com.interviewprepai.backend.entity.InterviewSession;
import com.interviewprepai.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.interviewprepai.backend.entity.Resume;

import java.util.List;

public interface InterviewSessionRepository
        extends JpaRepository<InterviewSession, Long> {

    // FETCH USER INTERVIEW HISTORY
    List<InterviewSession> findByUser(User user);
    void deleteByResume(Resume resume);
}