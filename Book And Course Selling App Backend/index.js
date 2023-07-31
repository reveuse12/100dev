const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

let Admin = [];
let Books = [];
let User = [];

const AdminAuth = (req, res, next) => {
  const { username, password } = req.body;
  const AlreadyAdmin = Admin.find(
    (a) => a.username === username && a.password === password
  );
  if (AlreadyAdmin) {
    res.json({ message: "Admin Authenticated" });
    next();
  } else {
    res.json({ message: "Cannot Authenticate Admin" });
  }
};

app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body; // Fixed bug: Defined variables username and password
  const alreadyAdmin = Admin.find((a) => a.username === username && a.password === password);
  if (alreadyAdmin) {
    res.json({ message: "Already an admin sign in" });
  }
  Admin.push(req.body); // Changed 'user' to 'req.body'
  res.json({ message: "Admin created successfully" });
  console.log(Admin);
});

app.post("/admin/login", AdminAuth, (req, res) => {
  res.json({ message: "Admin logged in successfully" });
});

app.post("/admin/createbook", (req, res) => {
  const book = req.body;
  book.id = Date.now();
  Books.push(book);
  console.log(Books);
  res.json({ message: "Book created successfully!!", BookId: book.id });
});

app.put("/admin/createbook/:BookId", (req, res) => {
  const BookId = parseInt(req.params.BookId);
  const book = Books.find((b) => b.id === BookId);
  if (book) {
    Object.assign(book, req.body);
    res.json({ message: "Book updated successfully" });
    console.log(Books);    
  } else {
    res.json({ message: "Cannot update book" });
  }
});

app.get("/admin/book", (req, res) => {
  res.json({ message: Books });
});



//user 


const UserAuth = (req, res, next) => {
  const { username, password } = req.body;
  const alreadyUser = User.find(
    (u) => u.username === username && u.password === password
  );
  if (alreadyUser) {
    res.json({ message: "User authenticated" }); // Fixed typo: Changed 'josn' to 'json'
    next();
  } else {
    res.json({ message: "User cannot authenticate" });
  }
};

app.post("/user/signup", (req, res) => {
  const { username, password } = req.body; // Fixed bug: Defined variables username and password
  const user = { ...req.body, purchasedBook: [] }; // Changed 'user' to 'req.body'
  const alreadyUser = User.find(
    (u) => u.username === username && u.password === password
  );
  if (alreadyUser) {
    res.json({ message: "Already a user" });
  } else {
    User.push(user);
    console.log(User);
    res.json({ message: "User created successfully" });
  }
});

app.post("/user/login", UserAuth, (req, res) => {
  res.json({ message: "User logged in successfully" });
});

app.get("/user/book", (req, res) => {
  let filteredBook = Books.filter((b) => b.published); // Assuming 'published' is a property in the book objects
  res.json({ book: filteredBook });
  console.log(filteredBook);
});

app.post("/user/book/:BookId", (req, res) => {
  let bookId = parseInt(req.params.BookId);
  const book = Books.find((b) => b.id === bookId && b.published); // Changed 'BookId' to 'bookId'
  if (book) {
    req.user.purchasedBook.push(bookId);
    console.log("New book added!");
    res.json({ message: "User purchased book successfully" });
  } else {
    res.json({ message: "Cannot purchase the book 😑 " });
  }
});

app.get("/user/purchasedBook", (req, res) => {
  const purchasedBook = Books.filter((book) =>
    req.user.purchasedBook.includes(book.id) // Fixed bug: Changed 'req.book' to 'req.user'
  );
  res.json({ purchasedBook });
});

app.listen(3050);
