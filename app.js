const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
const my_email = "yerramanusha8@gmail.com"
const password = "sramyeyjffcvsrud"
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
  //https.get(url,function()) ...this is useful to get data from the url not for hosting the data at the url location.
  const jasonData=JSON.stringify(data);
  id_key=process.env.id;
  const aut=id_key;
  const url="https://us14.api.mailchimp.com/3.0/lists/fb0c4ae101";
  const options={
    method:"POST",
    auth:aut
  }
  console.log(aut);
const request=https.request(url,options,function(response){
  console.log(response.statusCode);
if (response.statusCode>=200 && response.statusCode<=299){
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
