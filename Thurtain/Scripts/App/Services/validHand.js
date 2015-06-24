(function () {

    'use strict';

    angular
        .module('app')
        .factory('validHandService', validHandService);

    validHandService.$inject = [];

    function validHandService() {


        return {
            checkForValidHand: checkForValidHand,
            handIsSuited: handIsSuited
        }

        // Takes a group of cards, checking if it's valid.
        // IF it is valid, it returns the TYPE of hand it is.
        // IF it ISNT valid, it returns false.
        function checkForValidHand(cards) {

            // possible cards in a straight, in sequential order
            var straightTemplate = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];

            function cardsContains(cardOrdinalString) {
                for (var c = 0; c < cards.length; c++) {
                    if (cards[c].OrdinalString === cardOrdinalString)
                        return true;
                }

                return false;
            }

            /// Checking the hand types below

            // Variables for testing
            var i,
                j,
                k,
                isValid = true;

            // single
            if (cards.length === 1)
                return 'SINGLE';

            // double
            if (cards.length === 2) {
                if (cards[0].OrdinalString === cards[1].OrdinalString)
                    return 'DOUBLE';
            }

            // trips
            if (cards.length === 3) {
                if ((cards[0].OrdinalString === cards[1].OrdinalString) &&
                    (cards[0].OrdinalString === cards[2].OrdinalString)) {
                    return 'TRIPS';
                }
                    
            }

            // straight
            if (cards.length >= 3 && cards.length < 13) {
                // straights cant contain 2
                if (!cardsContains('2')) {
                    for (i = 0; i < straightTemplate.length; i++) {
                        if (straightTemplate[i] === cards[0].OrdinalString) {
                            for (j = 0; j < cards.length; j++) {
                                if (cards[j].OrdinalString !== straightTemplate[i + j]) {
                                    isValid = false;
                                    break;
                                }             
                            }
                        }
                    }

                    if (isValid)
                        return 'STRAIGHT';
                }
            }

            // bomb (quad)
            if (cards.length === 4) {
                if ((cards[0].OrdinalString === cards[1].OrdinalString) &&
                    (cards[0].OrdinalString === cards[2].OrdinalString) && 
                    (cards[0].OrdinalString === cards[3].OrdinalString)) {
                    return 'BOMB(Quad)';
                }
            }

            // bomb (consecutive-pairs)
            isValid = true;
            if (cards.length >= 6 && (cards.length % 2 === 0)) {

                // Ensure they're sequenced correctly
                for (i = 0; i < straightTemplate.length; i++) {
                    if (straightTemplate[i] === cards[0].OrdinalString) {
                        k = i;
                        for (j = 0; j < cards.length; j = j + 2) {
                            if (cards[j].OrdinalString !== straightTemplate[k]) {
                                isValid = false;
                                break;
                            }
                            k++;
                        }
                    }
                }

                // Ensure they're pairs, but only if it's not already false
                if (isValid) {
                    for (i = 0; i < cards.length; i = i + 2) {
                        if (!(cards[i].OrdinalString === cards[i + 1].OrdinalString)) {
                            isValid = false;
                        }

                    }
                }
               
                if (isValid)
                    return 'BOMB(pairs)';                   
            }


            return false;
        }



        function handIsSuited(cards) {
            var suitValue = cards[0].SuitValue;
            for (var i = 1; i < cards.length; i++) {
                if (!(cards[i].SuitValue === suitValue))
                    return false;                    
            }

            return true;
        }





    }

})();
