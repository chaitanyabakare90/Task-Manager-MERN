import { useState } from "react"
import "../style/Addtask.css"
import axios from "axios"
import { Link } from "react-router"
import { useNavigate } from "react-router-dom"

export default function Login() {
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const navigate = useNavigate();

    let handleInputChange = (event) => {
        setError("");
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handlesubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            localStorage.setItem("token", response.data.token);
            setFormData({ email: "", password: "" })
            navigate("/list");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
            console.log(err.message);
        }
    }

    return (
        <div className="form-page">
            <div className="form-card">
                <div className="form-icon-wrap">🔑</div>
                <h1 className="form-title">Welcome back</h1>
                <p className="form-subtitle">Sign in to your TaskFlow account</p>

                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            className="form-input"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            id="email"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-input"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            id="password"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {error && (
                        <p style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: "12px", textAlign: "center" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="form-submit-btn">
                        Sign In →
                    </button>
                </form>

                <div className="form-footer">
                    Don't have an account?
                    <Link to="/signup" className="form-footer-link">Sign up free</Link>
                </div>
            </div>
        </div>
    )
}