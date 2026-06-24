require("dotenv").config();

const express = require("express");
const connection = require("./dbconfig")
const cors = require("cors");
const Tasks = require("./models/tasks.js")

const app = express();

connection();

app.use(cors());
app.use(express.json()); //"If a request contains JSON data, convert it into a JavaScript object and store it in req.body."
app.use(express.urlencoded({extended:true})); // to handle form data in html forms not react forms


app.post("/tasks", async (req,res) => {
    try {
        const task = new Tasks(req.body);
        await task.save();

        console.log(task);

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

})

app.get("/tasks", async (req,res) =>{
    try{
        const tasks = await Tasks.find();
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({
            message : err.message
        });
    }
})


app.delete("/delete/:id",async (req,res) =>{
    try{
        const {id} = req.params;
        await Tasks.findByIdAndDelete(id);
        res.status(200).json({
            message: "Task deleted successfully"
        }); 

    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
})

app.listen(8080,() => {
    console.log("app is listening");
})