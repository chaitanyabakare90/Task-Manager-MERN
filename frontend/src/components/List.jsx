import { Fragment, useEffect,useState } from "react"
import axios from "axios"
import "../style/List.css"
import { Link } from "react-router";


export default function List(){
    const [tasks,setTasks] = useState([]);
    const [selectedTask,setselectedTask] = useState([]);

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
            let response = await axios.delete(`http://localhost:8080/delete/${id}`);
             setTasks(prevTasks =>
                prevTasks.filter(
                    task => task._id !== id
                )
            );
        }catch(err){
            console.log(err);
        }
    }

    let selectAll = (event) =>{
        if(event.target.checked){
            let items = tasks.map((item) => item._id);
            setselectedTask(items);
        }else{
            setselectedTask([]);
        }
    }

    let singleChange = (id) =>{
        if(selectedTask.includes(id)){
            let items = selectedTask.filter((item) => item !== id);
            setselectedTask(items);
        } else{
            setselectedTask([id,...selectedTask])
        }
    }

    return (
        <div>
            <h1>To Do List</h1>
            <ul className="task-list">
                <li className="list-header"><input onChange={selectAll} type="checkbox" /></li>
                <li className="list-header">S.NO</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                <li className="list-header">Action</li>
            {
                tasks.map((task,index) => (
                    <Fragment key={task._id}>
                        <li className="list-item"><input onChange={() => singleChange(task._id)}  checked={selectedTask.includes(task._id)} type="checkbox" /></li>
                        <li className="list-item">{index+1}</li>
                        <li className="list-item">{task.title}</li>
                        <li className="list-item">{task.description}</li>
                        <li className="list-item">
                            <button onClick={() => handleDeleteTask(task._id)} className="delete-item">Delete</button>
                            <Link  to={`/update/${task._id}`} className="update-item">Update</Link>
                        </li>
                        
                    </Fragment>
                ))
            }
            </ul>
        </div>
    )
}