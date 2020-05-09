//GLOBAL VARIABLES
//================

    //REQUIRE
    //=======
    require("dotenv").config();
    var fs = require("fs");
    var axios = require("axios");
    var keys = require("./keys.js");
    var moment = require("moment");
    var Spotify = require("node-spotify-api");
    var spotify = new Spotify(keys.spotify);
    
    //INPUT VARIABLES
    //===============
    var inputCommand = process.argv[2];
    var inputTitle = process.argv.slice(3).join(" ");

//MAIN PROCESS
//============    

    //Switch statement that calls each function depending on user input
	switch (inputCommand) {

		//Option 1: node liri.js concert-this
		case "concert-this":
			//Call Function for generating artist from Bandsintown API
			concertThis();
			break;

		//Option 2: node liri.js spotify-this-song '<song name here>'
		case "spotify-this-song":
			//Call Function for generating song info from Spotify API
			spotifyThis();
			break;

		//Option 3: node liri.js movie-this '<movie name here>'
		case "movie-this":
			//Call Function for generating movie info from OMDB API
			movieThis();
			break;

		//Option 4: node liri.js do-what-it-says
		case "do-what-it-says":
			//Call Function for generating random command in random.txt file
			doWhatItSays();
			break;

		//Default "else" option, which console.logs the instructions to user in case of bad command
		default: console.log(
			'\n ==== THAT IS NOT A VALID COMMAND ====' +
			'\n PLEASE RUN ONE OF THE COMMANDS BELOW:' +
			'\n node liri.js concert-this' +
			'\n node liri.js spotify-this-song "any song name"' +
			'\n node liri.js movie-this "any movie name"' +
			'\n node liri.js do-what-it-says' +
			'\n'
			);
    }
    
//FUNCTIONS
//=========
    
    //concertThis Function
    function concertThis() {
        //Logging a separator to place the results in
        console.log("\n === HERE ARE YOUR RESULTS ===\n");

        //Creating a new variable for Bandsintown API
        var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

        //Get the user input for the artist name and store it in a new variable
        var artistName = inputTitle;

        //Store the artist name as a parameter for the search:
		var params = artistName;

        //Search Bandsintown API
		axios.get(queryURL).then(
            function (err, response, body) {
            
            //If there is an error, log the error
			if (err) {
				return console.log('Error occurred: ' + err);
			} else {
                
                //Parse JSON data into new Variable
				var data = JSON.parse(body);

                //Log the artist information
				var output =	" ---- You searched for: " + params.toUpperCase() + " ----" +
								"\n   Venue Name: " + data.venue.name +
								"\n   Venue City: " + data.venue.city +
								"\n   Venue Location: " + data.venue.location +
								"\n   Date: " + moment(data.datetime.format("MM/DD/YYYY")) + 
								"\n --------------------------------" +
								"\n";

				console.log(output);

				//BONUS Append data to log.txt file
				appendToLogFile(output);

			} 
		});
    } 
    
    //spotifyThis Function
	function spotifyThis() {
		//Logging a separator to place the results under
		console.log("\n ==== HERE IS YOUR SONG ====\n");

		//Creating a new spotify variable using the keys file
		var spotify = new Spotify({
			id: keys.spotify.id,
			secret: keys.spotify.secret
		});

		//Get the user input for the song title and store in new Variable
		var songTitle = inputTitle;

		//If the user doesn't input a song
		if(!songTitle){
			//then the song title will be The Sign
			songTitle = "The Sign";
		}

		//Store the song title as a parameter for the search:
		var params = songTitle;

		//Search Spotify api
		spotify.search({ type: 'track', query: params }, function(err, data) {

			//If there is an error, log the error
			if (err) {
				return console.log('Error occurred: ' + err);
			} else {
				//Otherwise, log the song information:
				var output = 	" ---- You searched for: " + params.toUpperCase() + " ----" +
								"\n   Artist: " + data.tracks.items[0].album.artists[0].name +
								"\n   Song Name: " + params +
								"\n   Album: " + data.tracks.items[0].album.name +
								"\n   Preview link on Spotify: " + data.tracks.items[0].album.external_urls.spotify +
								"\n --------------------------------" +
								"\n";

				console.log(output);

				//BONUS Append data to log.txt file
				appendToLogFile(output);
			}
		});
    }
    
    //movieThis Function
	function movieThis() {
		//Logging a separator to place the results under
		console.log("\n ==== HERE IS YOUR MOVIE ====\n");

		//Get the user input for the movie title
		var movieTitle = inputTitle;

		//If the user doesn't input a movie title
		if(!movieTitle) {
			//Then the movie title will be "Mr Nobody"
			movieTitle = "mr nobody";
		}

		//Store the movie title into a new Variable
		var params = movieTitle;

		//Use request to retrieve the information from OMDB api
		axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
            function (error, response, body) {

			//If there is no error, return information
			if (!error && response.statusCode == 200) {

				//Parse JSON data into new Variable
				var data = JSON.parse(body);

				//Console.log the movie information
				var output =	" ---- You searched for: " + params.toUpperCase() + " ----" +
								"\n   Movie Title: " + data.Title +
								"\n   Release Year: " + data.Year +
								"\n   IMDB Rating: " + data.Ratings[0].Value +
								"\n   Rotten Tomatoes Rating: " + data.Ratings[1].Value +
								"\n   Production Country: " + data.Country +
								"\n   Language: " + data.Language +
								"\n   Plot: " + data.Plot +
								"\n   Actors: " + data.Actors +
								"\n --------------------------------" +
								"\n";

				console.log(output);

				//BONUS Append data to log.txt file
				appendToLogFile(output);

			} else {
				console.log('error:', error); // Print the error if one occurred
				return;
			}
		});
    } 
    
    //doWhatItSays Function
	function doWhatItSays() {

		//Use fs to read the random file
		fs.readFile("random.txt", "utf8", function(error, data) {

			//If there isn't an error
			if (!error) {

				//get the data from the file and split it into an array
				var randomFileText = data.split(",");

				//Grab each portion of the new array and save as new input command and input title
				var randomInputCommand = randomFileText[0];
				var randomInputTitle = randomFileText[1];

				//Use the new variables to run the same switch statement and call all functions as above
					//Switch statement that calls each function depending on user input
					switch (randomInputCommand) {

						//Option 1: node liri.js my-tweets
						case "concert-this":
							//Call Function for generating 
							concertThis();
							break;

						//Option 2: node liri.js spotify-this-song '<song name here>'
						case "spotify-this-song":
							//Call Function for generating song info from Spotify API
							//User Input for song and movie titles
							inputTitle = randomInputTitle;
							spotifyThis();
							break;

						//Option 3: node liri.js movie-this '<movie name here>'
						case "movie-this":
							//Call Function for generating movie info from OMDB API
							//User Input for song and movie titles
							inputTitle = randomInputTitle;
							movieThis();
							break;

						//Default "else" option, which console.logs the instructions to user in case of bad command
						default: console.log(
							'\n ==== THAT IS NOT A VALID COMMAND ====' +
							'\n PLEASE RUN ONE OF THE COMMANDS BELOW:' +
							'\n node liri.js my-tweets' +
							'\n node liri.js spotify-this-song "any song name"' +
							'\n node liri.js movie-this "any movie name"' +
							'\n node liri.js do-what-it-says' +
							'\n'
							);
					}
			} else {
				throw error;
			}
		});
	}

	// =====
	// BONUS
	// =====
		//Function that appends data to a log file
		function appendToLogFile(data) {

			//Add data
			fs.appendFile("log.txt", JSON.stringify(data), function(err) {

				// If an error was experienced we say it.
				if (err) {
					console.log(err);
				}
				// If no error is experienced, we'll log the phrase "Content Added" to our node console.
				else {
					console.log("The 'log.txt' has been updated and more content has been added!");
				}
			});
		}