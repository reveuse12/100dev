const express = require("express");
const bodyParser =require("body-parser");

const app = express();
app.use(express.json());

let ADMINS=[];
let USERS=[];
let COURSES=[];

const adminauthentication=(req,res,next)=>{
    const {username, password} = req.headers;
    const admin = ADMINS.find(a=>a.username===username && a.password===password);
    if(admin){
        next();
    }else{
        res.status(403).json({message:"can't authenticate"});
    }

};

const userauthentication=(req,res,next)=>{
    const{username,password}= req.headers;
    const user =USERS.find(u=>u.username===username&&u.password===password);
    if(user){
        next();
    }else{
        res.status(403).json({message:"user not authenticate"});
    }
};

app.post("/admin/signup", (req,res)=>{
    const admin = req.body;
    const existingAdmin=ADMINS.find(ad=>ad.username===admin.username);
    if(existingAdmin){
        res.status(403).json({message:"Alrewady a admin"});
    }else{
        ADMINS.push(admin);
        res.json({message:"signed up"});
        console.log(ADMINS);
    };
});

app.post("/admin/login",adminauthentication,(req,res)=>{
    res.json({message:"loggen in fibn"});
});

app.post("/admin/courses",adminauthentication,(req,res)=>{
    const course =req.body;
    const ic=1;
    course.id=ic+1;
    COURSES.push(course);
    res.json({message:"course created ",courseId:course.id});
    console.log(COURSES);
});

app.put("/admin/courses/:courseId",adminauthentication,(req,res)=>{
    const courseId=parseInt(req.params.courseId);
    const course = COURSES.find(c=>c.id===courseId);
    if(course){
        Object.assign(course,req.body);
        res.json({message:"updated course"});
    }else{
        res.status(403).json({message:"can't update"});
    }
});

app.get("/admin/courses",adminauthentication,(req,res)=>{
    res.json({message:"display course",courses:COURSES});
});

//user

app.post("/users/signup",(req,res)=>{
    const user ={...req.body,purchasedcourse:[]};
    const alreadyuser=USERS.find(u=>u.username===username&&u.password===password);
    if(alreadyuser){
        res.status(403).json({message:"alreadya user"});
    }else{
        USERS.push(user);
        res.json({message:"signed up"});
        console.log(USERS);
    }
});

app.post("/users/login",userauthentication,(req,res)=>{
    res.json({message:"logged in finished"});
});

app.get("/users/courses",userauthentication,(req,res)=>{
    COURSES.filter(c=>c.publised);
    let flitercourse =[];
    for(i=0;i<COURSES.length;i++){
       if(COURSES[i].publised){
        flitercourse.push(COURSES[i]);
       }
    }
    res.json({courses:flitercourse});
});

app.post("/users/courses/:courseId",userauthentication,(req,res)=>{
    const courseId = Number(req.params.courseId);
    const course =COURSES.find(c=>c.id===courseId&&c.publised);
    if(course){
        req.user.purchasedcourse.push(courseId);
        res.json({message:"course purhased"});
    }else{
        res.status(403).json({message:"course not found"});
    }
});

app.get("/user/purchasedcourse", userauthentication,(req,res)=>{
    const purchasedcourse=COURSES.filter(c=>req.user.purchasedcourse.includes(c.id));
    let purchasedcourseIds=req.user.purchasedcourse;[1,4];
    // let purchasedcourse =[];
    for(i=0;i<COURSES.length;i++){
        if(purchasedcourseIds.indexOf(COURSES[i].id)!==-1){
            purchasedcourse.push(COURSES[i]);
        }
    }
    res.json({purchasedcourse});
});


app.listen(3000);