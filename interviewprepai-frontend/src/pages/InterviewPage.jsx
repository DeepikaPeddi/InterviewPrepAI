import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function InterviewPage() {
const navigate = useNavigate();
const questions =
    JSON.parse(
        localStorage.getItem("questions")
    ) || [];

const [showResult, setShowResult] = useState(false);

const [resultData, setResultData]
    = useState(null);

    const [currentQuestion, setCurrentQuestion]
        = useState(0);

    const [answers, setAnswers]
        = useState(Array(questions.length).fill(""));
 useEffect(() => {

     const savedAnswers =
         localStorage.getItem(
             "interviewAnswers"
         );

     const savedQuestion =
         localStorage.getItem(
             "currentQuestion"
         );

     if (savedAnswers) {

         setAnswers(
             JSON.parse(savedAnswers)
         );
     }

     if (savedQuestion) {

         setCurrentQuestion(
             Number(savedQuestion)
         );
     }

 }, []);
    const [showAnswers, setShowAnswers]
            = useState(false);
     const [showExitModal, setShowExitModal]
         = useState(false);


if (questions.length === 0) {

    return (

        <div
            style={{
                padding: "40px"
            }}
        >
            No interview found.
        </div>

    );
}

    /* HANDLE ANSWER */

    const handleAnswerChange = (e) => {

        const updatedAnswers =
            [...answers];

        updatedAnswers[currentQuestion]
            = e.target.value;

        setAnswers(updatedAnswers);

        localStorage.setItem(
            "interviewAnswers",
            JSON.stringify(updatedAnswers)
        );
    };

    /* NEXT QUESTION */

    const nextQuestion = () => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            const next =
                currentQuestion + 1;

            setCurrentQuestion(next);

            localStorage.setItem(
                "currentQuestion",
                next
            );
        }
    };

    /* PREVIOUS QUESTION */

    const previousQuestion = () => {

        if (currentQuestion > 0) {

            const prev =
                currentQuestion - 1;

            setCurrentQuestion(prev);

            localStorage.setItem(
                "currentQuestion",
                prev
            );
        }
    };


const handleSubmit = async () => {

    try {

        const sessionId =
            localStorage.getItem(
                "sessionId"
            );

        const response =
            await api.post(

                "/resume/submit-interview",

                {
                    sessionId:
                        Number(sessionId),

                    answers
                }
            );

        setResultData(
            response.data
        );

        setShowResult(true);

    } catch (err) {

        console.error(err);

        toast.error(
            "Failed to submit interview"
        );
    }
};
if (showResult) {

    return (

        <div
            style={{
                display: "flex",
                background: "#f5f7fb",
                minHeight: "100vh"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "35px"
                }}
            >

                <h1>
                    Interview Result
                </h1>

                <div style={cardStyle}>

                    <h2
                        style={{
                            color: "#16a34a"
                        }}
                    >
                        Score: {resultData.score}%
                    </h2>

                    <hr
                        style={{
                            margin: "20px 0"
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: "30px",
                            marginBottom: "25px"
                        }}
                    >

                        <div style={{ flex: 1 }}>

                            <h3>
                                Strong Topics
                            </h3>

                            <p>
                                {resultData.strongTopics}
                            </p>

                        </div>

                        <div style={{ flex: 1 }}>

                            <h3>
                                Weak Topics
                            </h3>

                            <p>
                                {resultData.weakTopics}
                            </p>

                        </div>

                    </div>

                    <h3>
                        AI Feedback
                    </h3>

                    <p>
                        {resultData.feedback}
                    </p>

                    <button
                        onClick={() =>
                            setShowAnswers(true)
                        }
                        style={{
                            ...buttonStyle,
                            marginTop: "20px"
                        }}
                    >
                        View Answers
                    </button>

                    {showAnswers && (

                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background:
                                    "rgba(0,0,0,0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1000
                            }}
                        >

                            <div
                                style={{
                                    background: "white",
                                    width: "90%",
                                    maxWidth: "1000px",
                                    height: "80vh",
                                    borderRadius: "12px",
                                    padding: "25px",
                                    overflowY: "auto"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        marginBottom: "20px"
                                    }}
                                >

                                    <h2>
                                        Interview Answers
                                    </h2>

                                    <button
                                        onClick={() =>
                                            setShowAnswers(false)
                                        }
                                        style={{
                                            border: "none",
                                            background: "none",
                                            fontSize: "24px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        ×
                                    </button>

                                </div>

                                {questions.map(
                                    (
                                        question,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            style={{
                                                marginBottom:
                                                    "25px"
                                            }}
                                        >

                                            <h4>
                                                Q{index + 1}. {question}
                                            </h4>

                                            <div
                                                style={{
                                                    background:
                                                        "#f8fafc",
                                                    padding:
                                                        "12px",
                                                    borderRadius:
                                                        "8px",
                                                    marginTop:
                                                        "8px"
                                                }}
                                            >
                                                {
                                                    answers[index]
                                                    || "No answer provided"
                                                }
                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
}
    return (

        <div
            style={{
                display: "flex",
                background: "#f5f7fb",
                minHeight: "100vh",
                fontFamily: "Arial"
            }}
        >

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <div
                style={{
                    flex: 1,
                    padding: "35px"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "25px"
                    }}
                >

                    <h1>
                        AI Interview
                    </h1>

                    <button
                        onClick={() =>
                            setShowExitModal(true)
                        }
                        style={{
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "15px"
                        }}
                    >
                        Exit Interview
                    </button>

                </div>
                {/* QUESTION CARD */}

                <div style={cardStyle}>

                    {/* QUESTION COUNT */}

                    <p
                        style={{
                            marginBottom: "20px",
                            color: "#555"
                        }}
                    >
                        Question
                        {" "}
                        {currentQuestion + 1}
                        {" "}
                        of
                        {" "}
                        {questions.length}
                    </p>

                    {/* PROGRESS BAR */}

                    <div
                        style={{
                            width: "100%",
                            height: "10px",
                            background: "#e2e8f0",
                            borderRadius: "10px",
                            marginBottom: "30px"
                        }}
                    >

                        <div
                            style={{
                                width: `${(
                                    (currentQuestion + 1)
                                    / questions.length
                                ) * 100}%`,
                                height: "100%",
                                background: "#2563eb",
                                borderRadius: "10px"
                            }}
                        />

                    </div>

                    {/* QUESTION */}

                    <h2
                        style={{
                            marginBottom: "25px"
                        }}
                    >
                        {questions[currentQuestion]}
                    </h2>

                    {/* ANSWER BOX */}

                    <textarea

                        value={
                            answers[currentQuestion]
                        }

                        onChange={handleAnswerChange}

                        placeholder="Type your answer here..."

                        rows="10"

                        style={{
                            width: "100%",
                            padding: "15px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            resize: "none",
                            fontSize: "16px",
                            marginBottom: "30px"
                        }}

                    />

                    {/* BUTTONS */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between"
                        }}
                    >

                        {currentQuestion > 0 && (

                            <button
                                onClick={previousQuestion}
                                style={buttonStyle}
                            >
                                Previous
                            </button>

                        )}

                        {currentQuestion
                            === questions.length - 1
                            ? (

                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        ...buttonStyle,
                                        background: "#16a34a"
                                    }}
                                >
                                    Submit
                                </button>

                            ) : (

                                <button
                                    onClick={nextQuestion}
                                    style={buttonStyle}
                                >
                                    Next
                                </button>

                            )}

                    </div>

                </div>
                {showExitModal && (

                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background:
                                "rgba(0,0,0,0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000
                        }}
                    >

                        <div
                            style={{
                                background: "white",
                                padding: "30px",
                                borderRadius: "12px",
                                width: "400px",
                                textAlign: "center"
                            }}
                        >

                            <h2>
                                Exit Interview
                            </h2>

                            <p
                                style={{
                                    marginTop: "15px",
                                    marginBottom: "25px"
                                }}
                            >
                                Your progress will be lost.
                                <br />
                                Are you sure?
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "15px"
                                }}
                            >

                                <button
                                    onClick={() =>
                                        setShowExitModal(false)
                                    }
                                    style={{
                                        ...buttonStyle,
                                        background: "#64748b"
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/dashboard")
                                    }
                                    style={{
                                        ...buttonStyle,
                                        background: "#ef4444"
                                    }}
                                >
                                    Exit Interview
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

const cardStyle = {

    background: "white",
    padding: "35px",
    borderRadius: "15px",
    boxShadow:
        "0 4px 20px rgba(0,0,0,0.05)",
    maxWidth: "950px"
};

const buttonStyle = {

    padding: "14px 24px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
};


export default InterviewPage;