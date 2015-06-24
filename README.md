# Thurtain

A real-time card game playable via a browser. In Tien Lien, you start with a hand of 13 cards and the objective is to get rid of them faster than the other players. The game is playable with 2-4 players, but this app is an implementation of heads-up 13, uno versus uno!

[Check out a live deployment of it here!](http://thurtain.massiveflavor.net) 

It's of course best played with 2 different people, but you can test the functionality by opening the same page in two separate windows/tabs on your browser.

*NOTE: Game only tested to be working on latest versions of Firefox and Chrome. Also, haven't yet implemented the separate leaderboard, rules, and testing pages.*

## Game Features
* Simple login system
    - Used to record player statistics to provide all-time stats, as well as heads-up statistics between any two players
* Live chat on the side (just won and want to rub it in their face? go for it!)
* Ability to drag and sort your hand as you please
* Viewer-Mode: Anyone that's connected but not playing will automatically see the game in real-time.

## Technical Specs

The clientside UI is built with Angular, while the backend utilizes a C#/.NET stack to handle the live connections, interact with the DB, and define the models and entities. Below is a more detailed list of the technologies and how they're used:

#### FRONTEND
* HTML5 + CSS3
* JS: Angular, jQuery, underscore
* The game logic is handled here (what hands are playable, what beats what, etc.)


#### BACKEND
* ASP.NET MVC5 as the base application
* SignalR to handle real-time connections
* EntityFramework for ORM
* SQL Server 2012 for DB
* Separate Class Library projects to hold the models, entities, and various services needed for backend tasks

## How is the state handled?

Aside from keeping track of users and players, the server doesn't really track any of the game state. Instead, the server simply acts as a mediator between the two players, passing around the game state that's created and verified from the frontend. Any data that the server receives from the clients are "good" data, in that they have been validated in JS before being sent to the server, helping to keep the server load to a bare minimum.



