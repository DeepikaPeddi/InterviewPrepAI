import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function RegisterPage() {
const navigate = useNavigate();

const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const [success, setSuccess] = useState("");
const handleRegister = async () => {

    try {

        setLoading(true);

        setError("");

        setSuccess("");
        const registerEmail = email;
        const registerPassword = password;
        const response = await api.post(
            "/auth/register",
            {
                name,
                email: registerEmail,
                password: registerPassword
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );

        console.log(
            response.data.token
        );




        toast.success(
            "Registration successful"
        );

        navigate("/dashboard");

    } catch (err) {

          console.log(err);

          console.log(err.response);

          console.log(err.response?.data);

          setError(
              "Registration failed"
          );

      } finally {

        setLoading(false);

    }

};
    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f7fb",
                fontFamily: "Arial"
            }}
        >

            <div
                style={{
                    width: "420px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "35px"
                    }}
                >
                    Register
                </h1>

                {/* FULL NAME */}

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label>Full Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter your full name"
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "8px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />

                </div>

                {/* EMAIL */}

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "8px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />

                </div>

                {/* PASSWORD */}

                <div
                    style={{
                        marginBottom: "30px"
                    }}
                >

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Create a password"
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "8px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />

                </div>

{
    error && (

        <p
            style={{
                color: "red",
                marginBottom: "15px"
            }}
        >
            {error}
        </p>

    )
}

{
    success && (

        <p
            style={{
                color: "green",
                marginBottom: "15px"
            }}
        >
            {success}
        </p>

    )
}
                {/* BUTTON */}

                <button
                    onClick={handleRegister}
                    style={{
                        width: "100%",
                        padding: "14px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    {
                        loading
                            ? "Registering..."
                            : "Register"
                    }
                </button>

                {/* LOGIN LINK */}

                <p
                    style={{
                        marginTop: "25px",
                        textAlign: "center"
                    }}
                >

                    Already have an account?

                    <Link
                        to="/login"
                        style={{
                            color: "#2563eb",
                            marginLeft: "5px",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default RegisterPage;