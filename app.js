const express=require("express");
const bodyParser=require("body-parser");
//const request=require("request");
const https=require("https");
const app=express()
const my_email = "yerramanusha8@gmail.com"
const    password = "sramyeyjffcvsrud"
app.listen(process.env.PORT||3000,function(){
  console.log("The server has been started");
})
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.use(bodyParser.urlencoded({extended:true}));



app.post("/",function(req,res){
  const email=req.body.email
  const firstname=req.body.firstname
  const lastname=req.body.lastname

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };
  //https.get(url,function()) ...this is useful to get data from the url not for hosting the data at the url location.
  const jasonData=JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/fb0c4ae101"
  const options={
    method:"POST",
    auth:"anusha:81fd75360841e98f6bc454df6b8ba65e-us14"
  }
const request=https.request(url,options,function(response){
  console.log(response.statusCode);
if (response.statusCode==200){
  res.sendFile(__dirname+"/success.html")
  //mail me that there are a new login credentials.
  var mailOptions = {
    from: my_email,
    to: my_email,
    subject:"New login!!!!" ,
    text: "check mailchamp"
  };

  transporter.sendMail(mailOptions)
}
    else{
        res.sendFile(__dirname+"/failure.html")
    }
    app.post("/failure",function(req,res){
      res.redirect("/")
    })
response.on("data",function(data){
  console.log(JSON.parse(data))
})
})

request.write(jasonData);
request.end();
})
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

/*var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});*/

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: my_email,
    pass: password
  }
});
/*const fs = require('fs');

const fileName = 'C:\Users\yerra\Newsletter-Signup\public\data.txt';
fs.open(fileName);
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("anusha"+data);
});*/

var today = new Date().toLocaleTimeString("en-Us", {timeZone: 'Asia/Kolkata',hour12:false});
if (today=="07:00:00" || today=="7:00:00"){
https.get("https://zenquotes.io/api/random",function(response){
  response.on("data",function(data){
    const quote=JSON.parse(data)[0].q;
    const author=JSON.parse(data)[0].a;
    if (author!="Unknown"){
    var text=quote
  }
  else{
    text=quote+" - "+author
  }
const arr=["ayerram@gitam.in","yerramanusha8@gmail.com"];
for(var i=0;i<arr.length;i++){
var mailOptions = {
  from: my_email,
  to: arr[i],
  subject:"Motivo!!" ,
  text: text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  }
});
}
})
})
}
//api key
//81fd75360841e98f6bc454df6b8ba65e-us14

//list id
//fb0c4ae101
