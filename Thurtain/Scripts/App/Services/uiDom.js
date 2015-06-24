// TODO = change all those $() selectors to use vanilla JS (too lazy atm)

(function () {

    'use strict';

    angular
        .module('app')
        .factory('uiDomService', uiDomService);


    function uiDomService() {


        // Caching JQuery DOM Queries
        var loadingContainer = $('#loading-container'),
            loginContainer = $('#login-container'),
            loginEmailInput = $('#login-login-email'),
            chatMessages = $('#chat-messages'),
            headerMenuItems = $('.header-menu-item'),
            gameContainer = $('#game-container'),
            usersContainer = $('#users-container'),
            chatContainer = $('#chat-container'),
            headerLogo = $('#header-logo'),
            headerOptions = $('#header-options-container'),
            sitToPlay = $('#sit-to-play'),
            standUp = $('#stand-up'),
            waitingScreen = $('#waiting-screen'),
            playerScreen = $('#player-screen'),
            viewerScreen = $('#viewer-screen'),
            cardsContainer = $('#player-screen-table-opponentcards');

        return {
            connectionInitialized: connectionInitialized,
            resizeChat: resizeChat,
            userLoggedIn: userLoggedIn,
            sit: sit,
            stand: stand,
            playerStartGame: playerStartGame,
            viewerStartGame: viewerStartGame,
            refreshOpponentCardDisplay: refreshOpponentCardDisplay,
            standRemaining: standRemaining
        }

        function connectionInitialized() {
            var thurtain = document.getElementById('login-logo-thurtain');
            var headsup = document.getElementById('login-logo-headsup');

            loadingContainer.css('display', 'none');
            loginContainer.css('display', 'block');
            showLoginLogo();
            loginEmailInput.focus();

            function showLoginLogo() {
                setTimeout(function () {
                    thurtain.style.display = 'block';
                    setTimeout(function () {
                        headsup.style.display = 'block';
                    }, 600);
                }, 350);
            }
        }

        function resizeChat() {
            var adjustedHeight = $(window).height() - 260;
            chatMessages.css('height', adjustedHeight + 'px');
        }

        function userLoggedIn() {
            headerMenuItems.css('display', 'block');
            loginContainer.css('display', 'none');
            gameContainer.css('display', 'block');
            usersContainer.css('display', 'block');
            chatContainer.css('display', 'block');
            headerLogo.css('border-right', '1px solid #EEEEEE')
            headerOptions.css('display', 'block');
        }

        function sit() {
            sitToPlay.css('display', 'none');
            standUp.css('display', 'block');
        }

        function stand() {
            standUp.css('display', 'none');
            sitToPlay.css('display', 'block');
            waitingScreen.css('display', 'block');
            playerScreen.css('display', 'none');
            viewerScreen.css('display', 'none');
        }

        function standRemaining() {
            standUp.css('display', 'block');
            sitToPlay.css('display', 'none');
            waitingScreen.css('display', 'block');
            playerScreen.css('display', 'none');
        }

        function playerStartGame() {
            waitingScreen.css('display', 'none');
            playerScreen.css('display', 'block');
        }


        function viewerStartGame() {
            waitingScreen.css('display', 'none');
            viewerScreen.css('display', 'block');
        }

        function refreshOpponentCardDisplay(numberOfCards) {
            cardsContainer.html('');
            for (var i = 0; i < numberOfCards; i++) {
                cardsContainer.append('<div class="hidden-card"></div>');
            }
        }

    }

})();
