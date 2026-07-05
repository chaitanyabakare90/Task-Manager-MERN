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
    const navigate = useNavigate();
    const {id} = useParams();
    const token = localStorage.getItem("token"); 
    
    useEffect(() =>{
        async function fetchTask() {
            try{
                const response = await axios.get(`http://localhost:8080/tasks/${id}`,{
                    headers :{
                        authorization : `Bearer ${token}`
                    }
                });
                setFormData(response.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchTask();
    },[id]);


    let handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handlesubmit = async (event)=>{
        event.preventDefault();
        try{
            const response = await axios.put(`http://localhost:8080/tasks/${id}`,formData);
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
            <h1>Update Task</h1>
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
                <button type="submit" className="submit">Update task</button>
            </form>
        </div>
    )
}