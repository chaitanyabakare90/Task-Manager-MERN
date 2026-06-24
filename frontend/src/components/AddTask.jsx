import { useState } from "react"
import "../style/Addtask.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddTask() {
    let [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const navigate = useNavigate();

    let handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handlesubmit = async (event)=>{
        event.preventDefault();

        // METHOD-1 To Connect Frontend and Backend
        // try{
        //     let response = await fetch("http://localhost:8080/tasks",{
        //         method : "POST",
        //         body : JSON.stringify(formData),
        //         headers :{
        //             "Content-Type": "application/json"
        //         }
        //     }) 
        //     setFormData({
        //         title: "",
        //         description: ""
        //     })
        // }catch(err){
        //     console.log(err);
        // }

        //Method-2 
        try{
            const response = await axios.post("http://localhost:8080/tasks",formData);
            console.log(response.data);
            setFormData({
                    title: "",
                    description: ""
                })
            navigate("/list");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="container" >
            <h1>Add new Task</h1>
            <form onSubmit={handlesubmit}>
                <label htmlFor="title">Title</label>
                <input name="title" type="text" placeholder="add new task" value={formData.title} id="title" onChange={handleInputChange} />
                <label htmlFor="description">Description</label>
                <textarea
                    rows={4}
                    name="description"
                    id="description"
                    placeholder="Enter task description"
                    onChange={handleInputChange}
                    value={formData.description}
                >
                </textarea>
                <button type="submit" className="submit">Add new task</button>
            </form>
        </div>
    )
}