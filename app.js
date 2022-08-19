const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
const my_email = "yerramanusha8@gmail.com"
const password = "sramyeyjffcvsrud"
const nodemailer = require("nodemailer");
require("dotenv").config();
app.listen(process.env.PORT||3000,function(){
  console.log("The server has been started");
})
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.use(bodyParser.urlencoded({extended:true}));



app.post("/",function(req,res){
  const email=req.body.email;
  const firstname=req.body.firstname;
  const lastname=req.body.lastname;

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        },
      }
    ]
  };

res.sendFile(__dirname+"/success.html")
var mailOptions = {
  from: my_email,
  to: my_email,
  subject:"New login!!!!" ,
  text: email
};
let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: my_email,
        pass: password
      }
    });


transporter.sendMail(mailOptions)




})
