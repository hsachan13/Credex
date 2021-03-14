const express = require('express');
const mongoose = require('mongoose');
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;


//express.json is a method in express to recognize the incoming request obj. as a JSON obj.
app.use(express.json());


//const url = 'mongodb://localhost/CredexTech'
//mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});


//    create a new student


//app.get("/", function (req, res) {
//    res.send("hello");
//})
//con.on('open', function () {
//    console.log('connected...')
//})

app.post("/students", function (req, res) {
    console.log(req.body);
    const user = new Student(req.body);

    user.save().then(function () {
        res.send(user);
    }).catch(function (e) {
        res.status(400).send(e);
    })
})

//by using async
//app.post('/students', async(req, res) => {
//    try {
//        const user = new Student(req.body);
//        const saved = await user.save();
//        res.send(saved);

//    } catch (e) {
//        res.send(e);
//    }
//})


app.get("/students", async (req, res) =>{
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

//get indivisual Students
app.get("/students/:id", async(req,res) => {
    try{
        const id = req.params.id;

       const studentData= await Student.findById(id);
        res.send(studentData);
    }
    catch(e) {
        res.send(e);
    }
})

//updating 

app.patch("/students/:name", async (req, res) => {
    try {
        const id = req.params.name;
        const updating = await Student.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.send(updating);
    }
    catch (e) {
        res.send(e);
    }
})
//delete
app.delete("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleting=await Student.findByIdAndDelete(id);
        if (!req.params.id) {
            return res.send(400).send();
        }
        res.send(deleting);
    } catch (e) {
        res.status(500).send(e);
    }
})



app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT 8000");
})
