package com.interviewprepai.backend.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter
        extends OncePerRequestFilter {


    private final Map<String, Bucket> userBuckets =
            new ConcurrentHashMap<>();


    private Bucket createBucket() {

        Bandwidth limit =
                Bandwidth.classic(

                        10,

                        Refill.intervally(
                                10,
                                Duration.ofMinutes(5)
                        )
                );


        return Bucket.builder()

                .addLimit(limit)

                .build();
    }


    @Override
    protected void doFilterInternal(

            HttpServletRequest request,

            HttpServletResponse response,

            FilterChain filterChain

    ) throws ServletException, IOException {


        String path =
                request.getServletPath();


        if (
                path.equals("/api/resume/start-interview")
                        ||
                        path.equals("/api/resume/submit-interview")
        ) {


            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();


            if (
                    authentication != null
                            &&
                            authentication.isAuthenticated()
            ) {


                String email =
                        authentication.getName();


                Bucket bucket =
                        userBuckets.computeIfAbsent(

                                email,

                                key -> createBucket()
                        );


                if (
                        !bucket.tryConsume(1)
                ) {

                    response.setStatus(
                            429
                    );

                    response.getWriter()
                            .write(
                                    "AI request limit exceeded. Please try again later."
                            );

                    return;
                }
            }
        }


        filterChain.doFilter(
                request,
                response
        );
    }
}