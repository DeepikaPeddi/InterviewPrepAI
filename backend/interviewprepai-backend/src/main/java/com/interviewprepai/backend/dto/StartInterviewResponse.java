package com.interviewprepai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor

public class StartInterviewResponse {

    private Long sessionId;

    private List<String> questions;
}