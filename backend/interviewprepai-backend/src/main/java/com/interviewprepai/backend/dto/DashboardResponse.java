package com.interviewprepai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public class DashboardResponse {

    private Integer totalInterviews;

    private Integer latestScore;

    private String latestStrongTopics;

    private String latestWeakTopics;
}