(function () {

    'use strict';

    angular
        .module('app')
        .factory('gameViewerService', gameViewerService);

    gameViewerService.$inject = ['$rootScope', '$timeout', 'uiDomService'];

    function gameViewerService($rootScope, $timeout, uiDomService) {

        var gameHub = $.connection.gameHub;

        gameHub.client.ReceiveViewerGameStartData = processViewerStartData;
        gameHub.client.ReceiveViewerTurnInfo = processViewerTurnInfo;

        var vm = $rootScope;

        vm.playerOneUsername = '';
        vm.playerTwoUsername = '';
        vm.thisPlayersTurn = '';
        vm.playerOneCards = [];
        vm.playerTwoCards = [];
        vm.playerOneCardsPlayed = [];
        vm.playerTwoCardsPlayed = [];
        vm.lastCardsPlayed = [];


        //
        //
        // Private Methods

        // Used for sorting cards in order
        function valueComparator(cardA, cardB) {
            return cardA.OrderedValue - cardB.OrderedValue;
        }

        function resetGameState() {
            vm.playerOneUsername = '';
            vm.playerTwoUsername = '';
            vm.thisPlayersTurn = '';
            vm.playerOneCards = [];
            vm.playerTwoCards = [];
            vm.playerOneCardsPlayed = [];
            vm.playerTwoCardsPlayed = [];
            vm.lastCardsPlayed = [];
        }

        function processViewerStartData(viewerStartData) {

            resetGameState();

            uiDomService.viewerStartGame();

            vm.playerOneUsername = viewerStartData.Player1.UserName;
            vm.playerTwoUsername = viewerStartData.Player2.UserName;

            vm.thisPlayersTurn = viewerStartData.Starter.UserName;

            vm.playerOneCards = viewerStartData.Player1StartingHand.sort(valueComparator);
            vm.playerTwoCards = viewerStartData.Player2StartingHand.sort(valueComparator);

            $timeout(updateDOM);
        }

        function processViewerTurnInfo(turnInfo) {

            vm.thisPlayersTurn = turnInfo.NextPlayer;

            var i;
            if (turnInfo.PlayerNumber === 1) {
                vm.playerOneCards = turnInfo.CardsRemaining;

                if (!turnInfo.Skipped) {
                    turnInfo.CardsPlayed.forEach(function (card) {
                        vm.playerOneCardsPlayed.push(card);
                    });
                    vm.playerOneCardsPlayed.sort(valueComparator);
                }
            } else {
                vm.playerTwoCards = turnInfo.CardsRemaining;

                if (!turnInfo.Skipped) {
                    turnInfo.CardsPlayed.forEach(function (card) {
                        vm.playerTwoCardsPlayed.push(card);
                    });
                    vm.playerTwoCardsPlayed.sort(valueComparator);
                }
            }

            vm.lastCardsPlayed = (turnInfo.CardsPlayed === null) ? vm.lastCardsPlayed : turnInfo.CardsPlayed;

            $timeout(updateDOM);
        }




        function updateDOM() { }
        return {}
    }

})();
