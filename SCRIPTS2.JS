let cities = [""];

let APIKey = "bd8ab1d325e51914775d16de4006c4d8";



function displayWeatherInfo(city) {


    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



    $.ajax({ url: queryURL, method: "GET" })
        .then(function(response) {
            console.log(queryURL);

            let temperature = Math.round((response.main.temp - 273.15) * 1.80 + 32);
            let humidity = response.main.humidity;
            let windSpeed = response.wind.speed;

            let cityDiv = $("<div class='city'>");
            let header = $("<h1>").text(city);
            let pOne = $("<p>").text("Temperature:  " + temperature + "F");
            let pTwo = $("<p>").text("Humidity:  " + humidity + "%");
            let pThree = $("<p>").text("Wind Speed: " + windSpeed + "mph")

            cityDiv.append(header, pOne, pTwo, pThree);

            $("#weather-view").empty();
            $("#weather-view").prepend(cityDiv);
        })
}


function renderButtons(city) {
    let btn = $("<button>");
    btn.addClass("city-btn btn btn-default").css("display", "block");
    btn.attr("data-name", city);
    btn.text(city);
    $(".cities-array").append(btn);
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    let $weather = $("#city-input").val();

    cities.push($weather);
    localStorage.setItem("weather", JSON.stringify(cities))

    renderButtons($weather);
    displayWeatherInfo($weather)
});

$(document).on("click", "city-btn", function() {
    let city = $(this).attr("data-name");
    displayWeatherInfo(city);
    renderButtons();
});