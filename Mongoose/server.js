const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", ()=> {
    console.log("Connection Successful");
});

db.on("error", ()=>{
    console.log("Connect was not succesfull");
});