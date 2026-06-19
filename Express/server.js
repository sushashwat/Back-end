import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
const app =  express();

app.use(express.json());
app.use(bodyParser.json());


app.use((req,res,next)=>{
  console.log(req.method);
  next();
}, (req,res,next) => {  
  console.log("coming to next middleware");
  next();

 }
); 

const router = express.Router();
app.use("/", router);



app.listen(5100 , ()=>{
    console.log("Server is running on port 5100");
});


router.use((req,res, next)=>{
  console.log("Request", req.method)
  next();
});

router.get("/user", (req,res) =>{
  console.log("User path on router instance");
  res.send("Hello");
});

function logger(req,res,next){
  console.log("Logging Request");
  next();
}

router.get("/user/:id", logger, (req,res)=>{
  console.log("User With Some id");
  res.send("userid")
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

// Fetching Books Data
app.get("/books", authenticateUser, (req,res)=>{
    res.send(books);
});

app.post("/books",(req,res)=>{
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

// Updating any particular book by id 

app.put("/book/:id",(req,res) =>{
  const bookId =  req.params.id;

  const book = books.find(book => book.id == bookId);

  if(!book){
    return res.status(404).json({message:"Book with this id doesnot exist"})
  }

  const keys = Object.keys(req.body);

  keys.forEach(key => {
    book[key] = req.body[key];
  });

  res.send(books);

});

// Delete any Particular Book 
app.delete("/book/:id", (req,res)=>{
  const bookId = req.params.id;

  const book = books.find(book => book.id == bookId);

  if(!book){
    return res.status(404).json({message: "Book Not Found"});
  }

  const filteredBooks=books.filter((book) => book.id !=bookId);

  res.send(filteredBooks);
});

// Built-In Middlewares
// express.static, express.urlencoded

// Third-Party Middlewares
// bodyparser


router.post("/login",(req,res)=>{
  console.log(req.body);
    const user = {
      username: req.body.username};

    const accessToken= jwt.sign({user:user}, "secretKey",
       {
        expiresIn: "5m"
       });
    res.send({token: accessToken});
});

function authenticateUser(req, res, next) {
  console.log("=== MIDDLEWARE TRIGGERED ==="); // Log 1
  
  const authHeader = req.headers['authorization'];
  console.log("Auth Header Received:", authHeader); // Log 2

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Extracted Token:", token); // Log 3

  if (!token) {
    console.log("No token found! Sending 401..."); // Log 4
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) {
      console.log("Token verification failed! Sending 403..."); // Log 5
      return res.status(403).json({ message: "Invalid JWT token" });
    }
    
    console.log("Token completely valid! Moving to route..."); // Log 6
    req.user = user; 
    next();
  });
}             