(function () {

    'use strict';

    angular
        .module('app')
        .controller('rootController', rootController);

    rootController.$inject = [
        'uiDomService',
        'chatService',
        'userService',
        'gameService',
        'validHandService',
        'handBattleService',
        'gamePlayerService',
        'gameViewerService'
    ];

    function rootController(
        uiDomService,
        chatService,
        userService,
        gameService,
        validHandService,
        handBattleService,
        gamePlayerService,
        gameViewerService
    ) {
 
        $.connection.hub.start();

        // Uncomment below 2 lines to unable testing
        //var testHub = $.connection.testHub;
        //testHub.client.SendFullDeck = function (cards) { $scope.$broadcast('getFullDeck', cards); }
    }
})();