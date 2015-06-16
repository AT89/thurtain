(function () {

    'use strict';

    angular
        .module('app')
        .controller('testController', testController);

    testController.$inject = ['$scope', 'validHandService', 'handBattleService'];

    function testController($scope, validHandService, handBattleService) {

        var vm = this;
        vm.cards = [];
        //vm.getCards = getCards;
        vm.testingModeHeader = '';
        vm.testingMode = null;
        vm.selectTestMode = selectTestMode;
        vm.selectCard = selectCard;
        vm.selectedCards = [];
        vm.clearCardSelection = clearCardSelection;
        vm.testIfValidHand = testIfValidHand;
        vm.validHandTestResult = '';

        // Hand vs Hand test variables
        vm.opponentCards = [];
        vm.yourCards = [];
        vm.testHandvsHandButtonText = 'Submit Opponent Hand';
        vm.loadingOpponentCards = true;
        vm.testHandvsHand = testHandvsHand;
        vm.HandvsHandResult = '';


        function selectTestMode(mode) {
            if (mode === 1) {
                vm.testingModeHeader = 'Testing Valid Hands';
                document.getElementById('HandvsHandContainer').style.display = 'none';
                document.getElementById('validHandContainer').style.display = 'block';
            } else {
                vm.testingModeHeader = 'Testing Hand vs Hand';
                document.getElementById('HandvsHandContainer').style.display = 'block';
                document.getElementById('validHandContainer').style.display = 'none';
            }

            vm.testingMode = mode;
        }

        function selectCard(card) {
            if (vm.testingMode !== null) {
                if (vm.testingMode === 1) {
                    // Testing Valid Hands
                    vm.selectedCards.push(card);
                    vm.selectedCards.sort(cardSorter);
                    document.getElementById('testValidHandButton').style.display = 'block';
                    setTimeout(function () { $scope.$apply(); }, 1);
                } else {
                    // Testing Hand vs Hand
                    if (vm.loadingOpponentCards) {
                        vm.opponentCards.push(card);
                        vm.opponentCards.sort(cardSorter);
                        document.getElementById('testHandvsHandButton').style.display = 'block';
                        setTimeout(function () { $scope.$apply(); }, 1);
                    } else {
                        vm.yourCards.push(card);
                        vm.yourCards.sort(cardSorter);
                        setTimeout(function () { $scope.$apply(); }, 1);
                    }
                }
                
            }           
        }

        function testHandvsHand() {
            if (vm.loadingOpponentCards) {
                if (!validHandService.checkForValidHand(vm.opponentCards))
                    vm.HandvsHandResult = 'Invalid Hand. Clear and try again.';
                vm.testHandvsHandButtonText = 'Submit Your Hand';
                vm.loadingOpponentCards = !vm.loadingOpponentCards;
            } else {
                if (!validHandService.checkForValidHand(vm.yourCards)) {
                    vm.HandvsHandResult = 'Invalid Hand. Clear and try again.';
                }
                
                var result = handBattleService.doesYoursBeatTheirs(vm.opponentCards, vm.yourCards);
                console.log(result);
            }
        }

        function clearCardSelection() {
            vm.selectedCards = [];
            vm.validHandTestResult = '';
            vm.opponentCards = [];
            vm.yourCards = [];
            vm.testHandvsHandButtonText = 'Submit Opponent Hand';
            vm.loadingOpponentCards = true;
            vm.HandvsHandResult = '';
            setTimeout(function () {
                $scope.$apply();
            }, 1);
            document.getElementById('testHandvsHandButton').style.display = 'none';
            document.getElementById('testValidHandButton').style.display = 'none';
        }

        

        function testIfValidHand() {
            var result = validHandService.checkForValidHand(vm.selectedCards);

            if (result === false) {
                vm.validHandTestResult = 'NOT A VALID HAND';
                setTimeout(function () { $scope.$apply(); }, 1);
                return;
            }
                
            if (result === 'SINGLE') {
                vm.validHandTestResult = result;
                setTimeout(function () { $scope.$apply(); }, 1);
                return;
            }

            if (result === 'DOUBLE') {
                vm.validHandTestResult = result;
                setTimeout(function () { $scope.$apply(); }, 1);
                return;
            }

            if (result === 'TRIPS') {
                vm.validHandTestResult = result;
                setTimeout(function () { $scope.$apply(); }, 1);
                return;
            }

            if (result === 'STRAIGHT') {
                var suited = validHandService.handIsSuited(vm.selectedCards);
                var length = vm.selectedCards.length;

                var resultString = length.toString() + '-card ' + result;
                if (suited)
                    resultString += ' (SUITED)';
                    
                vm.validHandTestResult = resultString;
                setTimeout(function () { $scope.$apply(); }, 1);
                return;
            }

            if (result === 'BOMB(Quad)') {
                vm.validHandTestResult = result;
                setTimeout(function () { $scope.$apply(); }, 1);
                return;
            }

            if (result === 'BOMB(pairs)') {
                var pairsString = ' - ' + (vm.selectedCards.length / 2).toString() + ' pairs';
                vm.validHandTestResult = result + pairsString;
                setTimeout(function () { $scope.$apply(); }, 1);
                return;
            }

        }


        var testHub = $.connection.testHub;

        $.connection.hub.start().done(function () {
                testHub.server.getFullDeck();
        });

        $scope.$on('getFullDeck', function (e, cards) { 
            vm.cards = cards.sort(cardSorter);
            $scope.$apply();
        });

        function cardSorter(cardA, cardB) {
            return cardA.OrderedValue - cardB.OrderedValue;
        }

    }

})();