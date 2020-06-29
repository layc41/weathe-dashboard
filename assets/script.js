var submitCityEl = document.querySelector('#search');
var cityInputEl = document.querySelector('#city')

// set day at the next to city
// var today = document.querySelector("#currentDay")
// var currentDate = moment();
// today.textContent = currentDate.format("dddd, MMMM Do")

var citySubmitHandler = function (event)
{
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) 
  {
    getWeather(city);
    cityInputEl.value ='';
  }
};
// function to fetch weather data
var getWeather = function(city)
{
  var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=40eb0ca1d6631653dada9f4a96226113";
  
  fetch(apiURL).then(function(response)
  {
    console.log(response);

    if (response.ok)
    {
      response.json().then(function (data)
      {
        displayWeather(data);
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

var displayWeather = function() 
{


};

submitCityEl.addEventListener('click', citySubmitHandler);

    