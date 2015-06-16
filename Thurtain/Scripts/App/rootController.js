(function () {

    'use strict';

    angular
        .module('app')
        .controller('rootController', rootController);

    rootController.$inject = [
        '$scope',
        'uiDomService',
        'chatService',
        'userService',
        'gameService',
        'validHandService',
        'handBattleService',
        '$interval'
    ];

    function rootController($scope,
                            uiDomService,
                            chatService,
                            userService,
                            gameService,
                            validHandService,
                            handBattleService,
                            $interval) {

        var userHub = $.connection.userHub;
        var chatHub = $.connection.chatHub;
        var gameHub = $.connection.gameHub;
        var testHub = $.connection.testHub;

        init();

        function init() {
            chatAutoResize();
            $(window).resize(chatAutoResize());
        }

        var dealSounds = [
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav'),
                new Audio('/Sounds/cardPlace3.wav')
        ]

        var playHandSound = new Audio('/Sounds/cardSlide7.wav');
        var skipSound = new Audio('/Sounds/theyskipped.wav');
        var yourTurnSound = new Audio('/Sounds/chipLay1.wav');


        var vm = this;
        vm.connectedUsers = null;
        vm.sit = sit;
        vm.stand = stand;
        vm.leaveGame = leaveGame;

        // Playing variables and state
        vm.myPlayingCards = [];
        vm.myTurn = false;
        vm.selectCard = selectCard;
        vm.mySelection = [];
        vm.freeTurn = false;
        vm.handToBeat = [];
        vm.gameWon = false;
        vm.liveTableHand = [];

        function selectCard($event, card) {
            if (vm.myTurn) {
                var domCard = $($event.target);
                if (card.Selected === false) {
                    vm.mySelection.push(card);
                    domCard.toggleClass('highlighted');
                    card.Selected = !card.Selected;
                } else {
                    removeCard(card, vm.mySelection);
                    domCard.toggleClass('highlighted');
                    card.Selected = !card.Selected;
                }
            }
        }

        function removeCard(card, cardList) {
            var index = cardList.indexOf(card);
            cardList.splice(index, 1);
        }

        function removeManyCards(cards, cardList) {
            cards.forEach(function (card) {
                removeCard(card, cardList);
            });
        }

        function displayGameNotification(message, time) {
            if (time == null)
                time = 2500;
            $('#player-screen-table-notifier').text(message);
            setTimeout(function () {
                $('#player-screen-table-notifier').text('');
            }, time);
        }

        function submitHand() {
            if (vm.mySelection.length === 0) {
                displayGameNotification('NO CARDS SELECTED!');
            }
            if (vm.freeTurn) {
                if (validHandService.checkForValidHand(vm.mySelection.sort(valueComparator)) === false) {
                    displayGameNotification('INVALID HAND!');
                } else {
                    // send the data (okay for you to play)
                    // remove selection from remaining
                    removeManyCards(vm.mySelection, vm.myPlayingCards);
                    playHandSound.play();

                    vm.gameWon = (vm.myPlayingCards.length === 0) ? true : false;
                    var turnInfo = turnInfoDTOBuilder(false);
                    gameHub.server.processPlayerTurn(turnInfo);

                    vm.liveTableHand = vm.mySelection;


                    $scope.$apply();
                    resetAndWait();
                }
            } else {
                if (validHandService.checkForValidHand(vm.mySelection.sort(valueComparator)) === false) {
                    displayGameNotification('INVALID HAND!');
                } else {
                    if (handBattleService.doesYoursBeatTheirs(vm.handToBeat, vm.mySelection)) {
                        // send the data (okay for you to play)
                        // remove selection from remaining
                        removeManyCards(vm.mySelection, vm.myPlayingCards);
                        playHandSound.play();

                        vm.gameWon = (vm.myPlayingCards.length === 0) ? true : false;
                        var turnInfo = turnInfoDTOBuilder(false);
                        gameHub.server.processPlayerTurn(turnInfo);

                        vm.liveTableHand = vm.mySelection;


                        $scope.$apply();
                        resetAndWait();

                    } else {
                        displayGameNotification('YOUR HAND DOESN\'T BEAT THEIRS.');
                    }
                }

            }

            if (vm.myPlayingCards.length === 0) {
                vm.gameWon = true;
                // test.................................
                displayGameNotification('YOU WON!', 3500);
            }
        }

        function turnInfoDTOBuilder(skipped) {
            return {
                CardsPlayed: skipped ? [] : vm.mySelection,
                CardsRemaining: vm.myPlayingCards,
                WonGameOver: vm.gameWon,
                Skipped: skipped ? true : false
            };
        }



        function skipTurn() {
            skipSound.play();
            var turnInfo = turnInfoDTOBuilder(true);
            gameHub.server.processPlayerTurn(turnInfo);
            $scope.$apply();
            resetAndWait();

        }

        function resetAndWait() {
            document.getElementById('player-screen-whos-turn').innerHTML = 'THEIR TURN';
            vm.myTurn = false;
            vm.mySelection = [];
            $scope.$apply();
        }

        var numberOpponentCards = 13;

        gameHub.client.ProcessOpponentTurn = function (turnInfo) {
            console.log(turnInfo)
            if (turnInfo.OpponentWon) {
                // let everyone know, and RESET GAME
                displayGameNotification('you lost!');
                setTimeout(function () {
                    gameHub.server.gameStart();
                }, 3000);
            }

            numberOpponentCards = numberOpponentCards - turnInfo.NumberCardsPlayed;
            uiDomService.refreshOpponentCardDisplay(numberOpponentCards);

            vm.myTurn = true;

            vm.freeTurn = turnInfo.OpponentSkipped;
            if (turnInfo.OpponentSkipped) {
                skipSound.play();
            } else {
                yourTurnSound.play();
            }


            document.getElementById('player-screen-whos-turn').innerHTML = 'YOUR TURN';
            vm.handToBeat = turnInfo.CardsPlayed;
            vm.liveTableHand = turnInfo.CardsPlayed;

            if (vm.freeTurn) {
                displayGameNotification('PLAY ANYTHING (THEY SKIPPED)');
            }

            $scope.$apply();

        }

        function leaveGame() {
            stand();
        }



        function chatAutoResize() {
            uiDomService.resizeChat();
        }

        $('#chat-textbox').bind('keyup', function (e) {
            if (e.keyCode === 13)
                chatService.sendChatMessage();
        });

        $('#username-input').bind('keyup', function (e) {
            if (e.keyCode === 13)
                userService.login();
        });

        function sit() {
            uiDomService.sit();
            gameHub.server.playerSits();
        }

        function stand() {
            uiDomService.stand();
            gameHub.server.playerStands();
        }

        //
        // Start SignalR Connection
        // Depends on Transport and Physical connections being active.
        // Functions defined inside are from CLIENT ---> SERVER
        $.connection.hub.start().done(function () {

            $('#loginButton').click(function login() {
                userService.login();
            });

            //$('#header-disc-container').click(function disconnect() {
            //    userService.logoff();
            //});

            $('#chat-send').click(function sendChatMessage() {
                chatService.sendChatMessage();
            });

            $('#playerTurnSubmitButton').click(submitHand);

            $('#playerTurnSkipButton').click(skipTurn);

        });


        userHub.client.ConnectionInitialized = function () {
            uiDomService.connectionInitialized();
        }

        userHub.client.UpdateAllUserList = function (userList) {
            vm.connectedUsers = userList;
            $scope.$apply();
        }

        chatHub.client.BroadcastChatMessage = function (message) {
            chatService.appendNewMessage(message);
        }

        ///////////////////////// FOR VIEWER /////////////////////////////
        vm.playerOneUsername = '';
        vm.playerTwoUsername = '';
        vm.thisPlayersTurn = '';
        vm.playerOneCards = [];
        vm.playerTwoCards = [];
        vm.playerOneCardsPlayed = [];
        vm.playerTwoCardsPlayed = [];
        vm.lastCardsPlayed = [];

        gameHub.client.ReceiveViewerGameStartData = function (viewerStartData) {
            gameService.receiveViewerGameStartData(viewerStartData);

            vm.playerOneUsername = viewerStartData.Player1.UserName;
            vm.playerTwoUsername = viewerStartData.Player2.UserName;

            vm.thisPlayersTurn = viewerStartData.Starter.UserName;

            vm.playerOneCards = viewerStartData.Player1StartingHand.sort(valueComparator);
            vm.playerTwoCards = viewerStartData.Player2StartingHand.sort(valueComparator);

            $scope.$apply();
        }

        gameHub.client.ReceiveViewerTurnInfo = function (turnInfo) {
            console.log(turnInfo);

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

            $scope.$apply();
        }



        //////////////////////////

        gameHub.client.ReceivePlayerStartData = function (playerStartData) {
            vm.myPlayingCards = [];
            vm.myTurn = false;
            vm.mySelection = [];
            vm.freeTurn = false;
            vm.handToBeat = [];
            vm.gameWon = false;
            vm.liveTableHand = [];

            uiDomService.refreshOpponentCardDisplay(13);

            gameService.receivePlayerStartData(playerStartData);

            var startingHand = playerStartData.StartingHand.sort(valueComparator);

            var cardCount = 0;
            var dealInterval = $interval(function () {
                vm.myPlayingCards.push(startingHand.shift());
                dealSounds[cardCount].play();

                if (++cardCount === 13)
                    $interval.cancel(dealInterval);
            }, 150);

            vm.myTurn = playerStartData.Starting;
            vm.freeTurn = vm.myTurn;
            $scope.$apply();
        }

        gameHub.client.SitEvent = function (sitEventData) {
            gameService.sitEvent(sitEventData);
        }

        gameHub.client.StandEvent = function (standEventData) {
            gameService.standEvent(standEventData);
        }

        userHub.client.HandleLoginRequest = function (success) {
            if (success)
                uiDomService.userLoggedIn();
            else
                document.getElementById('username-error').style.display = 'block';
        }


        // TESTING:
        testHub.client.SendFullDeck = function (cards) {
            $scope.$broadcast('getFullDeck', cards);
        }



        // Utility Functions
        function valueComparator(cardA, cardB) {
            return cardA.OrderedValue - cardB.OrderedValue;
        }









        // TESTING AJAX................
        $('#testAjax').click(function () {

            console.log('hit the button');



            $.ajax({
                url: '../../User/Test',
                type: 'POST',
                //contentType: 'application/json',
                //data: {}
            }).done(function (data) {
                console.log(data);
            });


        });

    }

})();