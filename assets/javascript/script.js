// UPON A FRESH, LOCALSTORAGE FREE LOAD OF THE PAGE THE ONLY THINGS ORIGINALLY DISPLAYED
// ARE THE JUMBOTRON AND THE SEARCH BAR OR
// ## Bonus
// * Use the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
//  to add the user's current location to the initial landing page.

// AFTER THE FIRST SEARCH THE INFORMATION ON THE PAGE AND THE INFORMATION IN THE SAVE
// BUTTONS ARE LOCATED TO BE REPULLED FROM LOCAL STORAGE

// moment.js for the date information? Date for today, and then one for each of the 5 day forcast

// * You will need to hardcode some of the parameters in the API's URL.
// User input will determine some of the other parameters.
// * Use `localStorage` to store any persistent data.

/////
// variables
/////

// This is our API key.
var APIKey = "&appid=8c9bb7e0eeb10862d148cd62de471c05";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// array to add cities to, to be grabbed from after search
var citiesArray = [];

/////
// function
/////

// * Create multiple functions within your application to
// handle the different parts of the dashboard:
// * Current conditions
// * 5-Day Forecast
// * Search history
// * UV index

// ajax for searching for new city to display
// and setting up a button that is created for each city searched for
// then displaying the searched for information onto the upper right area
// after this display area is dynamcially created it is then available to be dynamically
// updated

function citySearch() {
	// clear out previous city data
	$("#r2a").empty();

	// grab new city name and search for its information
	var city = $("#city-input").val();

	var citySearch = queryURL + city + APIKey;
	console.log(citySearch);

	$.ajax({
		url: citySearch,
		method: "GET"
	}).then(function(response) {
		// * Display the following under current weather conditions:

		//  line one
		//   * City
		var cityInfo = response.name;
		console.log(cityInfo);
		//   * Date
		// var currentDate =
		//   * Icon image (visual representation of weather conditions)
		// Where are we pulling the icons from and how

		// $(".city").append(cityInfo + " (" + date + ") " + weatherIcon);

		// line two
		//   * Temperature
		// Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
		console.log(response.main.temp);
		var K = response.main.temp;
		console.log(K);
		var F = ((K - 273.15) * 1.8 + 32).toFixed(0);
		console.log(F);
		$(".temp").append("Temperature: " + F + " °F");

		// line three
		//   * Humidity
		var humidityInfo = response.main.humidity;
		$(".humidity").append("Humidity: " + humidityInfo + "%");

		// line four
		//   * Wind speed
		// To convert from meters per second to Miles Per Hour
		console.log(response.wind.speed);
		var oldSpeed = response.wind.speed;
		console.log(oldSpeed);
		var newSpeed = (oldSpeed * 2.2369).toFixed(2);
		$(".wind").append("Wind Speed: " + newSpeed + " MPH");
	});

	//   * UV index
	// UV index is one of the elements... at what point should it go from green to yellow to red?
}

function renderButtons() {
	// Deleting the buttons prior to adding new movies
	$("#buttons-view").empty();

	// Looping through the array of cities
	for (var i = 0; i < citiesArray.length; i++) {
		// Then dynamicaly generating buttons for each
		var a = $("<button>");
		// Adding a class of movie to our button
		a.addClass("cityName");
		// Adding a data-attribute
		a.attr("data-name", citiesArray[i]);
		// Providing the initial button text
		a.text(citiesArray[i]);
		// Adding the button to the buttons-view div
		$("#buttons-view").append(a);
	}
}

// * Include a 5-Day Forecast below the current weather conditions.
// Each day for the 5-Day Forecast should display the following:
//   * Date
//   * Icon image (visual representation of weather conditions)
//   * Temperature
//   * Humidity

// ajax for pulling in the data for each of the 5 day forcasts
// create a variable that is the averaging of each days information to be placed
// morning/afternoon/evening
// into the page
// after this display area is dynamcially created it is then available to be dynamically
// updated

// all information pulled is then saved to the most recent local storage information and
// prints it to the screen regardless of being refreshed, recent cities also set to
// localstorage

$("#add-city").on("click", function(event) {
	event.preventDefault();

	//line that grabs input from the textbox
	var city = $("#city-input")
		.val()
		.trim();

	//push new city into the Array (11/20 unit 9)
	citiesArray.push(city);

	// then
	renderButtons();
});

$(document).on("click", "#add-city", citySearch);

renderButtons();
