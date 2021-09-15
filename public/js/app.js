const weatherForm = document.querySelector("form")
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loc = search.value;
    document.getElementById("p1").innerHTML = "Loading..";


    fetch("/weather?address=" + loc).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error)
                document.getElementById("p1").innerHTML = data.error;
            else {
                document.getElementById("city").innerHTML = data.loc;
                document.getElementById("p1").innerHTML = "";
                document.getElementById("weather").innerText = data.desc;
                document.getElementById("p3").src = "http://openweathermap.org/img/w/" + data.icon + ".png";
                document.getElementById("p3").style.height = "135px";
                document.getElementById("temp").innerHTML = data.temp + " <sup>0</sup>C";
                document.getElementById("press").innerHTML = data.pressure + " hPa";
                document.getElementById("feelslike").innerHTML = data.feelslike + " <sup>0</sup>C";
                document.getElementById("press").innerHTML = data.pressure + " hPa";
                document.getElementById("humid").innerHTML = data.humidity + " %";

            }
        })
    })

})