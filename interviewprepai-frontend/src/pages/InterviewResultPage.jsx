import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";


function InterviewResultPage() {
const [showAnswers, setShowAnswers]
        = useState(false);
const [resultData, setResultData]
    = useState(null);
const questions =
    resultData?.questions
        ?.split("\n")
        || [];

const answers =
    resultData?.answers
        ?.split("\n")
        || [];

useEffect(() => {

    loadInterview();

}, []);

const loadInterview = async () => {

    try {

        const sessionId =
            localStorage.getItem(
                "historySessionId"
            );

        const response =
            await api.get(
                `/resume/interview/${sessionId}`
            );

        setResultData(
            response.data
        );

    } catch (err) {

        console.error(err);

        toast.error(
            "Failed to load interview"
        );
    }
};

if (!resultData) {

    return (
        <div
            style={{
                padding: "40px"
            }}
        >
            Loading interview...
        </div>
    );
}
    return (

        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f5f7fb"
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

                <div
                    style={{
                        background: "white",
                        padding: "35px",
                        borderRadius: "12px",
                        marginTop: "25px"
                    }}
                >

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
                            gap: "40px"
                        }}
                    >

                        <div>

                            <h3>
                                Strong Topics
                            </h3>

                            <p>
                                {resultData.strongTopics}
                            </p>

                        </div>

                        <div>

                            <h3>
                                Weak Topics
                            </h3>
                               <p>
                                    {resultData?.weakTopics}
                               </p>

                        </div>

                    </div>

                    <h3
                        style={{
                            marginTop: "25px"
                        }}
                    >
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
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
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
                                                marginBottom: "25px"
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

export default InterviewResultPage;