const request = require("request");

const geoCode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoianBvcCIsImEiOiJja20yeGFiejYxZ2llMnZwNGxjdXYzN3p0In0.I7OXwyznD7fjvUbXjjj-ug&limit=1";

    request({ url, json: true }, (error, res) => {
        if (error) {
            callback("Unable to connect to Map service", undefined)
        }
        else if (res.body.features.length === 0) {
            callback("Unable to find location.Plz provide a valid address", undefined)
        }
        else {
            const data = {
                lattitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0]
            }
            callback(undefined, data)
        }
    })
}

module.exports = geoCode;