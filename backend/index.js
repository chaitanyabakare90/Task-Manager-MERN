require("dotenv").config();

const express = require("express");
const connection = require("./dbconfig")
const cors = require("cors");
const Tasks = require("./models/tasks.js")
const User = require("./models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifytoken.js");
const app = express();

connection();

app.use(cors());
app.use(express.json()); //"If a request contains JSON data, convert it into a JavaScript object and store it in req.body."
app.use(express.urlencoded({ extended: true })); // to handle form data in html forms not react forms


//signup
app.post("/signup", async (req, res) => {
    try {
        const user = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({
            email: user.email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email Already Exist"
            })
        }
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({
            message: "User Saved Successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }

})

//login

app.post("/login",async(req,res) =>{
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                message : "Email Does Not Exist"
            })
        }
        const isMatch = await bcrypt.compare(password,existingUser.password);

        if(isMatch === false){
            return res.status(400).json({
                message : "Wrong Password"
            })
        } 
        const jwttoken = jwt.sign(
            {
                id : existingUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "1h"
            }
        )
        res.status(200).json({
            message: "Login Successful",
            token: jwttoken
        });
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
})

//Add a new Task
app.post("/tasks", verifyToken ,async (req, res) => {
    try {
        const task = new Tasks({
            title : req.body.title,
            description : req.body.description,
            owner : req.user.id
        });
        await task.save();

        console.log(task);

        res.status(201).json({
            message: "Tasks Deleted successfully",
            task
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

})

//Find All the tasks
app.get("/tasks", verifyToken ,async (req, res) => {
    try {
        const tasks = await Tasks.find({
            owner : req.user.id
        });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

//Delete Multiple items 

app.delete("/delete/multiple",verifyToken ,async (req, res) => {
    try {
        const { ids } = req.body;
        await Tasks.deleteMany({
            _id: { $in: ids },
            owner: req.user.id
        });

        res.status(200).json({
            message: "Tasks deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

//Delete the task
app.delete("/delete/:id", verifyToken ,async (req, res) => {
    try {
        const { id } = req.params;
        await Tasks.findByIdAndDelete({
            _id : id,
            owner : req.user.id
        });
        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        })
    }
})


//Get a single task
app.get("/tasks/:id", verifyToken ,async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Tasks.findById({
            _id : id,
            owner : req.user.id
        });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

//Update the task

app.put("/tasks/:id", verifyToken ,async (req, res) => {
    try {
        const task = await Tasks.findByIdAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id
            },
            req.body,
            { new: true }
        );

        res.status(200).json(task);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});



app.listen(8080, () => {
    console.log("app is listening");
})