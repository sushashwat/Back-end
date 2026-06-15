import express from "express";

const app = new express();

app.listen(5100 , ()=>{
    console.log("Server is running on port 5100");
});

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 399,
    publishedYear: 1988,
    available: true,
    image: "https://picsum.photos/id/24/300/450"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    price: 599,
    publishedYear: 2018,
    available: true,
    image: "https://picsum.photos/id/28/300/450"
  }
];

app.get("/", (req,res)=>{
    res.send("Learning API's");
});

app.get("/books", (req,res)=>{
    res.send(books);
});