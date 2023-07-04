const express =require("express");
const bodyParser= require("body-parser");
const fs = require("fs");
const { stringify } = require("querystring");

const app =express();

app.use(bodyParser.json());

let details=[];



app.post("/signup",(req,res)=>{
    const { email, password, firstname, lastname} = req.body;
    let useralreadyexist= details.find(userdata=>userdata.email===email && userdata.password=== password);
    if(useralreadyexist){
        res.send("phirse kyu aya hai gandu signup karne");
    }
    let uniqueid=1;
    let Id= uniqueid+1;

    let newuser={Id,email, password, firstname, lastname};
    // details.push(newuser);
    let userdat= JSON.stringify(newuser)

    fs.writeFile("data.json",userdat,"utf-8",(data)=>{
        console.log("data storeds in fiule");
    });

    res.send("newuser signup");
});

const filePath = "data.json";
    function readUserData() {
        try {
          const data = fs.readFileSync(filePath);
          return JSON.parse(data);
        } catch (err) {
          return [];
        }
      }

app.post("/login",(req,res)=>{
    const { email, password, firstname, lastname} = req.body;
    let userdata =readUserData();
    let alreadyuser= userdata.find(data=>data.email===email && data.password=== password);
    if(!alreadyuser){
        res.send("not a user please signup");
    }else{
        res.send("signedin sucessfully");
    }
    
});

app.listen(3050);