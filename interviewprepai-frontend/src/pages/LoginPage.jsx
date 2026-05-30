import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

function LoginPage() {
const navigate = useNavigate();

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const handleLogin = async () => {

    try {

        setLoading(true);

        setError("");

        const response =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );
        console.log(response.data.token);
        localStorage.setItem(
            "token",
            response.data.token
        );

        navigate("/dashboard");

    } catch (err) {

        setError(
            "Invalid email or password"
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
                    width: "400px",
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
                    Login
                </h1>

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
                        placeholder="Enter your password"
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

                {/* BUTTON */}

                <button
                    onClick={handleLogin}
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
                     ? "Logging in..."
                     : "Login"
                 }

                </button>

                {/* REGISTER LINK */}

                <p
                    style={{
                        marginTop: "25px",
                        textAlign: "center"
                    }}
                >

                    Don’t have an account?

                    <Link
                        to="/register"
                        style={{
                            color: "#2563eb",
                            marginLeft: "5px",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default LoginPage;