const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());


let Admin = [];
let Course = [];
let User = [];

const Adminauth = (req,res,next) =>{
const {username,password}=req.body;
const alreadyAdmin = Admin.find(a=>a.username===username && a.password===password);
if(alreadyAdmin){
  next();
  console.log("admin Authenticated");
}else{
  console.log("cannot authenticate Admin");
  res.sendStatus(400);
}
}

app.post("/admin/signup",(req,res)=>{
  const newadmin = req.body;
  const existingAdmin = Admin.find(a=>a.username === username );
  if(existingAdmin){
    res.json({message:"already a Admin "});
  }else{
    Admin.push(newadmin);
    res.json({message:"Admin created successfully batman!!"});
  }
});

app.post("/admin/login",Adminauth,(req,res)=>{
  res.json({mesage:" Admin logged In"});
});

app.post("/admin/course",Adminauth,(req,res)=>{
  const newcourse = req.body;
  let cousre.id = Date.now();
  Course.push(newcourse);
  res.json({message:"Course created successfully"});
});



app.put("/admin/course/:courseId",Adminauth,(req,res)=>{
  const courseid = parseInt(req.params.cousreId);
  const course = Course.find(c=> c.cousreId === cousreId);
  if(course){
    Object.assign(course,req.body);
    res.json({message:"updated course"});
  }else{
    res.json({message:"Can't update course"});
  }
});


app.get("/admin/course",Adminauth,(req,res)=>{
  res.json({course:Course});
});


//User

const UserAuth =()=>{
const {username, password} = req.body;
const user = User.find(u=> u.username===username && u.password === password);
if(user){
  req.user = user;
  res.json({message:"User Authenticate"})
  next();
}else{
  res.josn({message:"User cannot Authenticate"});
}
};


app.post("/user/signup",(req,res)=>{
  const user ={...req.body,purchasedCourse:[]};
    User.push(user);
    res.json({message:"User created successfully"});
  
});


app.post("/user/login",UserAuth,(req,res)=>{
  res.json({message:"user logged in"});
});

app.get("/user/course",UserAuth,(req,res)=>{
  let filteredCourse = Course.filter(c=>c.published);
  res.json({ courses: filteredCourse });
});

app.put("/user/course/:courseId",UserAuth,(req,res)=>{
  const cousreId = Number(req.params.courseId);
  const course = Course.find(c => c.id === cousreId && c.published);
  if(course){
    req.user.purchasedCourse.push(cousreId);
    res.json({message:'user purchased course'});
  }else{
    res.json({message:"can't get your courses at moment"});
  }
});

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  const purchasedCourses = Course.filter((course) => req.user.purchasedCourses.includes(course.id));
  res.json({ purchasedCourses });
});




app.listen(5000);