package com.interviewprepai.backend.service;

import com.interviewprepai.backend.dto.ResumeResponse;
import com.interviewprepai.backend.entity.Resume;
import com.interviewprepai.backend.entity.User;
import com.interviewprepai.backend.repository.ResumeRepository;
import com.interviewprepai.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import com.interviewprepai.backend.dto.StartInterviewResponse;
import com.interviewprepai.backend.entity.InterviewSession;
import com.interviewprepai.backend.repository.InterviewSessionRepository;
import java.util.Arrays;
import com.interviewprepai.backend.dto.SubmitInterviewRequest;
import com.interviewprepai.backend.dto.InterviewResultResponse;

import java.util.stream.Collectors;
import com.interviewprepai.backend.dto.InterviewHistoryResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewprepai.backend.dto.DashboardResponse;
import org.springframework.transaction.annotation.Transactional;
import com.interviewprepai.backend.dto.InterviewDetailsResponse;

@Service
@RequiredArgsConstructor

public class ResumeService {

    private final GroqService groqService;
    private final InterviewSessionRepository
            interviewSessionRepository;
    private final ObjectMapper objectMapper =
            new ObjectMapper();

    private final ResumeRepository resumeRepository;

    private final UserRepository userRepository;

    // COMMON METHOD
    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }
    // DASHBOARD DATA
    public DashboardResponse getDashboardData(

            String email

    ) {

        User user = getUserByEmail(email);

        List<InterviewSession> sessions =

                interviewSessionRepository.findByUser(user)

                        .stream()

                        .filter(session ->
                                session.getScore() != null
                        )

                        .toList();

        int totalInterviews =
                sessions.size();

        Integer latestScore = 0;

        String latestStrongTopics =
                "No data";

        String latestWeakTopics =
                "No data";

        if (!sessions.isEmpty()) {

            InterviewSession latestSession =

                    sessions.get(
                            sessions.size() - 1
                    );

            latestScore =
                    latestSession.getScore();

            latestStrongTopics =
                    latestSession.getStrongTopics();

            latestWeakTopics =
                    latestSession.getWeakTopics();
        }

        return new DashboardResponse(

                totalInterviews,

                latestScore,

                latestStrongTopics,

                latestWeakTopics
        );
    }
    // GET USER RESUMES
    public List<ResumeResponse> getUserResumes(
            String email
    ) {

        User user = getUserByEmail(email);

        // FETCH USER RESUMES
        List<Resume> resumes =
                resumeRepository.findByUser(user);

        // CONVERT TO DTO
        return resumes.stream()

                .map(resume -> new ResumeResponse(
                        resume.getId(),
                        resume.getResumeName()
                ))

                .toList();
    }

    // UPLOAD RESUME
    public String uploadResume(
            MultipartFile file,
            String email
    ) throws IOException {

        User user = getUserByEmail(email);
        if (
                resumeRepository.existsByUserAndResumeName(
                        user,
                        file.getOriginalFilename()
                )
        ) {

            throw new RuntimeException(
                    "Resume already exists"
            );
        }


        // LOAD PDF
        PDDocument document =
                PDDocument.load(file.getInputStream());

        // EXTRACT TEXT
        PDFTextStripper pdfStripper =
                new PDFTextStripper();

        String extractedText =
                pdfStripper.getText(document);

        // CLOSE DOCUMENT
        document.close();

        // CREATE RESUME OBJECT
        Resume resume = Resume.builder()

                .user(user)

                .resumeName(file.getOriginalFilename())

                .extractedText(extractedText)

                .build();

        // SAVE TO DATABASE
        resumeRepository.save(resume);

        return "Resume uploaded successfully";
    }

    // GENERATE QUESTIONS
    // START INTERVIEW
    public StartInterviewResponse startInterview(

            Long resumeId,
            String email

    ) {

        // FIND USER
        User user = getUserByEmail(email);

        // FIND RESUME
        Resume resume = resumeRepository.findById(resumeId)

                .orElseThrow(() ->
                        new RuntimeException("Resume not found")
                );

        // SECURITY CHECK
        if (!resume.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        // GET RESUME TEXT
        String resumeText =
                resume.getExtractedText();

        // GENERATE QUESTIONS
        String questionsText =
                groqService.generateQuestions(
                        resumeText
                );

// CONVERT QUESTIONS TO LIST
        System.out.println("QUESTIONS:");
        System.out.println(questionsText);
        List<String> questionsList = Arrays.stream(
                        questionsText.split("\n")
                )
                .map(String::trim)
                .filter(q -> !q.isEmpty())
                .toList();

        // CREATE INTERVIEW SESSION
        InterviewSession session =
                InterviewSession.builder()

                        .user(user)

                        .resume(resume)

                        .questions(questionsText)

                        .build();

        // SAVE SESSION
        InterviewSession savedSession =
                interviewSessionRepository.save(session);

        // RETURN RESPONSE
        return new StartInterviewResponse(

                savedSession.getId(),

                questionsList
        );
    }
    // SUBMIT INTERVIEW
    public InterviewResultResponse submitInterview(

            SubmitInterviewRequest request,
            String email

    ) {

        // FIND USER
        User user = getUserByEmail(email);

        // FIND SESSION
        InterviewSession session =
                interviewSessionRepository.findById(
                                request.getSessionId()
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview session not found"
                                )
                        );

        // SECURITY CHECK
        if (!session.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        // CONVERT ANSWERS LIST TO STRING
        String answersText = request.getAnswers()

                .stream()

                .collect(Collectors.joining("\n"));

        // SAVE ANSWERS
        session.setAnswers(answersText);

        // AI EVALUATION
        String evaluation =
                groqService.evaluateInterview(

                        session.getQuestions(),

                        answersText
                );
        // PARSE AI JSON RESPONSE
        Integer score;

        String strongTopics;

        String weakTopics;

        String feedback;

        try {

            JsonNode root =
                    objectMapper.readTree(
                            evaluation
                    );

            score =
                    root.get("score").asInt();

            strongTopics =
                    root.get("strongTopics")
                            .asText();

            weakTopics =
                    root.get("weakTopics")
                            .asText();

            feedback =
                    root.get("feedback")
                            .asText();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse AI evaluation JSON"
            );
        }

        // SAVE RESULTS
        session.setScore(score);

        session.setStrongTopics(
                strongTopics
        );

        session.setWeakTopics(
                weakTopics
        );

        session.setFeedback(
                feedback
        );

        // UPDATE DATABASE
        interviewSessionRepository.save(session);

        // RETURN RESPONSE
        return new InterviewResultResponse(

                score,

                strongTopics,

                weakTopics,

                feedback
        );
    }
    // GET INTERVIEW HISTORY
    public List<InterviewHistoryResponse>
    getInterviewHistory(

            String email

    ) {

        // FIND USER
        User user = getUserByEmail(email);

        // FETCH USER SESSIONS
        List<InterviewSession> sessions =

                interviewSessionRepository.findByUser(user);

        // CONVERT TO DTO
        return sessions.stream()

                .filter(session ->
                        session.getScore() != null
                )

                .map(session ->

                        new InterviewHistoryResponse(

                                session.getId(),

                                session.getResume()
                                        .getResumeName(),

                                session.getScore(),

                                session.getStrongTopics(),

                                session.getWeakTopics(),

                                session.getFeedback()
                        )
                )

                .toList(); }
    public InterviewDetailsResponse getInterviewDetails(
            Long sessionId,
            String email
    ) {

        User user = getUserByEmail(email);

        InterviewSession session =
                interviewSessionRepository
                        .findById(sessionId)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview not found"
                                )
                        );

        if (!session.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        return new InterviewDetailsResponse(

                session.getId(),

                session.getScore(),

                session.getStrongTopics(),

                session.getWeakTopics(),

                session.getFeedback(),

                session.getQuestions(),

                session.getAnswers()
        );
    }
    // DELETE RESUME
    @Transactional
    public String deleteResume(
            Long resumeId,
            String email
    )
 {

        // FIND USER
        User user = getUserByEmail(email);

        // FIND RESUME
        Resume resume =
                resumeRepository.findById(resumeId)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Resume not found"
                                )
                        );

        // SECURITY CHECK
        if (!resume.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        // DELETE RELATED INTERVIEW SESSIONS
        interviewSessionRepository
                .deleteByResume(resume);

        // DELETE RESUME
        resumeRepository.delete(resume);

        return "Resume deleted successfully";
    }
    public String deleteInterview(

            Long sessionId,
            String email

    ) {

        User user = getUserByEmail(email);

        InterviewSession session =
                interviewSessionRepository.findById(sessionId)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Interview not found"
                                )
                        );

        if (!session.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        interviewSessionRepository.delete(session);

        return "Interview deleted successfully";
    }
}