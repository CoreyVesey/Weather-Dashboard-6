const APIKey = "ae5515e837a49bcb6ff7ceb8534fdd85";
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", getForecast);
const todaysForecast = document.getElementById("todaysForecast");
const addMain = document.querySelector("main");

function getForecast() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function(response) {
            return(response.json())
        })
        .then(function(data) {
            cityHistoryBtn = document.createElement("button")
            cityHistoryBtn.textContent = cityInput.value;
            addMain.appendChild(cityHistoryBtn);
            showCity(cityInput.value)
            localStorage.setItem("city", cityInput.value)
            showIcon(data.weather[0].icon)
            showTemp(data.main.temp)
            showWind(data.wind.speed)
            showHumidity(data.main.humidity)
            getFiveDayForecast(data.coord.lat, data.coord.lon)
        })
};

function showCity(cityName) {
    var cityText = document.createElement("h2");
    cityText.textContent = cityInput.value + " " + dayjs().format("MM/DD/YYYY");
    todaysForecast.appendChild(cityText);
};

function showIcon(icon) {
    var iconIMG = document.createElement("img")
    iconIMG.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + ".png");
    iconIMG.style.height = "150px"
    iconIMG.style.width = "150px"
    todaysForecast.appendChild(iconIMG);
};

function showTemp(temp) {
    var tempText = document.createElement("p");
    tempText.textContent = "Temp: " + temp + " F";
    todaysForecast.appendChild(tempText);
};

function showWind(wind) {
    var windText = document.createElement("p");
    windText.textContent = "Wind: " + wind + " MPH";
    todaysForecast.appendChild(windText);
};

function showHumidity(humidity) {
    var humidityText = document.createElement("p");
    humidityText.textContent = "Humidity: " + humidity + "%";
    todaysForecast.appendChild(humidityText);
};

function showFiveDayForecast(data) {
    var fiveDayForecast = document.getElementById("fiveDayForecast");
    for(i=1; i<6; i++) {
        var eachDayCard = document.createElement("div")
        eachDayCard.innerHTML = "<div>" + 
        "<h4>" + dayjs().add(i, "days").format("MM/DD/YYYY") + "</h4>" + 
        "<ul>" + 
        '<img  src="http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png">' +
        "<li> Temp: " + data.daily[i].temp.day + " F </li>" +
        "<li> Wind: " + data.daily[i].wind_speed + " MPH </li>" +
        "<li> Humidity: " + data.daily[i].humidity + "% </li>" + 
        "</ul>" + 
        "</div>";
    fiveDayForecast.appendChild(eachDayCard)
    };
}

function getFiveDayForecast(lat, lon) {
    var locationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&units=imperial&appid=d4df0cddf27a227053c1a99fea8082a7";
    fetch(locationURL)
        .then(function(response) {
            return(response.json())
        })
        .then(function(data) {
            showFiveDayForecast(data)
        })
}
