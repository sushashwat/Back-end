const mongoose = require("mongoose");
const express = require("express")
const app = express()
const User = require("./User")
mongoose.connect("mongodb://localhost:27017");

const jwt = require("jsonwebtoken");
app.use(express.json());

app.listen(5100, () => {
    console.log("Server is running on port 5100");
});

const db = mongoose.connection;

db.on("open", ()=> {
    console.log("Connection Successful");
});

db.on("error", ()=>{
    console.log("Connect was not succesfull");
});

const newUser = new User({
    name:"Shashwat",
    age:21,
    isAdult: true,
    hobbies: ["teaching"],
});

newUser.save().then(data =>{
    console.log(data);
});

 User.create({
    name:"Arya",
    age:23,
    hobbies:["Reading"],
}).then((user2)=>{
    console.log(user2);
});

User.find()
    .then((users) => {
        console.log(users);
    })
    .catch((err) => {
        console.log(err);
    });
   (async () => {
    const users = await User.find();
    console.log(users);
})();

User.create({
    name: "ABC",
}).then((user4) => {
    console.log(user4);
});

app.post("/login",(req,res)=>{
    const user = req.body.username;
    const accessToken= jwt.sign(user, "secretKey");
    res.send({token: accessToken});
})