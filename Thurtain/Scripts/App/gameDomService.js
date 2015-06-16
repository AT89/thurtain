// TODO = change all those $() selectors to use vanilla JS (too lazy atm)

(function () {

    'use strict';

    angular
        .module('app')
        .factory('gameDomService', gameDomService);


    function gameDomService() {

        return {
            playerStartGame: playerStartGame
        }

        function playerStartGame(playerStartData) {  
            var whosTurnString = (playerStartData.Starting) ? 'YOUR TURN' : 'THEIR TURN';
            document.getElementById('player-screen-whos-turn').innerHTML = whosTurnString;
            var opponent = playerStartData.Opponent.UserName;

            document.getElementById('player-screen-table-opponent').innerHTML = 'Playing against ' + opponent;
        }

        

    }

})();
