package com.interviewprepai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public class InterviewHistoryResponse {

    private Long sessionId;

    private String resumeName;

    private Integer score;

    private String strongTopics;

    private String weakTopics;

    private String feedback;
}