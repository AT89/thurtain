(function () {

    'use strict';

    angular
        .module('app')
        .factory('chatService', chatService);


    function chatService() {

        var chatHub = $.connection.chatHub;

        return {
            sendChatMessage: sendChatMessage,
            appendNewMessage: appendNewMessage,
            appendGameMessage: appendGameMessage
        }

        function sendChatMessage() {
            var chatTextBox = $('#chat-textbox');
            var message = chatTextBox.val();
            chatHub.server.sendChat(message);
            chatTextBox.val('');
        }

        function appendNewMessage(message) {
            var msgTemplate = chatMessageBuilder(message);
            $('#chat-messages').append(msgTemplate);
            $('#chat-messages').scrollTop($('#chat-messages').prop('scrollHeight'));
        }

        function chatMessageBuilder(message) {
            var sender = message.UserName;
            var messageText = message.Message;

            var dateNow = new Date().toString();
            var dateNowSplit = dateNow.split(' ');
            var goodParts = dateNowSplit.splice(0, 5);
            var prettyDate = goodParts.join(' ');


            var msgTemplate = [
                '<div class="chat-message">',
                  '<span style="color:#37bc9b;"><b>' + sender + '</b></span>',
                  '<span class="ch-msg-sm-f">',
                    ' ' + prettyDate,
                  '</span><br/>',
                  messageText,
                '</div>'
            ].join('');

            return msgTemplate;
        }

        function appendGameMessage(message) {
            $('#chat-messages').append('<div class="game-message">' + message + '</div>');
        }

        

    }

})();
