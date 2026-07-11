import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import "../style/List.css"
import { Link } from "react-router";


export default function List() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setselectedTask] = useState([]);
    const token = localStorage.getItem("token");


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/tasks", {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    let handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/delete/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    let selectAll = (event) => {
        if (event.target.checked) {
            let items = tasks.map((item) => item._id);
            setselectedTask(items);
        } else {
            setselectedTask([]);
        }
    }

    let singleChange = (id) => {
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter((item) => item !== id);
            setselectedTask(items);
        } else {
            setselectedTask([id, ...selectedTask])
        }
    }

    let deleteMultiple = async () => {
        if (selectedTask.length === 0) return;
        try {
            await axios.delete("http://localhost:8080/delete/multiple", {
                headers: {
                    authorization: `Bearer ${token}`
                },
                data: {
                    ids: selectedTask
                }
            });
            setTasks(prevTasks =>
                prevTasks.filter((task) => !selectedTask.includes(task._id))
            );
            setselectedTask([]);
        } catch (err) {
            console.log(err);
        }
    }

    const allSelected = tasks.length > 0 && selectedTask.length === tasks.length;

    return (
        <div className="list-page">
            {/* Header */}
            <div className="list-page-header">
                <div className="list-page-title-wrap">
                    <h1 className="list-page-title">My Tasks</h1>
                    <p className="list-page-count">
                        <span>{tasks.length}</span> task{tasks.length !== 1 ? "s" : ""} total
                        {selectedTask.length > 0 && ` · ${selectedTask.length} selected`}
                    </p>
                </div>

                <div className="list-header-actions">
                    <button
                        onClick={deleteMultiple}
                        className="btn-delete-selected"
                        disabled={selectedTask.length === 0}
                    >
                        🗑 Delete Selected
                    </button>
                    <Link to="/add" className="btn-add-task">
                        + New Task
                    </Link>
                </div>
            </div>

            {/* Select All Controls */}
            {tasks.length > 0 && (
                <div className="list-controls">
                    <input
                        className="select-all-checkbox"
                        onChange={selectAll}
                        checked={allSelected}
                        type="checkbox"
                        id="select-all"
                    />
                    <label className="select-all-label" htmlFor="select-all">
                        {allSelected ? "Deselect all" : "Select all tasks"}
                    </label>
                </div>
            )}

            {/* Empty State */}
            {tasks.length === 0 && (
                <div className="list-empty">
                    <div className="list-empty-icon">📋</div>
                    <h2 className="list-empty-title">No tasks yet</h2>
                    <p className="list-empty-subtitle">Create your first task to get started!</p>
                </div>
            )}

            {/* Task Cards Grid */}
            <div className="task-grid">
                {tasks.map((task, index) => (
                    <div
                        key={task._id}
                        className={`task-card ${selectedTask.includes(task._id) ? "selected" : ""}`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="task-card-header">
                            <div className="task-card-left">
                                <input
                                    className="task-checkbox"
                                    onChange={() => singleChange(task._id)}
                                    checked={selectedTask.includes(task._id)}
                                    type="checkbox"
                                />
                                <span className="task-number">#{index + 1}</span>
                                <div className="task-title-wrap">
                                    <h2 className="task-card-title">{task.title}</h2>
                                    {task.description && (
                                        <p className="task-card-description">{task.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="task-card-actions">
                            <Link to={`/update/${task._id}`} className="btn-task-update">
                                ✏️ Edit
                            </Link>
                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="btn-task-delete"
                            >
                                🗑 Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}