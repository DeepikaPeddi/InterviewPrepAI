package com.interviewprepai.backend.controller;

import com.interviewprepai.backend.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import com.interviewprepai.backend.dto.ResumeResponse;
import com.interviewprepai.backend.dto.QuestionRequest;

import java.util.List;
import com.interviewprepai.backend.dto.StartInterviewRequest;
import com.interviewprepai.backend.dto.StartInterviewResponse;
import com.interviewprepai.backend.dto.SubmitInterviewRequest;
import com.interviewprepai.backend.dto.InterviewResultResponse;
import com.interviewprepai.backend.dto.InterviewHistoryResponse;
import com.interviewprepai.backend.dto.DashboardResponse;
import com.interviewprepai.backend.dto.InterviewDetailsResponse;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor

public class ResumeController {

    private final ResumeService resumeService;

    // GET USER RESUMES
    @GetMapping("/my-resumes")
    public ResponseEntity<List<ResumeResponse>>
    getUserResumes(

            Authentication authentication

    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                resumeService.getUserResumes(email)
        );
    }

    // UPLOAD RESUME API
    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(

            @RequestParam("file")
            MultipartFile file,

            Authentication authentication

    ) throws IOException {

        // GET LOGGED-IN USER EMAIL
        String email = authentication.getName();

        return ResponseEntity.ok(
                resumeService.uploadResume(file, email)
        );
    }
    // GENERATE QUESTIONS API
    @PostMapping("/start-interview")
    public ResponseEntity<StartInterviewResponse>
    startInterview(

            @RequestBody
            StartInterviewRequest request,

            Authentication authentication

    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(

                resumeService.startInterview(

                        request.getResumeId(),

                        email
                )
        );
    }
    // SUBMIT INTERVIEW API
    @PostMapping("/submit-interview")
    public ResponseEntity<InterviewResultResponse>
    submitInterview(

            @RequestBody
            SubmitInterviewRequest request,

            Authentication authentication

    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(

                resumeService.submitInterview(

                        request,

                        email
                )
        );
    }
    // INTERVIEW HISTORY API
    @GetMapping("/history")
    public ResponseEntity<List<InterviewHistoryResponse>>
    getInterviewHistory(

            Authentication authentication

    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(

                resumeService.getInterviewHistory(
                        email
                )
        );
    }
    // DASHBOARD API
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse>
    getDashboardData(

            Authentication authentication

    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(

                resumeService.getDashboardData(
                        email
                )
        );
    }
    // DELETE RESUME API
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<String>
    deleteResume(

            @PathVariable
            Long resumeId,

            Authentication authentication

    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(

                resumeService.deleteResume(

                        resumeId,

                        email
                )
        );
    }
    @GetMapping("/interview/{sessionId}")
    public ResponseEntity<InterviewDetailsResponse>
    getInterviewDetails(

            @PathVariable
            Long sessionId,

            Authentication authentication

    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(

                resumeService.getInterviewDetails(

                        sessionId,

                        email
                )
        );
    }
    // DELETE INTERVIEW HISTORY
    @DeleteMapping("/history/{sessionId}")
    public ResponseEntity<String> deleteInterview(

            @PathVariable Long sessionId,

            Authentication authentication

    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(

                resumeService.deleteInterview(
                        sessionId,
                        email
                )
        );
    }
}






























































































































