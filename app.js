const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const lastName = req.body.fName;
  const firstName = req.body.lName;
  const eMail = req.body.email;
  const data = {
    members:[
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  url= "https://us8.api.mailchimp.com/3.0/lists/e9df7481b2";
  const options = {
    method: "POST",
    auth: "rehan:e2f60f2f9dc317a0d909776dd8a6bc1f-us8"
  }
const request =  https.request(url,options,function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
  })
  })

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
res.redirect("/");
});

app.listen(3000,function(){
  console.log("server is up and running");
});


//e9df7481b2
//e2f60f2f9dc317a0d909776dd8a6bc1f-us8
