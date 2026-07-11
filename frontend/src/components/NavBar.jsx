import { Link, useNavigate, useLocation } from "react-router";
import "../style/NavBar.css"

export default function NavBar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <Link className="navbar-brand" to="/">
                <div className="navbar-logo-icon">✓</div>
                <span className="navbar-logo-text">TaskFlow</span>
            </Link>

            <ul className="navbar-links">
                <li>
                    <Link
                        className={`nav-link ${isActive("/list") ? "active" : ""}`}
                        to="/list"
                    >
                        My Tasks
                    </Link>
                </li>
                <li>
                    <Link
                        className={`nav-link ${isActive("/add") ? "active" : ""}`}
                        to="/add"
                    >
                        + Add Task
                    </Link>
                </li>
                {token ? (
                    <li>
                        <button
                            className="nav-link logout"
                            onClick={handleLogout}
                            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link className="nav-link" to="/signup">
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link pill-btn" to="/login">
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}