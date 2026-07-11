import { useState } from "react"
import "../style/Addtask.css"
import axios from "axios"
import { Link } from "react-router"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    let [formData, setFormData] = useState({
        name: "",
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, formData);
            console.log(response.data);
            setFormData({ name: "", email: "", password: "" })
            navigate("/login")
        } catch (err) {
            setError("Signup failed. Please try again.");
            console.log(err.message)
        }
    }

    return (
        <div className="form-page">
            <div className="form-card">
                <div className="form-icon-wrap">✨</div>
                <h1 className="form-title">Create account</h1>
                <p className="form-subtitle">Start organizing your tasks today</p>

                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="Name">Full Name</label>
                        <input
                            className="form-input"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            id="Name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

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
                            placeholder="Create a strong password"
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
                        Create Account →
                    </button>
                </form>

                <div className="form-footer">
                    Already have an account?
                    <Link to="/login" className="form-footer-link">Sign in</Link>
                </div>
            </div>
        </div>
    )
}