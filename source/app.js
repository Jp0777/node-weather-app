const path = require("path");
const request = require("request");
const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");
const express = require("express");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;
app.use(express.static("public"));

const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsDirPath);
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("home", {
        title: "Weather",
        name: "Jayen"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Jayen"
    })
})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Jayen"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Plz provide an address"
        })
    }
    geoCode(req.query.address, (err, { lattitude, longitude } = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        foreCast(lattitude, longitude, (err, { temp, feelslike, desc, pressure, humidity, icon, loc }) => {
            if (err) {
                return res.send({
                    error: err
                })

            }
            res.send({
                location: req.query.address,
                temp,
                feelslike,
                desc,
                pressure,
                humidity,
                icon,
                loc
            })

        })

    })

})
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 Error!",
        name: "Jayen",
        error: "Help article not found"
    })
})



app.get("*", (req, res) => {
    res.render("404", {
        title: "404 Error!",
        name: "Jayen",
        error: "Page not found"
    })
})



app.listen(port, () => {
    console.log("Listening on " + port);
})