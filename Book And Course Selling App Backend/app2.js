const express = require('express');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());


let Admin = [];
let Books = [];
let User = [];

let Secret ="HelloPrayag";

const generateJWT = (user)=>{
    const payload = {username:user.username};
    const token = jwt.sign(payload,Secret,{expiresIn:"1h"});
    return token;
};

const AdminAuth = (req,res,next)=>{
    const {username,password}= req.body;
    const alreadyAdmin = Admin.find(a=>a.username === username);
    if( alreadyAdmin && bcrypt.compareSync(password, alreadyAdmin.password)){
        const token = generateJWT(alreadyAdmin);
        res.json({message:"Admin authenticated!!",token});
        next();
    }else{
        res.json({message:"Admin cannot authenticated try signup?"});
    }
};

const UserAuth =(req,res,next)=>{
    const {username, password} = req.body;
    const alreadyUser = User.find(u=> u.username === username) 
    if(alreadyUser && bcrypt.compareSync(password, alreadyUser.password)){
        const token = generateJWT(alreadyUser);
        res.json({message:" USer authencticate",token});
        next();
    }else{
        res.json({messsage:"user not authernicated signup?"})
    }
};

app.post("/admin/signup",(req,res)=>{
    const {username, password}= req.body;
    const alreadyAdmin = Admin.find(a=>a.username === username);
    if(alreadyAdmin){
        res.json({message:"Already a Admin"});
    }
    const token = generateJWT(req.body);


    const saltRound =10;
    bcrypt.hash(password,saltRound,(err,hashedpassword)=>{
        if(err){
            res.json({message:"error creating hashed password"});
        }
        Admin.push({username,password:hashedpassword});
        res.json({message:"Admin created successfully",token});
        console.log(hashedpassword);
    });
});

app.post("/admin/login",AdminAuth,(req,res)=>{
    res.json({message:"Logged in successfully"});
});


app.post("/admin/createbook",AdminAuth,(req,res)=>{
    const book = req.body;
    book.id = Date.now();
    Books.push(book);
    console.log(Books);
    res.json({message:"Book created successfully!",BookId:book.id});
});

app.put("/admin/createbook/:BookId",AdminAuth,(req,res)=>{
    const BookId = parseInt(req.params.BookId);
    const book = Books.find(b=>b.id===BookId);
    if(book){
        Object.assign(book,req.body);
        res.json({message:"bppk updated successfully"});
        console.log(Books)
    }else{
        res.json({message:"cannot update book"})
    }
});




const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Not A Token' });
    }
  
    jwt.verify(token, Secret, (err, decoded) => {
      if (err) {
        return res.json({ message: 'TOKEN NOT VERIFIED' });
      }
  
      Object.assign(req.user, decoded);
      next();
    });
  };

app.get("/admin/createbook",verifyToken,(req,res)=>{
    res.json({Book:Books});
});

// User 
app.post("/user/signup",(req,res)=>{
    const {username,password}= req.body;
    const alreadyUser = User.find(u=>u.username === username && u.password === password);
    if(alreadyUser){
    res.json({message:"Already a user"});
    }else{
        const token = generateJWT(alreadyUser);
        const user = {username,password};
        User.push(user);
        res.json({message:"User created successfully!",token});
        console.log(User,token);
    }
});

app.post("/user/login",UserAuth,(req,res)=>{
    res.json({message:"User logged in successfully"});
});

app.get("/user/purchasedbook",verifyToken,(req,res)=>{
    let filteredBook = Books.find(b=>b.publised);
    res.json({Book:filteredBook});
    console.log(filteredBook);
});

app.post("/user/book/:BookId",(req,res)=>{
    const {BookId}= req.params;
    const book = Books.find(b=>b.id === BookId && b.publised);
    if(book){
        req.params.purchasedbook.push(BookId);
        console.log(Books);
        res.json({message:"User buy a book"});
    }else{
        res.json({message:"Book not found"});
    }
});

app.get("/user/purchasedbook",verifyToken,(req,res)=>{
    const purchasedbook = Books.filter(b=> req.user.purchasedBook.includes(book.id));
    res.json({purchasedbook});
});


app.listen(3000);
