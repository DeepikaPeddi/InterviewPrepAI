package com.interviewprepai.backend.service;

import com.interviewprepai.backend.dto.LoginRequest;
import com.interviewprepai.backend.dto.RegisterRequest;
import com.interviewprepai.backend.entity.User;
import com.interviewprepai.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.interviewprepai.backend.security.JwtUtil;
import com.interviewprepai.backend.dto.AuthResponse;

@Service
@RequiredArgsConstructor

public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    // REGISTER USER
    public AuthResponse register(RegisterRequest request) {

        // CHECK EMAIL ALREADY EXISTS
        // CHECK EMAIL ALREADY EXISTS
        if (userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        // CREATE USER OBJECT
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())

                // ENCRYPT PASSWORD
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        // SAVE USER
        userRepository.save(user);

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );

        return new AuthResponse(token);
    }

    // LOGIN USER
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // CHECK PASSWORD
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException("Invalid password");
        }

        // GENERATE JWT TOKEN
        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token);
    }
}