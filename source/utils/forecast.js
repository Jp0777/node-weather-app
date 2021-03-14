const request = require("request");

const forecast = (latt, long, callback) => {

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latt + "&lon=" + long + "&appid=1094935a98b9bae343cf73b027afcd5a&units=metric"
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Enable to connect to weather service", undefined)
        }
        else if (response.body.code) {
            callback("Unable to find location", undefined)
        }
        else {
            const data = {
                temp: response.body.main.temp,
                feelslike: response.body.main.feels_like,
                desc: response.body.weather[0].main,
                icon: response.body.weather[0].icon,
                pressure: response.body.main.pressure,
                humidity: response.body.main.humidity,
                loc: response.body.name
            }
            callback(undefined, data);
        }
    })

}

module.exports = forecast;