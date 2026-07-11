import { useState } from "react"
import "../style/Addtask.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddTask() {
    let [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handlesubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/tasks", formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setFormData({ title: "", description: "" })
            navigate("/list");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-page">
            <div className="form-card">
                <div className="form-icon-wrap">📝</div>
                <h1 className="form-title">New Task</h1>
                <p className="form-subtitle">Add a new task to your list</p>

                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Task Title</label>
                        <input
                            className="form-input"
                            name="title"
                            type="text"
                            placeholder="What needs to be done?"
                            value={formData.title}
                            id="title"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                            className="form-textarea"
                            rows={4}
                            name="description"
                            id="description"
                            placeholder="Add any details or notes about this task..."
                            onChange={handleInputChange}
                            value={formData.description}
                        />
                    </div>

                    <button type="submit" className="form-submit-btn" disabled={loading}>
                        {loading ? "Adding..." : "Add Task →"}
                    </button>
                </form>
            </div>
        </div>
    )
}