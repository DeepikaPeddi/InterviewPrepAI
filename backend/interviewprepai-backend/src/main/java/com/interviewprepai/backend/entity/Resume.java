package com.interviewprepai.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resumes")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // MANY RESUMES CAN BELONG TO ONE USER
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String resumeName;

    @Column(columnDefinition = "TEXT")
    private String extractedText;
}