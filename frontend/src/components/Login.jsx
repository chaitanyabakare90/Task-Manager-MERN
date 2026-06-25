import { useState } from "react"
import "../style/Addtask.css"
import axios from "axios"
import { Link } from "react-router";

export default function Login() {
    let [formData, setFormData] = useState({
        email: "",
        password:""
    })

    let handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handlesubmit = async (event)=>{
        event.preventDefault();
    }

    return (
        <div className="container" >
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" placeholder="Enter Your Email" value={formData.email} id="email" onChange={handleInputChange} />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Enter Your Password" value={formData.password} id="password" onChange={handleInputChange} />
                <button type="submit" className="submit">Login</button>
                <Link to= "/signup">SignUp</Link>
            </form>
        </div>
    )
}