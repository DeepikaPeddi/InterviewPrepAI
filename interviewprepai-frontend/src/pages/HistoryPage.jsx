import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function HistoryPage() {

    const navigate = useNavigate();

 const [historyData, setHistoryData]
     = useState([]);

 const [loading, setLoading]
     = useState(true);
useEffect(() => {

    loadHistory();

}, []);
const handleDeleteInterview =
    async (sessionId) => {

        try {

            await api.delete(
                `/resume/history/${sessionId}`
            );

            toast.success(
                "Interview deleted"
            );

            loadHistory();

        } catch (err) {

            console.error(err);

            toast.error(
                "Delete failed"
            );
        }
};
const loadHistory = async () => {

    try {

        const response =
            await api.get(
                "/resume/history"
            );

        setHistoryData(
            response.data
        );

    } catch (err) {

        console.error(err);

        toast.error(
            "Failed to load history"
        );

    } finally {

        setLoading(false);
    }
};

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

                <h1
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    Interview History
                </h1>

                {
                    historyData.map(
                        (interview) => (

                            <div
                                key={interview.sessionId}
                                style={{
                                    background: "white",
                                    padding: "25px",
                                    borderRadius: "12px",
                                    marginBottom: "20px",
                                    boxShadow:
                                        "0 4px 20px rgba(0,0,0,0.05)"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "center"
                                    }}
                                >

                                    <div>

                                        <h3>
                                            {interview.resumeName}
                                        </h3>

                                        <p>
                                            Score:
                                            {" "}
                                            {interview.score}%
                                        </p>

                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px"
                                        }}
                                    >

                                        <button
                                            onClick={() => {

                                                localStorage.setItem(
                                                    "historySessionId",
                                                    interview.sessionId
                                                );

                                                navigate("/interview-result");

                                            }}
                                            style={{
                                                background: "#2563eb",
                                                color: "white",
                                                border: "none",
                                                padding: "12px 20px",
                                                borderRadius: "8px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Review Interview
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteInterview(
                                                    interview.sessionId
                                                )
                                            }
                                            style={{
                                                background: "#ef4444",
                                                color: "white",
                                                border: "none",
                                                padding: "12px 20px",
                                                borderRadius: "8px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>

    );
}

export default HistoryPage;