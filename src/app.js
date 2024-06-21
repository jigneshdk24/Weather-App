const express = require('express');
const { registerPartials } = require('hbs');
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherData = require('../utils/weatherData');

const publicStaticDirPath = path.join(__dirname, '../public')// which folder of out app conatins static file html images media files style sheets

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath= path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs,registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.send('Hi this is a weather app');
});

// localhost: 3000/weather?address=london
app.get('/weather', (req, res) => {
    const address = req.query.address
    weatherData(address, (result) => {
        console.log(result)
    });
});

app.get("*", (req, res) => {
    res.send("page not found")
})


app.listen(3000, () => {
    console.log('Server has started....')
});