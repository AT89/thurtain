#Thurtain

A real-time card game playable via a browser. In Tien Lien, you start with a hand of 13 cards and the objective is to get rid of them faster than the other players. The game is playable with 2-4 players, but this app is an implementation of heads-up 13, uno versus uno!

[Check out a live deployment of it here!](http://thurtain.massiveflavor.net) 

It's of course best played with 2 different people, but you can test the functionality by opening the same page in two separate windows/tabs on your browser.

##Technical Specs

The clientside UI is built with Angular, while the backend utilizes a C#/.NET stack to handle the live connections, interact with the DB, and define the models and entities. Below is a more detailed list of technologies used:

#### FRONTEND
* AngularJS, HTML5, CSS
* The game logic is handled here (what hands are playable, what beats what, etc.)