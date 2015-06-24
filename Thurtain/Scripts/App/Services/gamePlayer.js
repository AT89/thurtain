(function () {

    'use strict';

    angular
        .module('app')
        .factory('gamePlayerService', gamePlayerService);

    gamePlayerService.$inject = [
        '$rootScope',
        'uiDomService',
        'gameService',
        '$interval',
        'validHandService',
        'handBattleService',
        '$timeout'
    ];

    function gamePlayerService($rootScope,
                        uiDomService,
                        gameService,
                        $interval,
                        validHandService,
                        handBattleService,
                        $timeout) {

        // Load Sounds
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

        var gameHub = $.connection.gameHub;

        gameHub.client.ReceivePlayerStartData = processPlayerStart;

        var vm = $rootScope;

        // State Variables
        vm.myPlayingCards = [];
        vm.myTurn = false;       
        vm.mySelection = [];
        vm.freeTurn = false;
        vm.handToBeat = [];
        vm.gameWon = false;
        vm.liveTableHand = [];
        vm.hasPlayedHand = false;
        vm.numberOpponentCards = 13;

        // UI Events
        vm.selectCard = selectCard;
        vm.submitHand = submitHand;
        vm.skipTurn = skipTurn;

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

        function skipTurn() {
            skipSound.play();
            var turnInfo = turnInfoDTOBuilder(true);
            gameHub.server.processPlayerTurn(turnInfo);

            $timeout(updateDOM);
            resetAndWait();
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
                    vm.hasPlayedHand = true;

                    $timeout(updateDOM);
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
                        vm.hasPlayedHand = true;

                        $timeout(updateDOM);
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





        //
        // Local Methods

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

        

        function turnInfoDTOBuilder(skipped) {
            return {
                CardsPlayed: skipped ? [] : vm.mySelection,
                CardsRemaining: vm.myPlayingCards,
                WonGameOver: vm.gameWon,
                Skipped: skipped ? true : false
            };
        }



        

        function resetAndWait() {
            document.getElementById('player-screen-whos-turn').innerHTML = 'THEIR TURN';
            vm.myTurn = false;
            vm.mySelection = [];
            $timeout(updateDOM);
        }



        gameHub.client.ProcessOpponentTurn = function (turnInfo) {
            console.log(turnInfo)
            if (turnInfo.OpponentWon) {
                // let everyone know, and RESET GAME
                displayGameNotification('you lost!');
                setTimeout(function () {
                    gameHub.server.gameStart();
                }, 3000);
            }

            vm.numberOpponentCards = vm.numberOpponentCards - turnInfo.NumberCardsPlayed;
            uiDomService.refreshOpponentCardDisplay(vm.numberOpponentCards);

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

            $timeout(updateDOM);
        }



        // Used for sorting cards in order
        function valueComparator(cardA, cardB) {
            return cardA.OrderedValue - cardB.OrderedValue;
        }

        function processPlayerStart(playerStartData) {

            vm.myPlayingCards = [];
            vm.myTurn = false;
            vm.mySelection = [];
            vm.freeTurn = false;
            vm.handToBeat = [];
            vm.gameWon = false;
            vm.liveTableHand = [];
            vm.hasPlayedHand = false;
            vm.numberOpponentCards = 13;

            uiDomService.refreshOpponentCardDisplay(13);

            uiDomService.playerStartGame();

            var whosTurnString = (playerStartData.Starting) ? 'YOUR TURN' : 'THEIR TURN';
            document.getElementById('player-screen-whos-turn').innerHTML = whosTurnString;
            var opponent = playerStartData.Opponent.UserName;

            document.getElementById('player-screen-table-opponent').innerHTML = 'Playing against ' + opponent;


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

            $timeout(updateDOM);
        }


        function updateDOM() {}
        return {}
    }

})();
