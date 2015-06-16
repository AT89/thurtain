// TODO = change all those $() selectors to use vanilla JS (too lazy atm)

(function () {

    'use strict';

    angular
        .module('app')
        .factory('uiDomService', uiDomService);


    function uiDomService() {

        return {
            connectionInitialized: connectionInitialized,
            resizeChat: resizeChat,
            userLoggedIn: userLoggedIn,
            sit: sit,
            stand: stand,
            playerStartGame: playerStartGame,
            viewerStartGame: viewerStartGame,
            refreshOpponentCardDisplay: refreshOpponentCardDisplay
            //displayWaitingScreen: displayWaitingScreen
        }

        function connectionInitialized() {
            $('#loading-container').css('display', 'none');
            $('#login-container').css('display', 'block');
            $('#username-input').focus();
        }

        function resizeChat() {
            var adjustedHeight = $(window).height() - 260;
            $('#chat-messages').css('height', adjustedHeight + 'px');
        }

        function userLoggedIn() {
            $('.header-menu-item').css('display', 'block');
            $('#login-container').css('display', 'none');
            $('#game-container').css('display', 'block');
            $('#users-container').css('display', 'block');
            $('#chat-container').css('display', 'block');
        }


        function sit() {
            $('#sit-to-play').css('display', 'none');
            $('#stand-up').css('display', 'block');
        }

        function stand() {
            $('#stand-up').css('display', 'none');
            $('#sit-to-play').css('display', 'block');
            $('#waiting-screen').css('display', 'block');
            $('#player-screen').css('display', 'none');
        }

        function playerStartGame() {
            $('#waiting-screen').css('display', 'none');
            $('#player-screen').css('display', 'block');
        }

        //function displayWaitingScreen() {
            
        //}

        function viewerStartGame() {
            $('#waiting-screen').css('display', 'none');
            $('#viewer-screen').css('display', 'block');
        }

        function refreshOpponentCardDisplay(numberOfCards) {
            var $cardsContainer = $('#player-screen-table-opponentcards');
            $cardsContainer.html('');
            for (var i = 0; i < numberOfCards; i++) {
                $cardsContainer.append('<div class="hidden-card"></div>');
            }
        }

    }

})();
