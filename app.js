const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

app.get('/', (req,res) => {

    //API endpoint
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Tijuana&appid=88e179463f383b58d2b3410eeed08041&units=metric';

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

            res.write("<h1>The temperature in Tijuana is " + temp + " degrees Celcus.</h1>");
            res.write("<h2>The weather is currently " + description + "</h2>");

            //Write image on page
            res.write("<img src=" + imageURL + " alt='Icon'>");

            res.send();
        })    
    });

})

app.listen(port, () => console.log('Server is listening on port ${port}'));
