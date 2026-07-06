import { Link } from "react-router-dom";
import "../style/WelcomePage.css";

export default function WelcomePage() {
    return (
        <div className="welcome-container">
            <div className="welcome-card">
                <h1>Task Manager</h1>

                <p>
                    Organize your tasks, stay productive, and accomplish your goals
                    with ease.
                </p>

                <div className="welcome-buttons">
                    <Link to="/signup" className="welcome-btn signup-btn">
                        Get Started
                    </Link>

                    <Link to="/login" className="welcome-btn login-btn">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}