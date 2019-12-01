/////
// OVERVIEW
/////

// UPON A FRESH, LOCALSTORAGE FREE LOAD OF THE PAGE THE ONLY THINGS ORIGINALLY DISPLAYED
// ARE THE JUMBOTRON AND THE SEARCH BAR OR
// ## Bonus
// * Use the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
//  to add the user's current location to the initial landing page.

// * You will need to hardcode some of the parameters in the API's URL.
// User input will determine some of the other parameters.
// * Use `localStorage` to store any persistent data.

/////
// VARIABLES
/////

// This is our API key.
var APIKey = "&appid=8c9bb7e0eeb10862d148cd62de471c05";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// array to add cities to, to be grabbed from after search
var citiesArray = [];

const m = moment();

/////
// FUNCTIONS
/////

/////
// * Create multiple functions within your application to
// handle the different parts of the dashboard:
// * Current conditions
/////

function citySearch(city) {
	// clear out previous city data
	$(".city").empty();
	$(".temp").empty();
	$(".humidity").empty();
	$(".wind").empty();
	$(".uvIndex").empty();

	var citySearch = queryURL + city + APIKey;
	console.log(citySearch);

	// ajax for searching for new city to display
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
		var dateInfo = response.dt;
		console.log(dateInfo);
		var currentDate = moment.unix(dateInfo).format("L");
		console.log("current date" + currentDate);
		//   * Icon image (visual representation of weather conditions)
		// Where are we pulling the icons from and how
		var iconDummy = "http://openweathermap.org/img/wn/";
		var iconPng = "@2x.png";
		var iconWeather = response.weather[0].icon;
		var iconUrl = iconDummy + iconWeather + iconPng;
		console.log(iconUrl);
		var iconImg = $("<img>");
		iconImg.attr("src", iconUrl);
		$(".city").append(cityInfo + " ");
		$(".city").append(currentDate + " ");
		$(".city").append(iconImg);

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

		//   * UV index
		// PULL LON/LAT INFO REPONSE.COORD.LON AND RESPONSE.COORD.LAT
		var lon = response.coord.lon;
		var lat = response.coord.lat;
		// SEND OVER TO uvIndex() AND TAKE RETURNED VALUE, DISPLAY
		uvIndex(lon, lat);
		// // should be able to compare float to the numbers, try it out
		// // then append button with uvFinal printed to it
		// $(".uvIndex").append("UV Index: ");
		// var uvBtn = $("<button>").text(uvFinal);
		// $(".uvIndex").append(uvBtn);
		// // then style uvFinal button with below
		// if (uvFinal < 3) {
		// 	// IF RETURN IS 0-2 SYLE GREEN
		// 	uvBtn.attr("class", "uvGreen");
		// } else if (uvFinal < 6) {
		// 	// IF 3-5 STYLE YELLOW
		// 	uvBtn.attr("class", "uvYellow");
		// } else if (uvFinal < 8) {
		// 	// IF 6-7 STYLE ORANGE
		// 	uvBtn.attr("class", "uvOrange");
		// } else if (uvFinal < 11) {
		// 	// IF 8-10 STYLE RED
		// 	uvBtn.attr("class", "uvRed");
		// } else {
		// 	// IF 11+ STYLE VIOLET
		// 	uvBtn.attr("class", "uvPurple");
		// }
	});
}

/////
// * Create multiple functions within your application to
// handle the different parts of the dashboard:
// * UV index
/////

// // RECIEVES LAT/LON
function uvIndex(lon, lat) {
	// SEARCHES
	var indexURL =
		"http://api.openweathermap.org/data/2.5/uvi?appid=8c9bb7e0eeb10862d148cd62de471c05&lat=";
	var middle = "&lon=";
	var indexSearch = indexURL + lat + middle + lon;
	console.log(indexSearch);

	$.ajax({
		url: indexSearch,
		method: "GET"
	}).then(function(response) {
		var uvFinal = response.value;

		// should be able to compare float to the numbers, try it out
		// then append button with uvFinal printed to it
		$(".uvIndex").append("UV Index: ");
		var uvBtn = $("<button>").text(uvFinal);
		$(".uvIndex").append(uvBtn);
		// then style uvFinal button with below
		if (uvFinal < 3) {
			// IF RETURN IS 0-2 SYLE GREEN
			uvBtn.attr("class", "uvGreen");
		} else if (uvFinal < 6) {
			// IF 3-5 STYLE YELLOW
			uvBtn.attr("class", "uvYellow");
		} else if (uvFinal < 8) {
			// IF 6-7 STYLE ORANGE
			uvBtn.attr("class", "uvOrange");
		} else if (uvFinal < 11) {
			// IF 8-10 STYLE RED
			uvBtn.attr("class", "uvRed");
		} else {
			// IF 11+ STYLE VIOLET
			uvBtn.attr("class", "uvPurple");
		}
	});
}

/////
// RENDER BUTTONS CREATES NEW BUTTONS EACH TIME A CITY IS
// SEARCHED FOR, AND ASSIGNS INFORMATION TO THE BUTTONS.
// HOWEVER, IT PRINTS THEM SIDE BY SIDE CURRENTLY,
// SHOULD WE USE A LIST CARD GROUP TO CREATE THE TOP
// TO BOTTOM LOOK?
/////

function renderButtons() {
	// Deleting the buttons prior to adding new movies
	$(".list-group").empty();

	// Looping through the array of cities
	for (var i = 0; i < citiesArray.length; i++) {
		// Then dynamicaly generating buttons for each
		var a = $("<li>");
		// Adding a class
		a.addClass("cityName");
		a.addClass("list-group-item");
		// Adding a data-attribute
		a.attr("data-name", citiesArray[i]);
		// Providing the initial button text
		a.text(citiesArray[i]);
		// Adding the button to the buttons-view div
		$(".list-group").append(a);
	}

	$(".cityName").on("click", function(event) {
		event.preventDefault();

		var city = $(this).data("name");
		console.log("prev searched city" + city);
		//pull up the information display
		citySearch(city);
	});
}

/////
// * Include a 5-Day Forecast below the current weather conditions.
// Each day for the 5-Day Forecast should display the following:
//   * Date
//   * Icon image (visual representation of weather conditions)
//   * Temperature
//   * Humidity
/////

// ajax for pulling in the data for each of the 5 day forcasts
// create a variable that is the averaging of each days information to be placed
// morning/afternoon/evening
// into the page
// after this display area is dynamcially created it is then available to be dynamically
// updated
// all information pulled is then saved to the most recent local storage information and
// prints it to the screen regardless of being refreshed
// NO IDEA HOW TO DISPLAY THESE

// function fiveDay(city) {
// 	var fiveFront = "http://api.openweathermap.org/data/2.5/forecast?q="
// 	var fiveURL = fiveFront + city + APIKey;
// 	console.log(fiveURL);

// 	$.ajax({
// 		url: fiveURL,
// 		method: "GET"
// 	}).then(function(response) {
// 		//dates
// 		response.list[0].dt
// 		response.list[8].dt
// 		response.list[16].dt
// 		response.list[24].dt
// 		response.list[32].dt

// 		// avg three for temp and humidity
// 		//day one information
// 		//icon
// 		response.list[4].weather.icon
// 		//temp
// 		response.list[2].main.temp
// 		response.list[4].main.temp
// 		response.list[6].main.temp
// 		//humidity
// 		response.list[2].main.humidity
// 		response.list[4].main.humidity
// 		response.list[6].main.humidity

// 		//day two info
// 		//icon
// 		response.list[12].weather.icon
// 		//temp
// 		response.list[10].main.temp
// 		response.list[12].main.temp
// 		response.list[14].main.temp
// 		//humidity
// 		response.list[10].main.humidity
// 		response.list[12].main.humidity
// 		response.list[14].main.humidity

// 		//day three info
// 		//icon
// 		response.list[20].weather.icon
// 		//temp
// 		response.list[18].main.temp
// 		response.list[20].main.temp
// 		response.list[22].main.temp
// 		//humidity
// 		response.list[18].main.humidity
// 		response.list[20].main.humidity
// 		response.list[22].main.humidity

// 		//day four info
// 		//icon
// 		response.list[28].weather.icon
// 		//temp
// 		response.list[26].main.temp
// 		response.list[28].main.temp
// 		response.list[30].main.temp
// 		//humidity
// 		response.list[26].main.humidity
// 		response.list[28].main.humidity
// 		response.list[30].main.humidity

// 		//day five info
// 		//icon
// 		response.list[36].weather.icon
// 		//temp
// 		response.list[34].main.temp
// 		response.list[36].main.temp
// 		response.list[38].main.temp
// 		//humidity
// 		response.list[34].main.humidity
// 		response.list[36].main.humidity
// 		response.list[38].main.humidity
// 	}

// }

/////
// EVENTS
/////

// THESE EVENTS WERE MOSTLY COPIED OVER FROM PREVIOUS ACTIVITY EXAMPLES
// AND WORK TO A CERTAIN EXTENT

$("#add-city").on("click", function(event) {
	event.preventDefault();

	//line that grabs input from the textbox
	var city = $("#city-input")
		.val()
		.trim();

	//push new city into the Array (11/20 unit 9)
	citiesArray.push(city);

	// search for the city
	citySearch(city);

	//give city info to five day forcast cards as well
	// fiveDay(city);

	// then setting up a button that is created for each city searched for
	renderButtons();
});

renderButtons();

// citySearch grabs whatever is still in the search box
// how do we get it to use .cityName data-name instead
// for this particular situation

$(".cityName").on("click", function(event) {
	event.preventDefault();

	var city = $("data-name").val();
	console.log("prev searched city" + city);

	//pull up the information display
	citySearch(city);

	//give city info to five day forcast cards as well
	// fiveDay(city);
});
