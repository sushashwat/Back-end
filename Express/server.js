import express from "express";

const app = new express();

app.listen(5100 , ()=>{
    console.log("Server is running on port 5100");
});