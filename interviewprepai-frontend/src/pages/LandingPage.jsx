import { Link } from "react-router-dom";

function LandingPage() {

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                fontFamily: "Arial"
            }}
        >

            {/* NAVBAR */}

            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 50px",
                    backgroundColor: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}
            >

                <h2 style={{ color: "#2563eb" }}>
                    InterviewPrepAI
                </h2>

                <div
                    style={{
                        display: "flex",
                        gap: "15px"
                    }}
                >

                    <Link to="/login">

                        <button
                            style={{
                                padding: "10px 20px",
                                border: "1px solid #2563eb",
                                background: "white",
                                color: "#2563eb",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Login
                        </button>

                    </Link>

                    <Link to="/register">

                        <button
                            style={{
                                padding: "10px 20px",
                                border: "none",
                                background: "#2563eb",
                                color: "white",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Register
                        </button>

                    </Link>

                </div>

            </nav>

            {/* HERO SECTION */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "80px 60px",
                    gap: "50px"
                }}
            >

                {/* LEFT */}

                <div style={{ flex: 1 }}>

                    <h1
                        style={{
                            fontSize: "55px",
                            lineHeight: "70px",
                            marginBottom: "20px"
                        }}
                    >

                        AI-Powered
                        <br />

                        Interview Preparation

                    </h1>

                    <p
                        style={{
                            fontSize: "20px",
                            color: "#555",
                            lineHeight: "35px"
                        }}
                    >

                        Upload your resume,
                        practice technical interviews,
                        and receive AI-powered feedback
                        to improve your interview skills.

                    </p>

                </div>

                {/* RIGHT */}

                <div style={{ flex: 1 }}>

                    <div
                        style={{
                            background: "white",
                            borderRadius: "20px",
                            padding: "40px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h2
                            style={{
                                marginBottom: "25px",
                                color: "#2563eb"
                            }}
                        >
                            Why Choose InterviewPrepAI?
                        </h2>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}
                        >

                            <div>

                                <h3>AI Question Generation</h3>

                                <p>
                                    Generate technical interview questions
                                    based on your uploaded resume.
                                </p>

                            </div>

                            <div>

                                <h3>Interview Evaluation</h3>

                                <p>
                                    Receive AI-powered scores,
                                    feedback,
                                    strong topics,
                                    and weak topics.
                                </p>

                            </div>

                            <div>

                                <h3>Track Interview History</h3>

                                <p>
                                    Monitor your interview progress
                                    and improvement over time.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* FEATURES */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "40px",
                    marginTop: "30px"
                }}
            >

                <div>

                    <h3>Resume Based Questions</h3>

                    <p>
                        AI generates questions from your resume.
                    </p>

                </div>

                <div>

                    <h3>AI Feedback</h3>

                    <p>
                        Get strong and weak topic analysis.
                    </p>

                </div>

                <div>

                    <h3>Track Progress</h3>

                    <p>
                        View previous interview history.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default LandingPage;