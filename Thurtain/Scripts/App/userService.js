(function () {

    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['uiDomService'];

    function userService(uiDomService) {

        var userHub = $.connection.userHub;

        return {
            login: login
            //logoff: logoff
        }

        function login() {
            //$('#username-input').unbind();
            var username = $('#username-input').val();
            userHub.server.loginAs(username);
            //uiDomService.userLoggedIn();
        }

        //function logoff() {
        //    userHub.server.disconnect();
        //    uiDomService.userLoggedOut();
        //}




    }

})();
