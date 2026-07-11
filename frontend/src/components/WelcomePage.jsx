import { Link } from "react-router-dom";
import "../style/WelcomePage.css";

export default function WelcomePage() {
    return (
        <div className="welcome-page">
            <div className="welcome-content">
                <div className="welcome-badge">
                    <span className="welcome-badge-dot"></span>
                    Your personal task manager
                </div>

                <h1 className="welcome-title">
                    Stay focused,<br />
                    <span className="gradient-text">get things done</span>
                </h1>

                <p className="welcome-subtitle">
                    Organize your tasks, track your progress, and accomplish your goals
                    with a beautifully simple task manager.
                </p>

                <div className="welcome-buttons">
                    <Link to="/signup" className="welcome-btn welcome-btn-primary">
                        🚀 Get Started Free
                    </Link>
                    <Link to="/login" className="welcome-btn welcome-btn-secondary">
                        Sign In →
                    </Link>
                </div>

                <div className="welcome-features">
                    <div className="feature-pill">
                        <span className="feature-pill-icon">⚡</span>
                        Lightning fast
                    </div>
                    <div className="feature-pill">
                        <span className="feature-pill-icon">🔒</span>
                        Secure auth
                    </div>
                    <div className="feature-pill">
                        <span className="feature-pill-icon">🎯</span>
                        Stay on track
                    </div>
                    <div className="feature-pill">
                        <span className="feature-pill-icon">✨</span>
                        Clean design
                    </div>
                </div>
            </div>
        </div>
    )
}