(function () {

    'use strict';

    angular
        .module('app')
        .factory('handBattleService', handBattleService);

    handBattleService.$inject = ['validHandService'];

    function handBattleService(validHandService) {


        return {
            doesYoursBeatTheirs: doesYoursBeatTheirs
        }

        function doesYoursBeatTheirs(theirCards, yourCards) {

            function handIsSuited(cards) {
                return validHandService.handIsSuited(cards);
            }

            function cardSorter(cardA, cardB) {
                return cardA.OrderedValue - cardB.OrderedValue;
            }

            var theirs = theirCards.sort(cardSorter),
                yours = yourCards.sort(cardSorter);

            // algorithm:
            // Use validHandService to determine what kind of hand they played.
            // Check if your hand is the same kind. If NOT, let yourself know.
            // If it IS the same kind, use the logic to determine if your hand
            // is stronger.

            // At this point, opponents cards have already been verified, so it 
            // should always return a hand-type, and never false.
            var opponentHandType = validHandService.checkForValidHand(theirCards);
            var yourHandType = validHandService.checkForValidHand(yourCards);

            // Test stronger hand logic, based on their hand type
            switch (opponentHandType) {

                case 'SINGLE':
                    // can bomb a single 2
                    if (theirs[0].OrdinalString === '2' &&
                        (yourHandType === 'BOMB(Quad)' || yourHandType === 'BOMB(pairs)')) {
                        return true;
                    }
                    if (yourHandType !== opponentHandType) return false;
                    return (yours[0].OrderedValue > theirs[0].OrderedValue) ? true : false;
                    break;
                
                case 'DOUBLE':
                    // can bomb a double 2
                    if (theirs[0].OrdinalString === '2' && theirs[1].OrdinalString === '2' &&
                        yourHandType === 'BOMB(Quad)') {
                        return true;
                    }
                    if (theirs[0].OrdinalString === '2' && theirs[1].OrdinalString === '2' &&
                        yourHandType === 'BOMB(pairs)') {
                        if (yours.length === 8) return true;
                    }
                    if (yourHandType !== opponentHandType) return false;
                    return (yours[1].OrderedValue > theirs[1].OrderedValue) ? true : false;
                    break;

                case 'TRIPS':
                    // can also bomb a trip 3, with 5 consecutive pairs
                    if (theirs[0].OrdinalString === '2' && theirs[1].OrdinalString === '2' &&
                        theirs[2].OrdinalString === '2' && yourHandType === 'BOMB(pairs)') {
                        if (yours.length === 10) return true;
                    }
                    if (yourHandType !== opponentHandType) return false;
                    return (yours[0].OrderedValue > theirs[0].OrderedValue) ? true : false;
                    break;

                case 'STRAIGHT':
                    if (yourHandType !== opponentHandType) return false;
                    if (yours.length !== theirs.length) return false;
                    if (handIsSuited(theirs) && !handIsSuited(yours)) return false;
                    return (yours[yours.length - 1].OrderedValue > theirs[yours.length - 1].OrderedValue) ? true : false;
                    break;

                case 'BOMB(Quad)':
                    // This is never gonna happen, but if they put down 4 2's,
                    // you can bomb it using 6 consecutive pairs
                    if (theirs[0].OrdinalString === '2' && theirs[1].OrdinalString === '2' &&
                        theirs[2].OrdinalString === '2' && theirs[3].OrdinalString === '2' &&
                        yourHandType === 'BOMB(pairs)') {
                        if (yours.length === 12) return true;
                    }
                    if (yourHandType !== opponentHandType) return false;
                    return (yours[0].OrderedValue > theirs[0].OrderedValue) ? true : false;
                    break;

                case 'BOMB(pairs)':
                    if (yourHandType !== opponentHandType) return false;
                    if (yours.length !== theirs.length) return false;
                    return (yours[yours.length - 1].OrderedValue > theirs[yours.length - 1].OrderedValue) ? true : false;
                    break;
            }
        }




    }

})();
