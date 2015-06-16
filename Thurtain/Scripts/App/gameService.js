(function () {

    'use strict';

    angular
        .module('app')
        .factory('gameService', gameService);

    gameService.$inject = ['uiDomService', 'chatService', 'gameDomService'];

    function gameService(uiDomService, chatService, gameDomService) {

        var gameHub = $.connection.gameHub;

        return {
            receiveViewerGameStartData: receiveViewerGameStartData,
            receivePlayerStartData: receivePlayerStartData,
            sitEvent: sitEvent,
            standEvent: standEvent
        }

        function receiveViewerGameStartData(viewerStartData) {
            console.log(viewerStartData);
            uiDomService.viewerStartGame();
        }

        function receivePlayerStartData(playerStartData) {
            console.log(playerStartData);
            uiDomService.playerStartGame();
            gameDomService.playerStartGame(playerStartData);
            
        }

        function sitEvent(sitEventData) {
            console.log(sitEventData);
        }

        function standEvent(standEventData) {
            console.log(standEventData);
            chatService.appendGameMessage(standEventData.User.UserName + ' has left the game.');
            uiDomService.stand();
        }




    }

})();
