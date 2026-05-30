package com.interviewprepai.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@Service
@RequiredArgsConstructor

public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;
    private final ObjectMapper objectMapper =
            new ObjectMapper();

    private final RestTemplate restTemplate =
            new RestTemplate();

    // GENERATE QUESTIONS
    public String generateQuestions(String resumeText) {

        String url =
                "https://api.groq.com/openai/v1/chat/completions";

        // PROMPT
        String prompt = """
Based on this resume, generate exactly 25 interview questions.

Rules:
- Return exactly 25 questions.
- Return only questions.
- Do not add headings.
- Do not add categories.
- Do not add section names.
- Do not add introductory text.
- Do not add numbering.
- One question per line.
-If answer is empty, irrelevant, or extremely vague, award 0 marks for that question.
-Do not give bonus marks,Score must reflect actual technical correctness.

The questions should be based on the candidate's skills, projects, technologies, certifications, and experience mentioned in the resume.

Resume:
""" + resumeText;
        Map<String, Object> requestBody = Map.of(
                "model",
                "llama-3.3-70b-versatile",
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                ),
                "temperature", 0.7
        );

        // HEADERS
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        // API CALL
        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        entity,
                        String.class
                );

        try {

            JsonNode root =
                    objectMapper.readTree(
                            response.getBody()
                    );

            String questions = root

                    .get("choices")
                    .get(0)

                    .get("message")
                    .get("content")

                    .asText();

            return questions;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse AI response"
            );
        }
    }
    public String evaluateInterview(

            String questions,
            String answers

    ) {

        String url =
                "https://api.groq.com/openai/v1/chat/completions";

        // PROMPT
        String prompt = """
        Evaluate this interview.

        Return ONLY valid JSON.

        Format:
        
                {
                  "score": 0,
                  "strongTopics": "comma separated strong topics",
                  "weakTopics": "comma separated weak topics",
                  "feedback": "overall feedback"
                }
                Rules:
                - score must be integer
                - no markdown
                - no extra text
                - valid JSON only
                - never return null
                - never return "null"
                - strongTopics should contain maximum 5 topics
                 - weakTopics should contain maximum 5 topics
                - keep topics short and concise
                
                - if no strong topics exist,
                  return exactly:
                  "No strong topics identified"
                
                - if no weak topics exist,
                  return exactly:
                  "No weak topics identified"

        Questions:
        """ + questions +

                """
        
                Answers:
                """ + answers;

        // REQUEST BODY
        Map<String, Object> requestBody = Map.of(

                "model", "llama-3.1-8b-instant",
                "temperature", 0.2,


                "messages", new Object[]{

                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                }
        );

        // HEADERS
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        // API CALL
        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        entity,
                        String.class
                );

        // PARSE RESPONSE
        try {

            JsonNode root =
                    objectMapper.readTree(
                            response.getBody()
                    );

            return root

                    .get("choices")
                    .get(0)

                    .get("message")
                    .get("content")

                    .asText();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse AI evaluation"
            );
        }
    }
}