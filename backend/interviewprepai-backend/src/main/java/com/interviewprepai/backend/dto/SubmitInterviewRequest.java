package com.interviewprepai.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class SubmitInterviewRequest {

    private Long sessionId;

    private List<String> answers;
}