import { Link } from "react-router";
import "../style/NavBar.css"

export default function NavBar(){
    return (
        <nav className="NavBar">
            <div className="logo"><h2>To Do App</h2></div>
            <ul>
                <li><Link className="nav-links" to="/list">List</Link></li>
                <li><Link className="nav-links" to="/add">Add Task</Link></li>
                <li><Link className="nav-links" to="/signup">Signup</Link></li>
                <li><Link className="nav-links" to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}