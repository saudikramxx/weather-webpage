const express = require("express")
const https = require("https")
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({exteded:true}));

app.get("/",function(req,res){


   res.sendfile(__dirname + "/index.html")

})

app.post("/",function(req,res){

  const query = req.body.cityName
  const apiKey = "apiKey"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid=" +apiKey+"&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>the weather is curently " + weatherDescription + "</h1>")
      res.write("<h1>the temperature in " +query +" is : " + temp + " degree celcius</h1>")
      res.write("<img src="+ imageUrl + ">")

    })
  })

})



















app.listen(3000, function(){
  console.log("server is up and running");
})
