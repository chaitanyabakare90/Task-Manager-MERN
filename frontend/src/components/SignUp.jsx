import { useState } from "react"
import "../style/Addtask.css"
import axios from "axios"
import { Link } from "react-router";
import { useNavigate } from "react-router-dom"


export default function SignUp() {
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password:""
    })
    const navigate = useNavigate();
    let handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handlesubmit = async (event)=>{
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/signup",formData);
            console.log(response.data);

            setFormData({
                name : "",
                email : "",
                password : "",
            })
            navigate("/login")
        }catch(err){
            console.log(err.message)
        }
    }

    return (
        <div className="container" >
            <h1>SignUp</h1>
            <form onSubmit={handlesubmit}>
                <label htmlFor="Name">Name</label>
                <input name="name" type="text" placeholder="Enter Your Name" value={formData.name} id="Name" onChange={handleInputChange} />
                <label htmlFor="email">Email</label>
                <input name="email" type="email" placeholder="Enter Your Email" value={formData.email} id="email" onChange={handleInputChange} />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Enter Your Password" value={formData.password} id="password" onChange={handleInputChange} />
                <button type="submit" className="submit">SignUp</button>
                <Link to= "/login">Login</Link>
            </form>
        </div>
    )
}