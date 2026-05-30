package com.interviewprepai.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_sessions")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class InterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // MANY SESSIONS BELONG TO ONE USER
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // MANY SESSIONS CAN USE SAME RESUME
    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;

    @Column(columnDefinition = "TEXT")
    private String questions;

    @Column(columnDefinition = "TEXT")
    private String answers;

    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String strongTopics;

    @Column(columnDefinition = "TEXT")
    private String weakTopics;

    @Column(columnDefinition = "TEXT")
    private String feedback;
}