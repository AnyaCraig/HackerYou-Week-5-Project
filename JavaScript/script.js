//PICNICKITY APP - Anya Craig


var picnickity = {}; //The global variable for the JS file, which will hold everything else

var recipeReady = picnickity.selectedChoices = {}; //Another variable which we want to have avialable globally

picnickity.weatherUrl = "http://api.wunderground.com/api/affed6e561e359b6/" //This is the wunderground API endpoint - we're making it a variable here so that we don't have to type it out each time

picnickity.recipeUrl = "http://api.yummly.com/v1/api/recipes" //This is the Yummly API endpoint


//This section controls the moment.JS functionality of the date selector - it makes the actual dates appear (relative to the present day) instead of simple numbers

$("#today").append(moment().add(0, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#tomorrow").append(moment().add(1, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-three").append(moment().add(2, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-four").append(moment().add(3, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-five").append(moment().add(4, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-six").append(moment().add(5, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-seven").append(moment().add(6, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-eight").append(moment().add(7, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-nine").append(moment().add(8, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));
$("#day-ten").append(moment().add(9, "days").calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd'
}));


//This next function is the ajax request to the wunderground API - it connects to their server and requests the 10-day forecast for the selected city in json format

picnickity.getWeather = function(city,day) {

	$.ajax({
		url: "http://api.wunderground.com/api/affed6e561e359b6/forecast10day/q/Canada/"+city+".json",
		dataType: "json",
		type: 'GET',
	
		success: function(weather) {
			console.log(weather);
			console.log(day);
		
			//Here, we're declaring certain pieces of information from the site as variables so that we can use those variable names later
			var weatherResults = (weather.forecast.simpleforecast.forecastday);
			var conditions = (weatherResults[day].conditions);
			var pop = (weatherResults[day].pop);
			var high = (weatherResults[day].high.celsius);
			var low = (weatherResults[day].low.celsius);
			var icon = (weatherResults[day].icon_url)
			console.log(icon);

			
			picnickity.displayWeather(conditions, high, low, pop,icon); //Here, we're calling our displayWeather function

		} //End of success function
	}); // End of ajax request
}; //End of getWeather function

//This next function is the ajax request to the Yummly API - it connects to their server and requests recipes which match the criteria that the user submitted.

picnickity.getRecipes = function() {

	$.ajax({
		url: picnickity.recipeUrl,
		dataType: "jsonp",
		type: 'GET',
		data: { //This compiles the query string that we need to append to the endpoint in order to make a successful ajax request.
			_app_id: "38dbfc6c",
			_app_key:"db0c99cccf6e30ee42a09738d17e8563",
			requirePictures: true,
			q: "picnic" ,
			allowedDiet: [recipeReady.diet1, recipeReady.diet2],
			allowedAllergy: [recipeReady.allowedAllergy1, recipeReady.allowedAllergy2, recipeReady.allowedAllergy3, recipeReady.allowedAllergy4, recipeReady.allowedAllergy5, recipeReady.allowedAllergy6]
		}, //End of query string data object

		success: function(recipes) {
			console.log(recipes);
			picnickity.displayTopRecipes(recipes); //Here, we're calling the function that displays the first three recipes
		} //End of success function
	}); //End of ajax request
}; //End of getRecipes function



//The following function gets the user-inputted data from the date/location form and stores the values as variables

picnickity.searchWeather = function() {
		$(".submit-location").on("click", function (evnt) {
		evnt.preventDefault(); //We're preventing the default action of the form, which is to refresh the page - we don't want that.
		var city = $("#select-city").val();
		var day = $(".select-date").val();

		picnickity.getWeather(city,day); //Also in here, we're calling our getWeather function, because we only want it to run once the user has submitted the date/location form
	}); //End of the .on("click") method for the form submission
} //End of the searchWeather function


//The following function is the displayWeather function - it will display the bits of data we picked out in the DOM in the way we tell it to

picnickity.displayWeather = function(conditions,high,low,pop,icon) { //Here, we're feeding the displayWeather function the arguments it needs to display the things we want it to

	$(".advisory").text("The forecast for that day is: " + conditions + " with a high of " + high + " degrees celsius and a low of " + low + " degrees celsius. The probability of precipitation is " + pop + "%."); //This puts the conditions, high, low, and p.o.p. into a <p> tag on the DOM

	$(".weather-icon").attr("src", icon); //This puts a little icon in the DOM to represent what the weather will be like

	if (low > 10 && high < 38 && pop < 40) {
		$(".advice").text("It looks like great weather for a picnic!");
	} else if (low <= 10 && pop > 39) {
		$(".advice").text("You might want to choose another day - it looks like it might be cold and rainy!");
	} else if (low <= 10) {
		$(".advice").text("Be sure to dress warmly - it looks like it might be chilly!");
	} else if (pop > 39) {
		$(".advice").text("You might want to choose another day - it looks like it might rain!");
	} else if (high > 38) {
		$(".advice").text("Make sure you bring plenty of water - that day will be hella hot!");
	} else {
		$(".advice").text("That doesn't sound like great picnic weather! You might want to choose another day.");
	}
	
	$(".form-1").hide(); //This hides the weather form once the results are revealed

	$(".weather-reveal").show(); //This bit makes the whole weather-reveal div visible to begin with - I've put it in here because I only want 

	picnickity.anotherDay(); //This calls the function that resets the weather form
}

picnickity.anotherDay = function() { //This defines the function that will reset the form
	$(".select-another-day").on("click", function () {
		$(".weather-form")[0].reset();//This resets the form
		$(".form-1").show();//This shows the form
		$(".weather-reveal").hide();//This hides the reveal
	});
}
//The following function grabs the user-inputted values from the food form and stores them as variables
picnickity.searchRecipes = function() {
	$(".food-form").on("submit", function(evnt) {
		evnt.preventDefault();
		console.log("Click listener active!");
		var diet1 = $("#vegetarian:checked").val();
		var diet2 = $("#vegan:checked").val();
		var allowedAllergy1 = $("#gluten-free:checked").val();
		var allowedAllergy2 = $("#dairy-free:checked").val();
		var allowedAllergy3 = $("#egg-free:checked").val();
		var allowedAllergy4 = $("#peanut-free:checked").val();
		var allowedAllergy5 = $("#treenut-free:checked").val();
		var allowedAllergy6 = $("#seafood-free:checked").val();
		picnickity.selectedChoices.diet1 = diet1;
		picnickity.selectedChoices.diet2 = diet2;
		picnickity.selectedChoices.allowedAllergy1 = allowedAllergy1;
		picnickity.selectedChoices.allowedAllergy2 = allowedAllergy2;
		picnickity.selectedChoices.allowedAllergy3 = allowedAllergy3;
		picnickity.selectedChoices.allowedAllergy4 = allowedAllergy4;
		picnickity.selectedChoices.allowedAllergy5 = allowedAllergy5;
		picnickity.selectedChoices.allowedAllergy6 = allowedAllergy6;
		
		picnickity.getRecipes();//Here, we're calling the getRecipes function
		$(".more-recipes").show();//We're making sure the more-recipes button is visible because we hide it sometimes (when there are no more recipes)
	});
}

//The following function displays the top three recipes in the DOM

picnickity.displayTopRecipes = function(recipes) {

	var recipeImg1 = (recipes.matches[0].imageUrlsBySize[90]);
	var recipeImg2 = (recipes.matches[1].imageUrlsBySize[90]);
	var recipeImg3 = (recipes.matches[2].imageUrlsBySize[90]);
	$(".recipe-image-1").attr("src", recipeImg1.replace(/=s90/,"=s500"));
	$(".recipe-image-2").attr("src", recipeImg2.replace(/=s90/,"=s500"));
	$(".recipe-image-3").attr("src", recipeImg3.replace(/=s90/,"=s500"));
	var recipeId1 = recipes.matches[0].id;
	var recipeId2 = recipes.matches[1].id;
	var recipeId3 = recipes.matches[2].id;
	$(".recipe1").attr("data-id", recipeId1);
	$(".recipe2").attr("data-id", recipeId2);
	$(".recipe3").attr("data-id", recipeId3);

	$(".recipe-link-1").attr("href", "http://www.yummly.com/recipe/" + recipeId1 + "?columns=4&position=5%2F37");
	$(".recipe-link-2").attr("href", "http://www.yummly.com/recipe/" + recipeId2 + "?columns=4&position=5%2F37");
	$(".recipe-link-3").attr("href", "http://www.yummly.com/recipe/" + recipeId3 + "?columns=4&position=5%2F37");

	var recipeName1 = recipes.matches[0].recipeName;
	var recipeName2 = recipes.matches[1].recipeName;
	var recipeName3 = recipes.matches[2].recipeName;
	$(".recipe-name-1").text(recipeName1);
	$(".recipe-name-2").text(recipeName2);
	$(".recipe-name-3").text(recipeName3);


	//This next bit removes the top three recipes (the ones that were displayed) from the array and renames the remaining ones - then it calls the moreRecipes function with only the remaining recipes - but only on the event listener
	$(".more-recipes").on("click", function(){
		recipes.matches.splice(0,3);
		var remainingMatches = recipes.matches;
		picnickity.moreRecipes(remainingMatches);
			
	});	


	$(".food-reveal").show(); //Showing the food reveal
	$(".food-section").hide() //Hiding the food form


	picnickity.startAgain(); //This one calls the start again function, which will only activate once the start-again button is clicked

	$(".picnic-basket").show(); //This reveals the picnic basket so that you can save your recipes to it

	$('.save').on('click', function() {
		// The 'this' keyword here refers to the save button that was clicked
		picnickity.saveToBasket(this, recipes.matches);
	});//This runs the saveToBasket function to enable the user to save recipes to the basket
	


}

//This next function is similar to the displayTopRecipes function, but it only uses the pared-down array (missing the recipes that were already displayed and then spliced out above)
picnickity.moreRecipes = function(matches) {
		console.log(matches);

		if (matches.length < 3) {
			$(".more-recipes").hide();//This hides the more-recipes button if there are fewer than three new recipes to show
			
		}

		else {//This runs the function if there are more than three recipes to show
		var recipeImg1 = matches[0].imageUrlsBySize[90];
		var recipeImg2 = matches[1].imageUrlsBySize[90];
		var recipeImg3 = matches[2].imageUrlsBySize[90];
		$(".recipe-image-1").attr("src", recipeImg1.replace(/=s90/,"=s500"));
		$(".recipe-image-2").attr("src", recipeImg2.replace(/=s90/,"=s500"));
		$(".recipe-image-3").attr("src", recipeImg3.replace(/=s90/,"=s500"));
		var recipeId1 = matches[0].id;
		var recipeId2 = matches[1].id;
		var recipeId3 = matches[2].id;
		$(".recipe1").attr("data-id", recipeId1);
		$(".recipe2").attr("data-id", recipeId2);
		$(".recipe3").attr("data-id", recipeId3);

		$(".recipe-link-1").attr("href", "http://www.yummly.com/recipe/" + recipeId1 + "?columns=4&position=5%2F37");
		$(".recipe-link-2").attr("href", "http://www.yummly.com/recipe/" + recipeId2 + "?columns=4&position=5%2F37");
		$(".recipe-link-3").attr("href", "http://www.yummly.com/recipe/" + recipeId3 + "?columns=4&position=5%2F37");

		var recipeName1 = matches[0].recipeName;
		var recipeName2 = matches[1].recipeName;
		var recipeName3 = matches[2].recipeName;
		$(".recipe-name-1").text(recipeName1);
		$(".recipe-name-2").text(recipeName2);
		$(".recipe-name-3").text(recipeName3);

	}

}
//This next function resets and shows the food form, and hides the reveal if the user chooses to start again
picnickity.startAgain = function() {
	$(".start-again").on("click", function() {
		$(".food-form")[0].reset();
		$(".food-section").show();
		$(".food-reveal").hide();

		if ($.trim( $(".saved-recipes").text() ).length === 0) {
			$(".picnic-basket").hide();
			console.log("empty");
		}//This bit checks to see whether the picnic basket is empty - if it is, it hides it when the user chooses to start again - if it has recipes in it - it stays
	});
}
//This next function enables the user to save recipes to a special "holding area" (the picnic basket)
picnickity.saveToBasket = function(button, array) {
	var dataId = $(button).parent().parent().attr("data-id");//This sets a variable of the dataId of the grandparent element - this has been set previously and is set to the ID of whatever recipe is being displayed there
	console.log(dataId);

	for (var emma = 0; emma < array.length; emma++){
		if (dataId == array[emma].id) {
			var recipeName = array[emma].recipeName;
			console.log(recipeName);
		}//This iterates over the array and finds an item with a matching ID - it sets the variable of the recipe name of the item with the matching ID
	}
		picnickity.picnicBasket(dataId, recipeName);//This calls the picnic basket function
}

//This function slots the recipe info into the DOM in the picnic basket
picnickity.picnicBasket = function(dataId, recipeName) {
	$(".saved-recipes").append("<a href=\"" + "http://www.yummly.com/recipe/" + dataId + "?columns=4&position=5%2F37\" target=\"_blank\">" + recipeName + "</a>");//This appends an anchor tag concatenated with the recipe name and ID

	$(".empty-basket").on("click", function (){
		picnickity.emptyBasket();
	});//This calls the function which empties the basket
}
//This describes the function we just called above
picnickity.emptyBasket = function() {
	
		$(".saved-recipes").empty();
		
}

//This is the init function, which holds everything we want to run as soon as the DOM is ready
picnickity.init = function() {
	picnickity.searchWeather();
	picnickity.searchRecipes();
	$(".weather-reveal").hide();
	$(".food-reveal").hide();
	$(".picnic-basket").hide();
}

//This is the document-ready function - it just holds our init function and everything inside it
$(function() {
	picnickity.init();
});


