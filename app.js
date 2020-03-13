const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//Necessary to parse through the body of the post request
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {

    //Get the city from the input
    const query = req.body.cityName

    const apiKey = "88e179463f383b58d2b3410eeed08041";
    const unit = "metric";

    //API endpoint
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;

    //Make get request and get the response
    https.get(url, (response) => {
        //log response into the console
        console.log(response.statusCode)

        //Search through the data in the response
        response.on('data', (data) => {
            console.log(data);

            //Turns json from some sort of string format (i.e. hexadecimal) to javascript object
            const weatherData = JSON.parse(data);
            
            //Get specific pieces of information
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            //Get the icon from the weather API
            const icon =  weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

            console.log('The current temparature is: ', temp);
            console.log('Description: ', description);

            console.log(weatherData);

            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
            res.write("<h2>The weather is currently " + description + "</h2>");

            //Write image on page
            res.write("<img src=" + imageURL + " alt='Icon'>");

            res.send();
        })    
    });

})

app.listen(port, () => console.log('Server is listening on port ${port}'));
