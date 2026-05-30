import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";
import toast from "react-hot-toast";

function UploadResumePage() {
const navigate = useNavigate();

const [resumes, setResumes]
    = useState([]);

const [selectedResumeId,
       setSelectedResumeId]
    = useState("");

const [selectedFile,
       setSelectedFile]
    = useState(null);

const [uploadedFileName,
       setUploadedFileName]
    = useState("");

const [loading,
       setLoading]
    = useState(false);

const [error,
       setError]
    = useState("");

useEffect(() => {

    loadResumes();

}, []);

const loadResumes = async () => {

    try {

        const response =
            await api.get(
                "/resume/my-resumes"
            );

        setResumes(
            response.data
        );

        if (
            response.data.length > 0
        ) {

            setSelectedResumeId(
                response.data[0].id
            );

        }

    } catch (err) {

        console.error(err);

        setError(
            "Failed to load resumes"
        );
    }
};

const handleFileChange = (e) => {

    const file =
        e.target.files[0];

    if (!file) return;
    if (file.type !== "application/pdf") {

            toast.error(
                "Only PDF files are allowed"
            );

            return;
        }

    setSelectedFile(file);

    setUploadedFileName(
        file.name
    );
};

const handleUploadResume =
    async () => {

        if (!selectedFile) {

            toast.error(
                "Please select a PDF file"
            );

            return;
        }

        try {

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "file",
                selectedFile
            );

            await api.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            await loadResumes();

            setSelectedFile(null);

            setUploadedFileName("");

            toast.success(
                "Resume uploaded successfully"
            );

        } catch (err) {

            console.error(err);

            console.log(
                err.response?.data
            );

            if (
                err.response?.data?.message
                    ?.includes(
                        "Resume already exists"
                    )
            ) {

                toast.error(
                    "Resume already exists"
                );

            } else {

                toast.error(
                    "Upload failed"
                );
            }

        } finally {

            setLoading(false);

        }
};

const handleDeleteResume =
    async () => {

        if (!selectedResumeId) {

            toast.error(
                "Select a resume first"
            );

            return;
        }

        try {

            await api.delete(
                `/resume/${selectedResumeId}`
            );

            await loadResumes();

            toast.success(
                "Resume deleted successfully"
            );

        } catch (err) {

              console.error("DELETE ERROR");

              console.log(err.response);

              console.log(err.response?.data);

              console.log(err.response?.status);

          }
};

const handleStartInterview =
    async () => {

        if (!selectedResumeId) {

            toast.error(
                "Please select a resume"
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/resume/start-interview",
                    {
                        resumeId:
                            Number(
                                selectedResumeId
                            )
                    }
                );
            localStorage.removeItem(
                "currentQuestion"
            );

            localStorage.removeItem(
                "interviewAnswers"
            );
            localStorage.setItem(
                "sessionId",
                response.data.sessionId
            );

            localStorage.setItem(
                "questions",
                JSON.stringify(
                    response.data.questions
                )
            );

            navigate("/interview");

        } catch (err) {

            console.error(err);

            toast.error(
                "Failed to start interview"
            );

        } finally {

            setLoading(false);

        }
};
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

            {/* MAIN CONTENT */}

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
                    Upload Resume
                </h1>

                {/* UPLOAD CARD */}

                <div style={cardStyle}>

                    <h2
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        Upload New Resume
                    </h2>

                    {/* UPLOAD BOX */}

                    <div
                        style={{
                            border: "2px dashed #cbd5e1",
                            borderRadius: "12px",
                            padding: "40px",
                            textAlign: "center",
                            background: "#f8fafc"
                        }}
                    >

                        <input

                            type="file"

                            accept=".pdf"

                            style={{
                                marginBottom: "15px"
                            }}

                            onChange={handleFileChange}

                        />
                        {uploadedFileName && (

                            <p
                                style={{
                                    marginTop: "10px",
                                    color: "#2563eb",
                                    fontWeight: "bold"
                                }}
                            >
                                Uploaded:
                                {" "}
                                {uploadedFileName}
                            </p>

                        )}

                        <p
                            style={{
                                marginTop: "15px",
                                color: "#555"
                            }}
                        >
                            Only PDF files allowed

                        </p>
                        <button
                          onClick={handleUploadResume}
                             style={{
                                 marginTop: "20px",
                                 background: "#2563eb",
                                  color: "white",
                                   border: "none",
                                    padding: "12px 20px",
                                     borderRadius: "8px",
                                       cursor: "pointer"
                                          }}
                                       >
                                        {
                                        loading
                                      ? "Uploading..."
                                     : "Upload Resume"
                              }
                                 </button>

                    </div>

                </div>

                {/* SELECT RESUME */}

                <div
                    style={{
                        ...cardStyle,
                        marginTop: "30px"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        Select Resume
                    </h2>

                    {/* DROPDOWN */}

                    <select
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            marginBottom: "25px",
                            fontSize: "16px"
                        }}

                        value={selectedResumeId}

                        onChange={(e) =>
                            setSelectedResumeId(
                                e.target.value
                            )
                        }
                    >

                        {resumes.map((resume) => (

                            <option
                                key={resume.id}
                                value={resume.id}
                            >
                                {resume.resumeName}
                            </option>

                        ))}

                    </select>

                    {/* SELECTED RESUME CARD */}

                    <div
                        style={{
                            background: "#f8fafc",
                            padding: "18px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center"
                        }}
                    >

                        <div>

                            <h3>
                            {
                                resumes.find(
                                    (resume) =>
                                        resume.id ===
                                        Number(selectedResumeId)
                                )?.resumeName
                            }
                            </h3>

                            <p
                                style={{
                                    color: "#555"
                                }}
                            >
                                Selected Resume
                            </p>

                        </div>

                        {/* DELETE BUTTON */}

                        <button
                        onClick={handleDeleteResume}
                            style={{
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Delete
                        </button>

                    </div>

                    {/* START BUTTON */}

                    <button
                        onClick={handleStartInterview}
                        style={{
                            marginTop: "30px",
                            width: "100%",
                            padding: "16px",
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "17px",
                            cursor: "pointer"
                        }}
                    >
                        {
                            loading
                                ? "Loading..."
                                : "Start Interview"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}

const cardStyle = {

    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow:
        "0 4px 20px rgba(0,0,0,0.05)",
    maxWidth: "900px"
};

export default UploadResumePage;