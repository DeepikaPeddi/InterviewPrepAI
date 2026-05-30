# InterviewPrepAI – AI-Powered Mock Interview Preparation Platform

## Overview

InterviewPrepAI is a full stack AI-powered interview preparation platform developed using React, Spring Boot, PostgreSQL, JWT Authentication, and Groq AI.

The platform enables users to upload resumes, participate in AI-generated mock interviews, answer technical and HR interview questions, and receive personalized feedback to improve interview performance.

The application follows a complete full stack architecture consisting of:

* React Frontend
* Spring Boot Backend
* PostgreSQL Database
* JWT Authentication
* Groq AI Integration
* Resume Parsing

---

# Features

## Authentication System

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality
* Secure Password Encryption using BCrypt

## Resume Management

* Upload Resume PDF
* Resume Parsing
* Resume Content Extraction
* Resume-Based Interview Generation
* User-Specific Resume Management

## AI Interview System

* AI Generated Interview Questions
* Resume-Based Question Generation
* Technical Interview Questions
* HR Interview Questions
* Behavioral Questions
* Dynamic Interview Flow

## Interview Session Features

* Start Interview Session
* Submit Answers
* Question Navigation
* Interview Progress Tracking
* Exit Interview Confirmation Modal
* Session-Based Interview Experience

## AI Feedback System

* AI Answer Evaluation
* Personalized Feedback
* Performance Suggestions
* Improvement Recommendations
* Interview Readiness Analysis

## Dashboard Features

* Personalized User Dashboard
* Resume Overview
* Interview Statistics
* Session Management
* User Information Management

## UI/UX Features

* Responsive Design
* Modern Dashboard Interface
* Professional Interview Experience
* Loading States
* Error Handling
* Interactive Components
* Clean Navigation
* User-Friendly Layout

---

# Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* React Icons
* CSS

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Apache PDFBox

## Database

* PostgreSQL

## AI Integration

* Groq AI API
* AI Question Generation
* AI Feedback Evaluation

---

# Architecture

```txt
Frontend (React + Vite)
          ↓
      REST APIs
          ↓
Spring Boot Backend
          ↓
Spring Security + JWT
          ↓
Business Logic Layer
          ↓
PostgreSQL Database
          ↓

Groq AI API
          ↓
AI Question Generation
&
AI Feedback Evaluation
```

---

# Project Structure

```txt
InterviewPrepAI
│
├── backend
│   └── interviewprepai-backend
│       ├── controller
│       ├── service
│       ├── repository
│       ├── entity
│       ├── security
│       ├── config
│       ├── dto
│       └── util
│
├── interviewprepai-frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── routes
│   ├── assets
│   └── styles
│
└── README.md
```

---

# Database Tables

## users

Stores registered user information.

## resumes

Stores uploaded resume information.

## interview_sessions

Stores interview session records.

## interview_questions

Stores AI-generated interview questions.

## interview_answers

Stores user-submitted interview answers.

---

# Entity Relationships

* One User → One Resume
* One User → Many Interview Sessions
* One Interview Session → Many Questions
* One Interview Session → Many Answers

---

# API Endpoints

## Authentication APIs

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

## Resume APIs

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/resume/upload | Upload Resume          |
| GET    | /api/resume        | Get Resume Information |

## Interview APIs

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| POST   | /api/interview/start     | Start Interview           |
| GET    | /api/interview/questions | Fetch Interview Questions |
| POST   | /api/interview/answer    | Submit Answer             |
| GET    | /api/interview/feedback  | Get AI Feedback           |

## Dashboard APIs

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/dashboard | Dashboard Data |

---

# Security Features

## JWT Authentication

* Stateless Authentication
* Secure Token-Based Authorization
* Protected Endpoints
* User Session Security

## Password Security

* BCrypt Password Encryption
* Secure Credential Storage

## Route Protection

* Protected Backend APIs
* Protected Frontend Routes
* Unauthorized Access Prevention

---

# How to Run the Project

## 1. Clone Repository

```bash
git clone https://github.com/DeepikaPeddi/InterviewPrepAI.git
```

## 2. Backend Setup

Navigate to:

```txt
backend/interviewprepai-backend
```

Configure application properties:

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

groq.api.key=YOUR_GROQ_API_KEY
```

Run:

```txt
InterviewprepaiBackendApplication.java
```

Backend runs at:

```txt
http://localhost:8080
```

## 3. Frontend Setup

Navigate to:

```txt
interviewprepai-frontend
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

---

# Environment Variables

## Backend

```env
DB_URL=your_database_url

DB_USERNAME=your_database_username

DB_PASSWORD=your_database_password

GROQ_API_KEY=your_groq_api_key
```

---

# Future Improvements

## Planned Features

* AI Voice Interviews
* Speech-to-Text Integration
* Interview Recording
* AI Resume Scoring
* Interview History Dashboard
* Performance Analytics
* Video Interview Simulation
* Multi-Language Support
* Detailed Progress Tracking
* Cloud Deployment

---

# Learning Outcomes

## Skills Gained

* Full Stack Development
* React Development
* Spring Boot REST API Development
* JWT Authentication
* Spring Security
* PostgreSQL Integration
* Cloud Database Management
* AI API Integration
* Resume Parsing
* File Upload Handling
* Frontend-Backend Integration
* Software Architecture Design
* Git & GitHub Workflow
* Deployment Preparation
* Real-World Project Development

---

# Author

## Deepika Peddi

B.Tech Student | Full Stack Developer | AI Enthusiast

GitHub: https://github.com/DeepikaPeddi

⭐ If you found this project useful, consider giving it a star.
