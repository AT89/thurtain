(function () {

    'use strict';

    angular
        .module('app')
        .factory('gameService', gameService);

    gameService.$inject = ['uiDomService', '$rootScope', '$timeout'];

    function gameService(uiDomService, $rootScope, $timeout) {

        var gameHub = $.connection.gameHub;

        gameHub.client.StandEvent = uiDomService.stand;
        gameHub.client.GetLeaderboard = getLeaderboard;
        gameHub.client.UpdateAlltimeStats = updateAlltimeStats;


        var vm = $rootScope;

        // State Variables
        vm.leftGame = false;
        vm.boardusers = [];

        // Methods
        vm.sit = sit;
        vm.stand = stand;
        vm.leaveGame = leaveGame;

        function sit() {
            vm.leftGame = false;
            uiDomService.sit();
            gameHub.server.playerSits();
        }

        function stand() {
            gameHub.server.playerStands(vm.hasPlayedHand);
        }

        function leaveGame() {
            vm.leftGame = true;
            stand();
        }

        function getLeaderboard(leaderboard) {
            
            console.log(addWinPercentageToStats(leaderboard));

            vm.boardusers = addWinPercentageToStats(leaderboard).sort(function (a, b) {
                return b.Wins - a.Wins;
            });

            $timeout(updateDOM);
        }

        function addWinPercentageToStats(userStats) {
            return _.map(userStats, function (stat) {
                var calculatedPercentage = Math.round((stat.Wins / (stat.Wins + stat.Losses)) * 100);
                stat.WinPercentage = _.isNaN(calculatedPercentage) ? '' : calculatedPercentage;
                return stat;
            });
        }

        function updateAlltimeStats(statString) {
            document.getElementById('player-screen-alltimerecord').innerHTML = statString;
        }


        function updateDOM() { }
        return {}
    }

})();
