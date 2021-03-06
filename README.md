# LIRI-Node-App

LIRI: The Language Interpretation and Recognition Interface.

Trilogy Education Services Full-Stack Web Developer Program

Week 10 Homework Assignment:

Create a Language Interpretation and Recognition Interface command line node application.

## Overview

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

This node application at it's core is a simple SWITCH CASE statement.  From the command line run the liri.js file as you would any other Node.js and provide it with any of the following commands then a search term as noted below:

### Commands & Filter:

  * "*concert-this*" *Artist*
     - Will call the Bands In Town API and return the first result of a concert matching the artist that you entered.  
      
  * "*spotify-this-song*" *Song*
      - Will call the Spotify API and return the first result matching the song you entered.  
      
  * "*movie-this*" *Movie*
      - Will call the OMBD API and display the details of the movie you searched for.  
    
  * "*do-what-it-says*" n/a
      - No search filter accepted, just call liri.js with this command and it will read in a search term from the file "random.txt" and search Spotify for the term that was read into the file.  Random.txt is structured as a comma delimited file so the search term is always index 1 on the array created using the javascript "split()" function.  
      
 All entered commands are logged to the comma delimited log.txt file so that it can be easily read into an array later if desired.  You'll need to strip off the trailing ",".  

 #### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
 
 
#### Dependencies:

- fs
- moment
- axios
- node-spotify-api

##### Screenshots

###### Concert-This:

Successful BandsInTown API Call:  
![concert-this](./images/concert-this.png)

###### Spotify-This-Song:  

Successful Spotify API Call:  
![spotify-this-song](./images/spotify-this-song.png)  

###### Spotify-This-Song (No Song):

The "no result/default case when leaving song field blank:  
![spotify-no-song](./images/spotify-no-song.png)

###### Movie-This:

Successful OMDB API Call:  
![movie-this](./images/movie-this.png)

###### Do-What-It-Says:

Successful read of random.txt and Spotify API call using text in file:  
![do-what-it-says](./images/do-what-it-says.png)


