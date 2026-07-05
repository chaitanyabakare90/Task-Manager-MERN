import { Link,useNavigate } from "react-router";
import "../style/NavBar.css"

export default function NavBar(){
    const token  = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="NavBar">
            <div className="logo"><h2>To Do App</h2></div>
            <ul>
                <li><Link className="nav-links" to="/list">List</Link></li>
                <li><Link className="nav-links" to="/add">Add Task</Link></li>
                {token ? (
                    <li>
                        <Link
                            className="nav-links"
                            to="/login"
                            onClick={handleLogout}
                        >
                            Logout
                        </Link>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link className="nav-links" to="/signup">
                                Signup
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-links" to="/login">
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}