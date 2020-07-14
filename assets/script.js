var submitCityEl = document.querySelector('#search');
var cityInputEl = document.querySelector('#city');
var weatherCards = document.querySelector('#weather-cards');
var weatherDash = document.querySelector("#weather-dash");
var searchEl = document.querySelector("#previous");

var uniqueId = 0

// When the user clicks the search button, it collects their input and runs to start fetchs
// Saves term in local storage
var citySubmitHandler = function (event) 
{
  event.preventDefault();

  var city = cityInputEl.value.trim();

  localStorage.setItem(uniqueId, city);
  ;

  if (city) 
  {
    get5Weather(city);
    getTodayWeather(city);
    lastSearch(city);
    cityInputEl.value = '';
  }

};

// function to append last searches
var lastSearch = function () 
{
    var lastCity = localStorage.getItem(uniqueId);
    uniqueId++;
    console.log("city", lastCity);

    var lastSearch = document.createElement("li");
    lastSearch.classList = "list-group-item";
    lastSearch.setAttribute("id", uniqueId)
    lastSearch.textContent = lastCity;

    var searchTerms = document.createElement("ul");
    searchTerms.appendChild(lastSearch);

    searchEl.appendChild(searchTerms);

}

// function to fetch weather data
var get5Weather = function (city) {
  var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=40eb0ca1d6631653dada9f4a96226113";

  fetch(apiURL).then(function (response) {
    // console.log(response);

    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data)
        displayWeatherCards(data);
      })
    }
    else {
      alert("Error: " + response.statusText);
    }
  })
    .catch(function (error) {
      alert("Unable to connect to Weather App");
    });
};

var getTodayWeather = function (city) {
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=40eb0ca1d6631653dada9f4a96226113";

  fetch(apiURL).then(function (response) {

    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data)
        bigDash(data);
      })
    }
    else {
      alert("Error: " + response.statusText);
    }
  })
    .catch(function (error) {
      alert("Unable to connect to Weather App");
    });

}

// Big Dash for Today's Weather
var bigDash = function (data) {

  weatherDash.innerHTML = ""

  var currentDate = moment().format('L');
  // console.log(currentDate);

  var cityWeather = data.weather[0].icon;
  // console.log(cityWeather)

  // pull icon 
  var weatherIcon = "http://openweathermap.org/img/w/" + cityWeather + ".png";
  var weatherEl = document.createElement("img")
  weatherEl.classList = "card-title"
  weatherEl.src = weatherIcon;
  // weatherDash.appendChild(weatherEl);

  // pull city name from json
  var cityName = data.name;
  // console.log(cityName);
  var nameEl = document.createElement("h1");
  nameEl.classList = "card-title";
  nameEl.innerHTML = cityName + " (" + currentDate + ")";

  var dashHeader = document.createElement("div");
  dashHeader.appendChild(nameEl);
  dashHeader.appendChild(weatherEl);

  var cityTemp = 'Temperature: ' + data.main.temp + " °F";
  // console.log(cityTemp);
  var tempEl = document.createElement("p");
  tempEl.classList = "card-text";
  tempEl.textContent = cityTemp;

  var cityHumidity = "Humidity: " + data.main.humidity;
  //console.log(cityHumidity);
  var humidityEl = document.createElement("p");
  humidityEl.classList = "card-text";
  humidityEl.textContent = cityHumidity;

  var cityWind = "Wind Speed: " + data.wind.speed + " mph";
  // console.log(cityWind);
  var windEl = document.createElement("p");
  windEl.classList = "card-text";
  windEl.textContent = cityWind;

  var cityLon = data.coord.lon
  // console.log(cityLon);

  var cityLat = data.coord.lat
  // console.log(cityLat);

  // create Dashboard container
  var dashCard = document.createElement("div");
  dashCard.classList = "card-body"

  // append to container 
  dashCard.appendChild(dashHeader);
  dashCard.appendChild(tempEl);
  dashCard.appendChild(humidityEl);
  dashCard.appendChild(windEl);

  var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=40eb0ca1d6631653dada9f4a96226113&lat=" + cityLat + "&lon=" + cityLon;
  fetch(uvURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (uv) {
        var uvValue = uv[0].value;
        // console.log(uvValue);
        var uvEl = document.createElement("div")

        if (uvValue < 5) //favorable 
        {
          uvEl.classList = "card text-white bg-success mb-3"
        }
        else if (uvValue > 5 && uvValue < 10) //moderate
        {
          uvEl.classList = "card text-white bg-warning mb-3"
        }
        else (uvValue > 10) //severe
        {
          uvEl.classList = "card text-white bg-danger mb-3"
        }
        uvEl.textContent = "UV Index: " + uvValue;
        dashCard.appendChild(uvEl);
      })
    }
  });
  // append to dom 
  weatherDash.appendChild(dashCard);

}


// display cards
var displayWeatherCards = function (data) {

  weatherCards.innerHTML = "";

  //create loop for the 5 days after today for cast
  for (var i = 0; i < 40; i += 8) {
    // pull date from json and then covert time to mm/dd/yy format w/ moment
    var origDate = moment(data.list[i].dt_txt.split(" ")[0], "YYYY-MM-DD");
    var cityDate = origDate.format('MM/DD/YY');

    var dateEl = document.createElement("h5");
    dateEl.classList = "card-title"
    dateEl.textContent = cityDate

    // // pull weather from json and create image
    var cityWeather = data.list[i].weather[0].icon;
    // console.log(cityWeather)

    // pull icon 
    var weatherIcon = "http://openweathermap.org/img/w/" + cityWeather + ".png";
    var weatherEl = document.createElement("img")
    weatherEl.classList = "card-text"
    weatherEl.src = weatherIcon;

    var cardHeader = document.createElement("div");
    cardHeader.appendChild(dateEl);
    cardHeader.appendChild(weatherEl);

    // // pull temp from json 
    var cityTemp = 'Temp: ' + data.list[i].main.temp + " °F";
    var tempEl = document.createElement("p");
    tempEl.classList = "card-text"
    tempEl.textContent = cityTemp

    // // pull humidity from json
    var cityHumidity = "Humidity: " + data.list[i].main.humidity
    var humidityEl = document.createElement("p");
    humidityEl.classList = "card-text"
    humidityEl.textContent = cityHumidity

    // create card div container 
    var weatherCard = document.createElement("div");
    weatherCard.classList = "card text-white bg-info mb-2 col-2"

    // append elements to div container 
    weatherCard.appendChild(cardHeader);
    weatherCard.appendChild(tempEl);
    weatherCard.appendChild(humidityEl);

    // append container to dom
    weatherCards.appendChild(weatherCard);
  }

  // clears search after pulling up information
  

}

submitCityEl.addEventListener('click', citySubmitHandler);