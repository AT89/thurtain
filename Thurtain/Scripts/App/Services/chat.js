(function () {

    'use strict';

    angular
        .module('app')
        .factory('chatService', chatService);

    chatService.$inject = ['uiDomService'];

    function chatService(uiDomService) {

        var chatHub = $.connection.chatHub;

        var chatMessagesContainer = $('#chat-messages');

        chatHub.client.BroadcastChatMessage = appendNewMessage;

        $('#chat-send').click(sendChatMessage);
        $('#chat-textbox').bind('keyup', enterKeyChatHandler);

        chatAutoResize();

        $(window).resize(chatAutoResize());

        


        return {
            sendChatMessage: sendChatMessage,
            appendNewMessage: appendNewMessage,
            appendGameMessage: appendGameMessage
        }

        //
        // PRIVATE METHODS

        function chatAutoResize() {
            uiDomService.resizeChat();
        }

        function enterKeyChatHandler(e) {
            if (e.keyCode === 13)
                sendChatMessage();
        }

        function sendChatMessage() {
            var chatTextBox = $('#chat-textbox');
            var message = chatTextBox.val();
            chatHub.server.sendChat(message);
            chatTextBox.val('');
        }

        function appendNewMessage(message) {
            var msgTemplate = chatMessageBuilder(message);
            chatMessagesContainer.append(msgTemplate);
            chatMessagesContainer.scrollTop(chatMessagesContainer.prop('scrollHeight'));
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
            chatMessagesContainer.append('<div class="game-message">' + message + '</div>');
        }

        

    }

})();
