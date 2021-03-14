const weatherForm = document.querySelector("form")
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loc = search.value;
    document.getElementById("p1").innerHTML = "Loading..";


    fetch("/weather?address=" + loc).then((response) => {
        response.json().then((data) => {
            if (data.error)
                document.getElementById("p1").innerHTML = data.error;
            else {
                document.getElementById("city").innerHTML = data.loc;
                document.getElementById("p1").innerHTML = "";
                document.getElementById("weather").innerHTML = data.desc;
                document.getElementById("temp").innerHTML = "Temp:" + data.temp + " <sup>0</sup>C";
                document.getElementById("press").innerHTML = "Pressure:" + data.pressure + " hPa";
                document.getElementById("feelslike").innerHTML = "Feels like:" + data.feelslike + " <sup>0</sup>C";
                document.getElementById("press").innerHTML = "Pressure:" + data.pressure + " hPa";
                document.getElementById("humid").innerHTML = "Humidity:" + data.humidity + " %";

            }
        })
    })

})