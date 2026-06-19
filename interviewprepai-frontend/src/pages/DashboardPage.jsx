import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import useMobile from "../hooks/useMobile";

function DashboardPage() {
    const isMobile = useMobile();

        const [dashboardData, setDashboardData]
            = useState(null);

const [loading, setLoading]
    = useState(true);
useEffect(() => {

    loadDashboard();

}, []);

const loadDashboard = async () => {

    try {

        const response =
            await api.get(
                "/resume/dashboard"
            );

        setDashboardData(
            response.data
        );

    } catch (err) {

        console.error(err);

        toast.error(
            "Failed to load dashboard"
        );

    } finally {

        setLoading(false);
    }
};
if (loading) {

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
                Loading Dashboard...
            </div>

        </div>

    );
}
    return (

        <div
            style={{
                display: "flex",
                flexDirection: isMobile
                    ? "column"
                    : "row",
                background: "#f5f7fb",
                minHeight: "100vh",
                fontFamily: "Arial"
            }}
        >

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div
                style={{
                    flex: 1,
                    padding: isMobile
                        ? "15px"
                        : "35px"
                }}
            >

                {/* TITLE */}

                <h1
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    Dashboard
                </h1>

                {/* STATS CARDS */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            isMobile
                                ? "1fr"
                                : "repeat(4, 1fr)",
                        gap: "20px",
                        marginBottom: "35px"
                    }}
                >

                    <StatCard
                        title="Total Interviews"
                        value={
                            dashboardData.totalInterviews
                        }
                    />

                    <StatCard
                        title="Latest Score"
                        value={`${dashboardData.latestScore}%`}
                    />

                    <StatCard
                        title="Latest Strength"
                        value={
                            dashboardData.latestStrongTopics
                                ?.split(",")
                                .slice(0, 2)
                                .join(", ")
                        }
                    />

                    <StatCard
                        title="Need Improvement"
                        value={
                            dashboardData.latestWeakTopics
                                ?.split(",")
                                .slice(0, 2)
                                .join(", ")
                        }
                    />

                </div>

                {/* LAST INTERVIEW SUMMARY */}

                <div
                    style={{
                        ...cardStyle,
                        maxWidth: "900px"
                    }}
                >

                    <h2>
                        Performance Overview
                    </h2>

                    <p>
                        Total Interviews Taken:
                        {" "}
                        {dashboardData.totalInterviews}
                    </p>

                    <p>
                        <strong>Latest Score:</strong>
                        {" "}
                        {dashboardData.latestScore}%
                    </p>

                </div>

            </div>

        </div>
    );
}

/* STAT CARD */

function StatCard({ title, value }) {

    return (

        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow:
                    "0 4px 20px rgba(0,0,0,0.05)"
            }}
        >

            <h3
                style={{
                    color: "#555",
                    marginBottom: "12px"
                }}
            >
                {title}
            </h3>

            <h2
                style={{
                    color: "#2563eb",
                    fontSize: title === "Latest Score"
                        || title === "Total Interviews"
                        ? "42px"
                        : "18px",
                    lineHeight: "1.4",
                    wordBreak: "break-word",
                    margin: 0
                }}
            >
                {value}
            </h2>

        </div>
    );
}

const cardStyle = {

    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow:
        "0 4px 20px rgba(0,0,0,0.05)"
};

export default DashboardPage;