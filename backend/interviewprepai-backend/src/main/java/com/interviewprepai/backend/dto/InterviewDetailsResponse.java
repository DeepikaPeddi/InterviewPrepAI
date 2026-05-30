package com.interviewprepai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InterviewDetailsResponse {

    private Long sessionId;

    private Integer score;

    private String strongTopics;

    private String weakTopics;

    private String feedback;

    private String questions;

    private String answers;
}