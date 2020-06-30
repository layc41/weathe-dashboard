var submitCityEl = document.querySelector('#search');
var cityInputEl = document.querySelector('#city');
var weatherCards = document.querySelector('#weather-cards');
var weatherDash = document.querySelector("#weather-dash");

// set day at the top next to city name
// var today = document.querySelector("#currentDay")
// var currentDate = moment();
// today.textContent = currentDate.format("dddd, MMMM Do")

var citySubmitHandler = function (event)
{
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) 
  {
    get5Weather(city);
    cityInputEl.value ='';
  }
  // add local storage here 
};

// function to fetch weather data
var get5Weather = function(city)
{
  var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=40eb0ca1d6631653dada9f4a96226113";
  
  fetch(apiURL).then(function(response)
  {
    // console.log(response);

    if (response.ok)
    {
      response.json().then(function (data)
      {
        // console.log(data)
        displayWeatherCards(data);
        console.log(data.list.weather.main[1]);
      })
    }
    else
    {
      alert("Error: " + response.statusText);
    }
  })
    .catch(function(error)
    {
      alert("Unable to connect to Weather App");
    });
}; 

var getTodayWeather = function(city)
{
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=&appid=40eb0ca1d6631653dada9f4a96226113"

  fetch(apiURL).then(function(response)
  {

    if (response.ok)
    {
      response.json().then(function (data)
      {
        // console.log(data)
        bigDash(data);
      })
    }
    else
    {
      alert("Error: " + response.statusText);
    }
  })
    .catch(function(error)
    {
      alert("Unable to connect to Weather App");
    });

}


// Big Dash for Today's Weather
var bigDash = function()
{
  // pull city name from json
  // var cityName = weather[2].city
  // console.log(cityName);

  // var cityDate =data[].list.dt_txt
  // UV Index needs if Statements

  // var cityTemp = 'Temperature: ' + jsonindex;
  // console.log(cityTemp);

  // var cityHumidity = "Humidity: " + jsonindex;
  // console.log(cityHumidity);

  // var cityWind = "Wind Speed: " + jsonindex;
  // console.log(cityWind);

  // var cityUv = "UV Index: " + jsonindex;
  // console.log(cityUv);
  // if statement to create conditions for uv index

}




// display cards
var displayWeatherCards = function(data) 
{

  //create loop for the 5 days after today for cast
   for ( var i = 0; i < 40; i += 8)
   {
    // pull date from json and then covert time to mm/dd/yy format w/ moment
    var cityDate = data.list[i].dt_txt.split(" ")[0]
    console.log(cityDate);
    var dateEl = document.createElement("h5");
    dateEl.classList = "card-title"
    dateEl.textContent = cityDate

    // // pull weather from json and create image
    // var cityWeather = data.list[i].weather[1];
    // console.log(cityWeather)
    // // create if statements for images?
    // var weatherEl = document.createElement("p");
    // weatherEl.classList = "card-text"

    // // pull temp from json 
    // var cityTemp = 'Temp: ' + data.list[i].
    // console.log(cityTemp);
    // var tempEl = document.createElement("p");
    // tempEl.classList = "card-text"
    // tempEl.textContent = cityTemp

    // // pull humidity from json
    // var cityHumidity = "Humidity: " + weather[]
    // console.log(cityHumidity;
    // var humidityEl = document.createElement("p");
    // humidityEl.classList = "card-text"
    // humidityEl.textContent = cityHumidity

    // // create card div container 
    // var weatherCard = document.createElement("div");
    // weatherCard.classList = "card text-white bg-info mb-3"

    // // append elements to div container 
    // weatherCard.appendChild(dateEl);
    // weatherCard.appendChild(weatherEl);
    // weatherCard.appendChild(tempEl);
    // weatherCard.appendChild(humidityEl);

    // // append container to dom
    // weatherCards.appendChild(weatherCard);

   }

 
  // clears search after pulling up information
  cityInputEl.textContent = "";



}; 




submitCityEl.addEventListener('click', citySubmitHandler);