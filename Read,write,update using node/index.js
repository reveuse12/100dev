const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.use("/",(req,res,next)=>{
    console.log("hello from middlewRe");
    next();
});

app.get("/",(req,res)=>{
    res.send('<h1>hello</h1>');
});

app.post("/",(req,res)=>{
   const datak = req.body;
   res.send("login")
   
   const strinf = JSON.stringify(datak);
  
   fs.writeFile("datt.json",strinf,"utf-8",(data)=>{
    console.log("data written succesfully");
   })
});

app.put("/",(req,res)=>{
    const newDAta= req.body;

    fs.readFile("datt.json","utf-8",(data)=>{
       
        let existingDatt= JSON.parse(data);
         existingDatt={...existingDatt,...newDAta};

         const newdata= JSON.stringify(existingDatt);

        fs.writeFile("datt.json",newdata,(data)=>{
            console.log("data updated succefully");
        });
    });
});

app.listen(3050);