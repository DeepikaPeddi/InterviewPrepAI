import {
    FaHome,
    FaUpload,
    FaHistory,
    FaClipboardList,
    FaSignOutAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
const navigate = useNavigate();

const [showLogoutModal, setShowLogoutModal]
    = useState(false);

const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

};
    return (

        <div
            style={{
                width: "250px",
                minHeight: "100vh",
                background: "#0f172a",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "25px 20px",
                boxSizing: "border-box"
            }}
        >

            {/* TOP */}

            <div>

                <h2
                    style={{
                        marginBottom: "40px"
                    }}
                >
                    InterviewPrepAI
                </h2>

                {/* MENU */}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >

                    <Link
                        to="/dashboard"
                        style={linkStyle}
                    >
                        <FaHome />
                        Dashboard
                    </Link>

                    <Link
                        to="/upload-resume"
                        style={linkStyle}
                    >
                        <FaUpload />
                        Upload Resume
                    </Link>

                    <Link
                        to="/interview"
                        style={linkStyle}
                    >
                        <FaClipboardList />
                        Interview
                    </Link>

                    <Link
                        to="/history"
                        style={linkStyle}
                    >
                        <FaHistory />
                        History
                    </Link>

                </div>

            </div>

            {/* LOGOUT */}

            <button
                onClick={() =>
                    setShowLogoutModal(true)
                }
                style={{
                    background: "transparent",
                    border: "1px solid #334155",
                    color: "white",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >

                <FaSignOutAlt />

                Logout

            </button>
{showLogoutModal && (

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
                width: "400px",
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center"
            }}
        >

            <h2
                style={{
                    marginBottom: "15px",
                    color: "#111827"
                }}
            >
                Logout
            </h2>

            <p
                style={{
                    color: "#475569",
                    marginBottom: "25px"
                }}
            >
                Are you sure you want to logout?
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
                        setShowLogoutModal(false)
                    }
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: "#64748b",
                        color: "white"
                    }}
                >
                    Cancel
                </button>

                <button
                    onClick={handleLogout}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: "#ef4444",
                        color: "white"
                    }}
                >
                    Logout
                </button>

            </div>

        </div>

    </div>

)}
        </div>
    );
}

const linkStyle = {

    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    background: "#1e293b"
};

export default Sidebar;