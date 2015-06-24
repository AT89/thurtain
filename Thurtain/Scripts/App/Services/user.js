(function () {

    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['uiDomService', '$rootScope'];

    function userService(uiDomService, $rootScope) {

        //
        // SERVER/CONNECTION
        //
        var userHub = $.connection.userHub;
        var gameHub = $.connection.gameHub;

        var vm = $rootScope;
        vm.connectedUsers = null;

        userHub.client.HandleLoginRequest = function (success) {
            if (success)
                uiDomService.userLoggedIn();
        }

        userHub.client.ConnectionInitialized = function () {
            uiDomService.connectionInitialized();
            gameHub.server.getLeaderboard();
        }

        userHub.client.UpdateAllUserList = function (userList) {
            vm.connectedUsers = userList;
            vm.$apply();
        }


        //
        // UI EVENTS + BINDINGS
        //
        $('#login-create-button').click(createAccountHandler);
        $('#login-login-button').click(emailLoginHandler);
        
        $('#login-create-email').bind('keyup', enterKeyCreateHandler);
        $('#login-create-username').bind('keyup', enterKeyCreateHandler);        
        $('#login-login-email').bind('keyup', enterKeyLoginHandler);



        //
        // CREATE ACCOUNT
        //
        function createAccountHandler() {

            var usernameInput = $('#login-create-username'),
                emailInput = $('#login-create-email'),
                loginBlankError = $('#login-screen-blankError'),
                loginCreateButton = $('#login-create-button'),
                loginProcessing = $('#login-create-processing'),
                loginCreateError = $('#login-screen-createError');

            loginBlankError.css('display', 'none');

            if (usernameInput.val() === '' || emailInput.val() === '') {
                loginBlankError.css('display', 'block');
            } else {
                loginCreateButton.css('display', 'none');
                loginProcessing.css('display', 'block');
                tryCreateAccount();
            }

            function tryCreateAccount() {
                var ajaxData = {
                    url: '../../User/TryCreateNewUser',
                    type: 'POST',
                    data: {
                        username: usernameInput.val(),
                        email: emailInput.val()
                    }
                };

                function createAccountHandle(data) {
                    if (data === 'True') {
                        loginProcessing.css('display', 'none');
                        loginCreateError.css('display', 'none');
                        userHub.server.loginAs(usernameInput.val());

                    } else {
                        loginProcessing.css('display', 'none');
                        loginCreateButton.css('display', 'block');
                        loginCreateError.css('display', 'block');
                        usernameInput.val('');
                        emailInput.val('').focus();
                    }
                }

                $.ajax(ajaxData).done(createAccountHandle);
            } 
        }

        function enterKeyCreateHandler(e) {
            if (e.keyCode === 13)
                createAccountHandler();
        }



        //
        // LOGIN
        //
        function emailLoginHandler() {

            var loginButton = $('#login-login-button'),
                loginProcessing = $('#login-login-processing'),
                loginError = $('#login-screen-loginError'),
                loginEmailInput = $('#login-login-email');

            loginButton.css('display', 'none');
            loginProcessing.css('display', 'block');

            tryLogin();

            function tryLogin() {
                var ajaxData = {
                    url: '../../User/EmailExists',
                    type: 'POST',
                    data: {
                        email: loginEmailInput.val()
                    }
                }

                function loginHandler(data) {
                    if (data === '') {
                        loginProcessing.css('display', 'none');
                        loginButton.css('display', 'block');
                        loginError.css('display', 'block');
                        loginEmailInput.val('');
                        loginEmailInput.focus();
                    } else {
                        loginProcessing.css('display', 'none');
                        loginError.css('display', 'none');
                        var userData = JSON.parse(data);
                        var username = userData.UserName;
                        userHub.server.loginAs(username);
                    }
                }

                $.ajax(ajaxData).done(loginHandler);
            }           
        }

        function enterKeyLoginHandler(e) {
            if (e.keyCode === 13)
                emailLoginHandler();
        }





        return {}
    }
})();
