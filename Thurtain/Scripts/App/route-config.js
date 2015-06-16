(function () {

    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider) {
        $routeProvider
                .when('/', {
                    controllerAs: 'vm',
                    controller: 'homeController'
                })
                .when('/test', {
                    controllerAs: 'vm',
                    controller: 'testController',
                    templateUrl: '/Test/test.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }

})();