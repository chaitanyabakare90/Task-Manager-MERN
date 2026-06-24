import { Fragment, useEffect,useState } from "react"
import axios from "axios"
import "../style/List.css"


export default function List(){
    const [tasks,setTasks] = useState([]);

    useEffect(() =>{
        async function fetchData(){
            try{
                const response = await axios.get("http://localhost:8080/tasks");
                setTasks(response.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);

    let handleDeleteTask = async (id)=>{
        try{
            let response = await axios.delete(`http://localhost:8080/tasks/${id}`);
             setTasks(prevTasks =>
                prevTasks.filter(
                    task => task._id !== id
                )
            );
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <h1>To Do List</h1>
            <ul className="task-list">
                <li className="list-header">S.NO</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                <li className="list-header">Action</li>

            {
                tasks.map((task,index) => (
                    <Fragment key={task._id}>
                        <li className="list-item">{index+1}</li>
                        <li className="list-item">{task.title}</li>
                        <li className="list-item">{task.description}</li>
                        <li className="list-item"><button onClick={() => handleDeleteTask(task._id)} className="delete-item">Delete</button></li>
                    </Fragment>
                ))
            }
            </ul>
        </div>
    )
}