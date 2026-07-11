import { useEffect, useState } from "react"
import "../style/Addtask.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function UpdateTask() {
    let [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchTask() {
            try {
                const response = await axios.get(`http://localhost:8080/tasks/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setFormData(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchTask();
    }, [id]);

    let handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handlesubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8080/tasks/${id}`, formData);
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
                <div className="form-icon-wrap">✏️</div>
                <h1 className="form-title">Update Task</h1>
                <p className="form-subtitle">Edit your task details below</p>

                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Task Title</label>
                        <input
                            className="form-input"
                            name="title"
                            type="text"
                            placeholder="Task title"
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
                            placeholder="Task description..."
                            onChange={handleInputChange}
                            value={formData.description}
                        />
                    </div>

                    <button type="submit" className="form-submit-btn" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes →"}
                    </button>
                </form>
            </div>
        </div>
    )
}