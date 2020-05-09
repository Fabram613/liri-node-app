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
    var inputTitle = process.argv[3];

//MAIN PROCESS
//============    

    //Switch statement that calls each function depending on user input
	switch (inputCommand) {

		//Option 1: node liri.js concert-this
		case "concert-this":
			//Call Function for generating tweets from Twitter API
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
			'\n node liri.js my-tweets' +
			'\n node liri.js spotify-this-song "any song name"' +
			'\n node liri.js movie-this "any movie name"' +
			'\n node liri.js do-what-it-says' +
			'\n'
			);
	}