(function () {

    'use strict';

    angular.module('app').directive('cardDrag', cardDrag);

    function cardDrag() {
        return {
            link: function (scope, element, attr) {
                element.draggable({
                    containment: 'parent',
                    snap: true,
                    stop: function (event, ui) {
                        $(this).trigger('click');
                    }
                });

                scope.$on('$destroy', function () {
                    element.off('**');
                });
            }
        };
    }

})();