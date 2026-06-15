import express from "express";

const app = new express();

app.listen(5100 , ()=>{
    console.log("Server is running on port 5100");
});

app.use(express.json());

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

// Fetching Books Data
app.get("/books", (req,res)=>{
    res.send(books);
});

app.post("/book",(req,res)=>{
    const{ id,
    title,
    author,
    genre,
    price,
    publishedYear,
    available,
    image } = req.body;

    const newBook = {
      id: id,
      title: title,
      author: author,
      genre: genre,
      price: price,
      publishedYear: publishedYear,
      available: available,
      image: image
    };

    books.push(newBook);
    res.send(books);

});